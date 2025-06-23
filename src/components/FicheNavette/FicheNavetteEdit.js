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

export const FicheNavetteEdit = (props) => {
  const theme = useTheme();
  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Edit>
      <SimpleForm toolbar={<UserEditToolbar />}>
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
                  validate={required("Numero FN est obligatoire")}
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
