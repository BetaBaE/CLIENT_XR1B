// src/components/DarkModeTextInput.js
import { TextInput } from "react-admin";
import { useTheme } from "@mui/material";

export const DarkModeTextInput = (props) => {
  const theme = useTheme();

  return (
    <TextInput
      {...props}
      sx={{
        width: "98%",
        "& .MuiInputBase-root": {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: "4px",
        },
      }}
      inputProps={{ autoComplete: "off" }}
    />
  );
};
