import React, { useState, useEffect, useCallback } from "react";
import {
  Logout,
  UserMenu,
  useAuthProvider,
  useNotify,
  Button,
  Form,
  required,
  minLength,
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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useForm } from "react-hook-form";
import { useInputStyleFilters } from "../../global/DarkInputStyle";

const getRoleFromPermissions = (permissions) => {
  const roleMap = {
    admin: "Administrator",
    "direction générale": "Direction Générale",
    "normal user": "Normal User",
    "comptable midelt": "Comptable Midelt",
    "superviseur comptabilite midelt": "Superviseur Comptabilité Midelt",
    "comptable PdT": "Comptable PdT",
    "superviseur comptabilite": "Superviseur Comptabilité",
    achateur: "Achateur",
    comptable: "Comptable",
    "consultation directeur": "Consultation Directeur",
    montage: "Montage",
    electricite: "Electricité",
  };

  return roleMap[permissions] || permissions || "No role assigned";
};

const CustomUserMenu = (props) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    avatar: "",
    role: "",
  });
  const [changePwMode, setChangePwMode] = useState(false);
  const authProvider = useAuthProvider();
  const notify = useNotify();
  const { permissions } = usePermissions();

  const {
    register,
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

  const fetchUserIdentity = useCallback(async () => {
    try {
      const identity = await authProvider.getIdentity();
      setUser({
        fullName: identity?.fullName || "",
        email: identity?.email || "",
        avatar: identity?.avatar || "",
        role: getRoleFromPermissions(permissions),
      });
    } catch (error) {
      console.error("Failed to fetch user identity:", error);
    }
  }, [authProvider, permissions]);

  useEffect(() => {
    fetchUserIdentity();
  }, [fetchUserIdentity]);

  const handlePasswordChange = useCallback(
    async (data) => {
      if (data.newPassword !== data.confirmPassword) {
        notify("Passwords do not match", { type: "error" });
        return;
      }

      try {
        await authProvider.changePassword({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
        notify("Password changed successfully", { type: "success" });
        setChangePwMode(false);
        reset();
      } catch (error) {
        notify(error.message || "Password change failed", { type: "error" });
      }
    },
    [authProvider, notify, reset]
  );

  const handleProfileOpen = useCallback(() => {
    setProfileOpen(true);
  }, []);

  const handleProfileClose = useCallback(() => {
    setProfileOpen(false);
    setChangePwMode(false);
    reset();
  }, [reset]);

  return (
    <>
      <UserMenu {...props}>
        <MenuItem onClick={handleProfileOpen}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <Logout />
      </UserMenu>

      <Dialog
        open={profileOpen}
        onClose={handleProfileClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={2}
              >
                <Avatar
                  src={user.avatar}
                  sx={{ width: 120, height: 120, mb: 2 }}
                >
                  {user.fullName?.charAt(0) || ""}
                </Avatar>
                <Typography variant="h5">
                  {user.fullName || "No name"}
                </Typography>

                <Box mt={3} width="100%">
                  <Typography variant="subtitle1">Account Details</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box mt={1}>
                    <Typography>
                      <strong>Role:</strong> {user.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {changePwMode ? (
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom>
                    Change Password
                  </Typography>
                  <Form onSubmit={handleSubmit(handlePasswordChange)}>
                    <TextField
                      label="Current Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      sx={useInputStyleFilters}
                      {...register("currentPassword", {
                        required: "Current password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      error={!!errors.currentPassword}
                      helperText={errors.currentPassword?.message}
                    />
                    <TextField
                      label="New Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      sx={useInputStyleFilters}
                      {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      error={!!errors.newPassword}
                      helperText={errors.newPassword?.message}
                    />
                    <TextField
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      sx={useInputStyleFilters}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === newPassword || "Passwords do not match",
                      })}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                    />
                    <DialogActions>
                      <Button label="Cancel" onClick={handleProfileClose} />
                      <Button
                        type="submit"
                        label="Save"
                        variant="contained"
                        disabled={!isValid}
                      />
                    </DialogActions>
                  </Form>
                </Box>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  p={2}
                >
                  <Button
                    label="Change Password"
                    variant="outlined"
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
