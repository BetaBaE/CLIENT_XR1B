import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";

/** Keeps body/html.dark in sync with MUI so CSS tables follow theme instantly. */
export const SyncThemeClass = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  useEffect(() => {
    const isDark = mode === "dark";
    document.body.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("dark", isDark);
    document.body.dataset.theme = mode;
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return null;
};

/** Class suffix so custom tables re-render with the active palette mode. */
export const useTableThemeClass = (base = "my-custom-table") => {
  const theme = useTheme();
  const mode = theme.palette.mode === "dark" ? "dark" : "light";
  return `${base} my-custom-table--${mode}`;
};
