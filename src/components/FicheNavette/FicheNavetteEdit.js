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
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));
export const FicheNavetteEdit = (props) => {
  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  const classes = useStyles();
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
                  className={classes.autocomplete}
                  source="ficheNavette"
                  validate={required("Numero FN est obligatoire")}
                />
                {/* <SelectInput
                  source="annulation"
                  className={classes.autocomplete}
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
          className={classes.autocomplete}
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
