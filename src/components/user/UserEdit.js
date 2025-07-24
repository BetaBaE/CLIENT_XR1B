import {
  DateInput,
  Edit,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useNotify,
  useRecordContext,
  Button,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { fetchUtils } from "react-admin";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { ContentCopy, Refresh } from "@mui/icons-material";
import apiUrl from "../../config";
import { useInputStyleFilters } from "../global/DarkInputStyle";

// Function to generate a random password
const generateRandomPassword = () => {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

// Custom Reset Password Dialog
const ResetPasswordDialog = ({ open, onClose, onConfirm, record }) => {
  const [password, setPassword] = useState(generateRandomPassword());
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleGenerateNew = () => {
    setPassword(generateRandomPassword());
    setConfirmPassword("");
    setError("");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    onConfirm(password);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset Password for {record.username}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Suggested Password"
              sx={useInputStyleFilters}
              value={password}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleCopyToClipboard}>
                      <ContentCopy fontSize="small" />
                    </IconButton>
                    <IconButton onClick={handleGenerateNew}>
                      <Refresh fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              sx={useInputStyleFilters}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              error={!!error}
              helperText={error}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Reset Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Custom toolbar with reset password functionality
const EditToolbar = (props) => {
  const notify = useNotify();

  const record = useRecordContext();
  const [openDialog, setOpenDialog] = useState(false);

  const handleResetPassword = (newPassword) => {
    fetchUtils
      .fetchJson(`${apiUrl}/users/${record.id}/reset-password`, {
        method: "PUT",
        body: JSON.stringify({ newPassword }),
      })
      .then(() => {
        notify("Password reset successfully", { type: "success" });
      })
      .catch((error) => {
        notify("Error resetting password: " + error.message, { type: "error" });
      });
  };

  return (
    <Toolbar {...props}>
      <SaveButton />
      <Button
        label="Reset Password"
        onClick={() => setOpenDialog(true)}
        sx={{ marginLeft: "16px" }}
      />
      <ResetPasswordDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleResetPassword}
        record={record}
      />
    </Toolbar>
  );
};

export const UserEdit = (props) => {
  const theme = useTheme();

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="fullname"
          validate={required("Le nom est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: { autoComplete: "off" },
          }}
        />

        <TextInput
          source="username"
          validate={required("Username est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: { autoComplete: "off" },
          }}
        />

        <SelectInput
          validate={required("Le Role est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: { autoComplete: "off" },
          }}
          source="Role"
          choices={[
            { id: "admin", name: "Admin" },
            { id: "normal user", name: "Normal user" },
            {
              id: "superviseur comptabilite",
              name: "Superviseur Comptabilité",
            },
            { id: "comptable", name: "Comptable" },
            { id: "comptable PdT", name: "Comptable PdT" },
            { id: "comptable midelt", name: "Comptable Midelt" },
            {
              id: "superviseur comptabilite midelt",
              name: "Superviseur Comptabilité Midelt",
            },
            { id: "direction générale", name: "Direction générale" },
            { id: "consultation directeur", name: "Consultation directeur" },
            { id: "achateur", name: "Achateur" },
            {
              id: "super admin",
              name: "Super Admin",
            },
          ]}
        />

        <SelectInput
          validate={required("Le status est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: { autoComplete: "off" },
          }}
          source="isActivated"
          choices={[
            { id: "true", name: "Activer" },
            { id: "false", name: "Désactiver" },
          ]}
        />

        <DateInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          source="created"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
        />
      </SimpleForm>
    </Edit>
  );
};
