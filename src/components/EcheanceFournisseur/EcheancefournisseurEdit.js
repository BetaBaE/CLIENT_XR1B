import {
  Edit,
  NumberInput,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
export const EcheancefournisseurEdit = () => {
  const EditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  return (
    <Edit>
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          sx={useInputStyleFilters}
          source="nom"
          label="Fournisseur"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
        />
        <NumberInput
          sx={useInputStyleFilters}
          slotProps={{
            input: { autoComplete: "off" },
          }}
          source="EcheanceJR"
          label="Echeance en Jour"
        />
        <NumberInput
          sx={useInputStyleFilters}
          slotProps={{
            input: { autoComplete: "off" },
          }}
          source="ConvJR"
          label="Convention en Jour"
        />
      </SimpleForm>
    </Edit>
  );
};
