import { Edit, NumberInput, SimpleForm, TextInput } from "react-admin";

export const EcheancefournisseurEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="nom" label="Fournisseur" disabled={true} />
      <NumberInput source="EcheanceJR" label="Echeance en Jour" />
      <NumberInput source="ConvJR" label="Convention en Jour" />
    </SimpleForm>
  </Edit>
);
