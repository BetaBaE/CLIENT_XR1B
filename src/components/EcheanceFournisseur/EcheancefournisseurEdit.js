import {
  Edit,
  NumberInput,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
export const EcheancefournisseurEdit = () => {
  const EditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  const theme = useTheme();
  return (
    <Edit>
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
          source="nom"
          label="Fournisseur"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <NumberInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
          source="EcheanceJR"
          label="Echeance en Jour"
        />
        <NumberInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
          source="ConvJR"
          label="Convention en Jour"
        />
      </SimpleForm>
    </Edit>
  );
};
