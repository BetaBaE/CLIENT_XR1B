import { useTheme } from "@mui/material/styles";

export const useInputStyle = () => {
  const theme = useTheme();

  return {
    width: 650,
    input: {
      backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
      color: theme.palette.mode === "dark" ? "#fff" : "inherit",
      borderRadius: "4px",
    },
  };
};

export const useInputStyleFilters = () => {
  const theme = useTheme();

  return {
    input: {
      backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
      color: theme.palette.mode === "dark" ? "#fff" : "inherit",
      borderRadius: "4px",
    },
  };
};
