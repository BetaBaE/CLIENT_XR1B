import {
  Edit,
  FormDataConsumer,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useGetIdentity,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const FicheNavetteEdit = (props) => {
  const theme = useTheme();
  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  const noForbiddenChars = (value) => {
    if (!value) return undefined;

    // Reject dash, underscore, space, or the word 'annuler'
    if (/[ \-_]/.test(value)) {
      return "Le champ ne doit pas contenir '-', '_' ou espace";
    }
    if (value.toLowerCase() === "annuler") {
      return "Le mot 'annuler' est interdit";
    }

    return undefined;
  };

  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Edit>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <Box mt={2}>
          <Typography variant="body2" color="error" fontWeight="bold">
            ⚠️ Annulation de Fiche Navette interdite !
          </Typography>
          <Typography variant="body2" color="error">
            La Fiche Navette n'a aucun sens à être annulée seule.
            <br /> Si vous devez annuler, merci d'annuler la{" "}
            <strong>Facture</strong> ou l'<strong>Avance</strong> correspondante
            .
          </Typography>
        </Box>
        <FormDataConsumer>
          {({ formData }) =>
            formData.ficheNavette !== "Annuler" && (
              <>
                <TextInput
                  label="Fiche Navette"
                  sx={{
                    width: 650,
                    input: {
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                      color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                      borderRadius: "4px",
                    },
                  }}
                  source="ficheNavette"
                  validate={[
                    // required("Numero FN est obligatoire"),
                    noForbiddenChars,
                  ]}
                />
                {/* <SelectInput
                  source="annulation"
                  sx={{ width: 650 }}
                  onChange={(e) => {
                    console.log(e.target.value);
                    annuleAlert(e.target.value);
                  }}
                  // validate={required()}
                  choices={[{ id: "Annuler", name: "Annuler" }]}
                /> */}
              </>
            )
          }
        </FormDataConsumer>

        {/* <SelectInput
          sx={{ width: 650 }}
          source="CatFn"
          label="Catégorie Facture"
          validate={required()}
          choices={[
            { id: "FET", name: "Fourniture Equipement Travaux" },
            { id: "Service", name: "Service" },
          ]}
        ></SelectInput> */}
      </SimpleForm>
    </Edit>
  );
};
