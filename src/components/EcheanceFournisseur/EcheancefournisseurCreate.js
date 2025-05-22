import { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  NumberInput,
  required,
  SimpleForm,
  useDataProvider,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
export const EcheancefournisseurCreate = () => {
  const theme = useTheme();
  const dataProvider = useDataProvider();
  const [fournisseur, setFournisseur] = useState([]);
  useEffect(() => {
    dataProvider
      .getList("getAllFournissuersClean", {
        pagination: { page: 1, perPage: 10000 },
        sort: { field: "id", order: "ASC" },
      })

      .then(({ data }) => {
        setFournisseur(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider]);

  let fournisseur_choices = fournisseur.map(({ id, nom, CodeFournisseur }) => ({
    id: id,
    name: `${nom} | ${CodeFournisseur} `,
  }));
  return (
    <Create title="Créer une échéance fournisseur">
      <SimpleForm>
        <AutocompleteInput
          label="fournisseur"
          validate={required("choisir le fournisseur")}
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
          source="idFournisseur"
          choices={fournisseur_choices}
        />
        {/* <NumberInput source="idFournisseur" label="Fournisseur" /> */}
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
    </Create>
  );
};
