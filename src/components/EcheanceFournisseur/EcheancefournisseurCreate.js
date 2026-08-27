import {
  AutocompleteInput,
  Create,
  NumberInput,
  ReferenceInput,
  required,
  SimpleForm,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
export const EcheancefournisseurCreate = () => {
  return (
    <Create title="Créer une échéance fournisseur">
      <SimpleForm>
        <ReferenceInput
          source="idFournisseur"
          reference="getAllFournissuersClean"
          perPage={50}
          sort={{ field: "nom", order: "ASC" }}
        >
          <AutocompleteInput
            label="fournisseur"
            validate={required("choisir le fournisseur")}
            sx={useInputStyleFilters}
            slotProps={{
              input: { autoComplete: "off" },
            }}
            filterToQuery={(searchText) => ({ q: searchText })}
            matchSuggestion={() => true}
            optionText={(record) =>
              record?.id ? `${record.nom} | ${record.CodeFournisseur} ` : ""
            }
          />
        </ReferenceInput>
        {/* <NumberInput source="idFournisseur" label="Fournisseur" /> */}
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
    </Create>
  );
};
