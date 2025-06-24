import React, { useState, useEffect, useCallback } from "react";
import {
  Logout,
  UserMenu,
  useAuthProvider,
  useNotify,
  Button,
  usePermissions,
} from "react-admin";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar,
  Box,
  Divider,
  Grid,
  TextField,
  Chip,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockResetIcon from "@mui/icons-material/LockReset";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

const SESSION_START_KEY = "sessionStartTime";

const getRoleFromPermissions = (permissions) => {
  const roleMap = {
    admin: "Administrateur",
    "direction générale": "Direction Générale",
    "normal user": "Utilisateur Standard",
    "comptable midelt": "Comptable Midelt",
    "superviseur comptabilite midelt": "Superviseur Comptabilité Midelt",
    "comptable PdT": "Comptable PdT",
    "superviseur comptabilite": "Superviseur Comptabilité",
    achateur: "Acheteur",
    comptable: "Comptable",
    "consultation directeur": "Consultation Directeur",
    montage: "Montage",
    electricite: "Électricité",
  };

  return roleMap[permissions] || permissions || "Aucun rôle défini";
};

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}h ${minutes
    .toString()
    .padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
};

const CustomUserMenu = (props) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    avatar: "",
    role: "",
  });
  const [changePwMode, setChangePwMode] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");
  const [sessionDuration, setSessionDuration] = useState(0);
  const authProvider = useAuthProvider();
  const notify = useNotify();
  const { permissions } = usePermissions();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  // Initialize session timer
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const storedStart = localStorage.getItem(SESSION_START_KEY);
    const sessionStart = storedStart ? parseInt(storedStart) : now;

    if (!storedStart) {
      localStorage.setItem(SESSION_START_KEY, sessionStart.toString());
    }

    setSessionDuration(now - sessionStart);

    const timer = setInterval(() => {
      setSessionDuration(Math.floor(Date.now() / 1000) - sessionStart);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchUserIdentity = useCallback(async () => {
    try {
      const identity = await authProvider.getIdentity();
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser({
        fullName: identity?.fullName || userData?.fullName || "Non défini",
        username: identity?.username || "Non défini",
        avatar: identity?.avatar || "",
        role: getRoleFromPermissions(permissions),
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      notify("Erreur de chargement du profil", { type: "error" });
    }
  }, [authProvider, permissions, notify]);

  useEffect(() => {
    fetchUserIdentity();
  }, [fetchUserIdentity]);

  const handleNameEdit = () => {
    setTempName(user.fullName);
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    try {
      await authProvider.updateProfile({ fullName: tempName });
      setUser((prev) => ({ ...prev, fullName: tempName }));
      setIsEditingName(false);
      notify("Nom mis à jour avec succès", { type: "success" });
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      notify(error.message || "Erreur lors de la mise à jour du nom", {
        type: "error",
      });
    }
  };

  const handlePasswordChange = useCallback(
    async (data) => {
      if (data.newPassword !== data.confirmPassword) {
        notify("Les mots de passe ne correspondent pas", { type: "warning" });
        return;
      }

      let confirmTimer;
      let cancelTimer;
      let autoCancelTimer;

      const swalInstance = await Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Cette action vous déconnectera. Vous devrez vous reconnecter.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        allowOutsideClick: false,
        confirmButtonText: "Oui (5s)",
        cancelButtonText: "Annuler (5s)",
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          const cancelButton = Swal.getCancelButton();
          confirmButton.disabled = true;
          cancelButton.disabled = true;

          let yesCountdown = 5;
          confirmTimer = setInterval(() => {
            confirmButton.textContent = `Oui (${yesCountdown}s)`;
            if (yesCountdown <= 0) {
              clearInterval(confirmTimer);
              confirmButton.disabled = false;
              confirmButton.textContent = "Oui";
            }
            yesCountdown--;
          }, 1000);

          let cancelCountdown = 5;
          cancelTimer = setInterval(() => {
            cancelButton.textContent = `Annuler (${cancelCountdown}s)`;
            if (cancelCountdown <= 0) {
              clearInterval(cancelTimer);
              cancelButton.disabled = false;
              cancelButton.textContent = "Annuler";
            }
            cancelCountdown--;
          }, 1000);

          autoCancelTimer = setTimeout(() => {
            swalInstance.close();
          }, 10000);
        },
        willClose: () => {
          clearInterval(confirmTimer);
          clearInterval(cancelTimer);
          clearTimeout(autoCancelTimer);
        },
      });

      if (swalInstance.isConfirmed) {
        try {
          await authProvider.changePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          });

          await Swal.fire({
            title: "Succès !",
            text: "Mot de passe modifié. Déconnexion en cours...",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          localStorage.removeItem(SESSION_START_KEY);
          await authProvider.logout();
          window.location.href = "/#/login";
        } catch (error) {
          notify(error.message || "Erreur lors du changement de mot de passe", {
            type: "error",
          });
        }
      }
    },
    [authProvider, notify]
  );

  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => {
    setProfileOpen(false);
    setChangePwMode(false);
    setIsEditingName(false);
    reset();
  };

  return (
    <>
      <UserMenu {...props}>
        <MenuItem onClick={handleProfileOpen}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mon Profil</ListItemText>
        </MenuItem>
        <Logout />
      </UserMenu>

      <Dialog
        open={profileOpen}
        onClose={handleProfileClose}
        maxWidth="md"
        fullWidth
        disablePortal
        disableAutoFocus={false}
        disableEnforceFocus={false}
        disableRestoreFocus={false}
        PaperProps={{
          sx: {
            pointerEvents: "auto",
            userSelect: "text",
            zIndex: 2000,
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: 1, borderColor: "divider" }}>
          Informations du profil
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={2}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    fontSize: 48,
                    bgcolor: "primary.main",
                  }}
                >
                  {user.fullName?.charAt(0).toUpperCase() || "?"}
                </Avatar>

                <Box display="flex" alignItems="center">
                  {isEditingName ? (
                    <Box width="100%">
                      <TextField
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        label="Nom complet"
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <Button
                        onClick={handleSaveName}
                        variant="contained"
                        sx={{ mr: 2 }}
                      >
                        Enregistrer
                      </Button>
                      <Button
                        onClick={() => setIsEditingName(false)}
                        variant="outlined"
                      >
                        Annuler
                      </Button>
                    </Box>
                  ) : (
                    <>
                      <Typography variant="h6">{user.fullName}</Typography>
                      <IconButton
                        onClick={handleNameEdit}
                        size="small"
                        sx={{ ml: 1 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Box>

                <Chip
                  label={user.role}
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 2, mb: 2 }}
                />

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon color="action" sx={{ mr: 1 }} />
                  <Typography>
                    <strong>Session active:</strong>{" "}
                    {formatDuration(sessionDuration)}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {changePwMode ? (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Modification du mot de passe
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit(handlePasswordChange)}
                  >
                    <Controller
                      name="currentPassword"
                      control={control}
                      rules={{
                        required: "Ce champ est obligatoire",
                        minLength: {
                          value: 8,
                          message: "Minimum 8 caractères requis",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Mot de passe actuel"
                          type="password"
                          fullWidth
                          margin="normal"
                          error={!!errors.currentPassword}
                          helperText={errors.currentPassword?.message}
                        />
                      )}
                    />

                    <Controller
                      name="newPassword"
                      control={control}
                      rules={{
                        required: "Ce champ est obligatoire",
                        minLength: {
                          value: 8,
                          message: "Minimum 8 caractères requis",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Nouveau mot de passe"
                          type="password"
                          fullWidth
                          margin="normal"
                          error={!!errors.newPassword}
                          helperText={errors.newPassword?.message}
                        />
                      )}
                    />

                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: "Veuillez confirmer votre mot de passe",
                        validate: (value) =>
                          value === newPassword ||
                          "La confirmation ne correspond pas",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Confirmation du mot de passe"
                          type="password"
                          fullWidth
                          margin="normal"
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword?.message}
                        />
                      )}
                    />

                    <DialogActions sx={{ px: 0, mt: 2 }}>
                      <Button
                        label="Annuler"
                        onClick={handleProfileClose}
                        variant="outlined"
                      />
                      <Button
                        type="submit"
                        label="Enregistrer"
                        variant="contained"
                        disabled={!isValid}
                        sx={{ ml: 2 }}
                      />
                    </DialogActions>
                  </Box>
                </Box>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <Button
                    label="Modifier le mot de passe"
                    variant="contained"
                    startIcon={<LockResetIcon />}
                    onClick={() => setChangePwMode(true)}
                    sx={{ mt: 3 }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomUserMenu;
