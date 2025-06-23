import { Filter, TextInput } from "react-admin";
import { useTheme } from "@mui/material/styles";
export const RIBAtnerFilter = (props) => {
  const theme = useTheme();
  return (
    <Filter {...props}>
      {/* <TextInput source="id" /> */}
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="nom"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="rib"
      />
    </Filter>
  );
};
