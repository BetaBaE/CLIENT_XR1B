import { Filter, SelectInput, TextInput } from "react-admin";
import { useTheme } from "@mui/material/styles";
const UserFilter = (props) => {
  const theme = useTheme();
  return (
    <Filter {...props}>
      <TextInput
        source="fullname"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
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
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        slotProps={{
          input: { autoComplete: "off" },
        }}
      />
      <TextInput
        source="Role"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        slotProps={{
          input: { autoComplete: "off" },
        }}
      />
      <SelectInput
        source="isActivated"
        choices={[
          { id: "true", name: "activer" },
          { id: "false", name: "desactiver" },
          //   { id: "photography", name: "Photography" },
        ]}
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        slotProps={{
          input: { autoComplete: "off" },
        }}
      />
    </Filter>
  );
};
export default UserFilter;
