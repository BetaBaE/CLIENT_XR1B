import {
  Create,
  SimpleForm,
  TextInput,
  useGetIdentity,
  AutocompleteInput,
  required,
} from "react-admin";

import useFetchFournisserInter from "../global/InternastionalFournisseur";
import apiUrl from "../../config";
//49 vulnerabilities (4 low, 21 moderate, 21 high, 3 critical)

export const DossierCreate = () => {
  const { identity } = useGetIdentity();

  const { fournisseur, loading, error } = useFetchFournisserInter(apiUrl);

  let fournisseur_choices = fournisseur.map(({ id, nom }) => ({
    id: id,
    name: `${nom}`,
  }));

  if (loading) return <div>Loading fournisseurs...</div>;
  if (error) return <div>Error loading fournisseurs: {error.message}</div>;

  const fournisseurChoices = fournisseur.map((f) => ({
    id: f.id,
    name: f.nom, // use "nom" as label
  }));

  return (
    <Create>
      <SimpleForm>
        <TextInput
          disabled
          source="Redacteur"
          sx={{ width: 650 }}
          label="Vous êtes"
          defaultValue={identity?.fullName}
        />
        <TextInput
          source="Libele"
          sx={{ width: 650 }}
          validate={required("Ce champ est obligatoire")}
        />
        <AutocompleteInput
          label="Fournisseur"
          sx={{ width: 650 }}
          source="idFournisseur"
          choices={fournisseurChoices}
          validate={required("Ce champ est obligatoire")}
        />
      </SimpleForm>
    </Create>
  );
};
