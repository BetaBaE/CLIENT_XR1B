import { useTheme } from "@mui/material/styles";

export const useInputStyle = () => {
  const theme = useTheme();

  return {
    width: 400,
    input: {
      backgroundColor: theme.palette.mode === "dark" ? "#3B3B3B" : "#E8E8E8",
      color: theme.palette.mode === "dark" ? "#fff" : "inherit",
      borderRadius: "4px",
    },
  };
};

export const useInputStyleFilters = () => {
  const theme = useTheme();

  return {
    input: {
      backgroundColor: theme.palette.mode === "dark" ? "#3B3B3B" : "#E8E8E8",
      color: theme.palette.mode === "dark" ? "#fff" : "inherit",
      borderRadius: "4px",
    },
  };
};
