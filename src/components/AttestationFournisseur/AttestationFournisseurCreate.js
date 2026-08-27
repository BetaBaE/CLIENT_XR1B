// Importation des modules et composants nécessaires depuis react et react-admin
import {
  AutocompleteInput,
  Create,
  DateInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
// Définition et exportation du composant AttestationFournisseurCreate
const AttestationFournisseurCreate = (props) => {
  const validateDateRange = (value) => {
    if (!value) return undefined;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const inputDate = new Date(value);
    inputDate.setHours(0, 0, 0, 0); // Normalize to start of day

    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 180); // 180 days ago

    if (inputDate > today) {
      return "La date ne peut pas être dans le futur";
    }

    if (inputDate < minDate) {
      return `La date ne peut pas être antérieure au ${minDate.toLocaleDateString()}`;
    }

    return undefined;
  };
  // Récupération de l'identité de l'utilisateur courant
  const { identity } = useGetIdentity();

  // Récupération de l'état de chargement et des erreurs pour l'identité de l'utilisateur
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Create>
      <SimpleForm {...props}>
        {/* Champ texte pour afficher le nom de l'utilisateur courant */}
        <TextInput
          defaultValue={identity?.username}
          label="vous êtes"
          hidden={false}
          sx={useInputStyleFilters}
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          source="redacteur"
        />

        {/* Champ de saisie avec autocomplétion pour choisir un fournisseur */}
        <ReferenceInput
          source="idfournisseur"
          reference="fournisseurs"
          perPage={50}
          sort={{ field: "nom", order: "ASC" }}
        >
          <AutocompleteInput
            label="fournisseur"
            validate={required("choisir le fournisseur")}
            sx={useInputStyleFilters}
            slotProps={{
              input: {
                autoComplete: "off",
              },
            }}
            filterToQuery={(searchText) => ({ q: searchText })}
            matchSuggestion={() => true}
            optionText={(record) =>
              record?.id ? `${record.nom} | ${record.CodeFournisseur} ` : ""
            }
          />
        </ReferenceInput>

        {/* Champ de saisie de date pour la date de début de la convention */}
        <DateInput
          source="dateDebut"
          label="date debut convention"
          validate={[required("Date obligatoire"), validateDateRange]}
          sx={{ width: 650 }}
        />

        {/* Champ texte pour le numéro d'attestation */}
        <TextInput
          source="numAttestation"
          label="numero d'attestation"
          sx={useInputStyleFilters}
          slotProps={{
            input: {
              autoComplete: "off",
            },
          }}
        />
      </SimpleForm>
    </Create>
  );
};

export default AttestationFournisseurCreate;
