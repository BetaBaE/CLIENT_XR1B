import {
  AutocompleteInput,
  DateInput,
  Edit,
  NumberInput,
  required,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
import useFetchFournisseurInternational from "../global/InternastionalFournisseur";
import apiUrl from "../../config";

export const FacturesinternationalEdit = () => {
  const { identity } = useGetIdentity();
  const { fournisseurs, loading } = useFetchFournisseurInternational(apiUrl);
  if (loading) return <div>Chargement des fournisseurs...</div>;
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          defaultValue={identity?.username}
          source="redacteur"
          sx={useInputStyleFilters}
          label="Modifier Par"
        />
        <NumberInput source="idDossier" />
        <TextInput source="Devise" />
        <NumberInput source="MontantHtDevise" />
        <NumberInput source="MontantTvaDevise" />
        <NumberInput source="MontantTTCDevise" />
        <DateInput source="MontantPreparation" />
        <DateInput source="CumulPaiementDevise" />
        <NumberInput source="TauxInit" />
        <NumberInput source="iddesignation" />
        <AutocompleteInput
          label="Fournisseur"
          sx={useInputStyleFilters}
          source="idFournisseur"
          choices={fournisseurs}
          validate={required("Ce champ est obligatoire")}
        />
        <DateInput source="dateDoc" />
        <TextInput source="numDoc" />
        <TextInput source="codeChantier" />
        <DateInput source="dateCreation" />
        <DateInput source="dateDouane" />
      </SimpleForm>
    </Edit>
  );
};
