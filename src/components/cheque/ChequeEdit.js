import { makeStyles } from "@material-ui/core";
import {
  DateInput,
  Edit,
  FormDataConsumer,

  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useRedirect,
} from "react-admin";
import Swal from "sweetalert2";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

const UserEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" />
  </Toolbar>
);

export const ChequeEdit = (props) => {
  const redirect = useRedirect();

  function annuleAlert(params) {
    if (params === "Annuler") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment annuler ce chèque?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Non!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, annuler!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click();
          Swal.fire("Annulé!", "Chèque annulé", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "Le chèque n'a pas été modifié.",
            "error"
          );
          redirect("list", "cheque");
        }
      });
    }
  }
  const EditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );
  const classes = useStyles();

  return (
    <Edit {...props} >
      <SimpleForm toolbar={<UserEditToolbar />}>
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <>
              {(formData.Etat !== "Reglee" && formData.Etat !== "Annuler") && (
                <>
                  <SelectInput
                    {...rest}
                    source="Etat"
                    className={classes.autocomplete}
                    onChange={(e) => {
                      console.log(e.target.value);
                      annuleAlert(e.target.value);
                    }}
                    validate={required()}
                    choices={[
                      { id: "Reglee", name: "Reglee" },
                      { id: "En cours", name: "En cours" },
                      { id: "Annuler", name: "Annuler" },
                    ]}
                  />

                  <DateInput
                    source="dateOperation"
                    label="Date d'opération"
                    className={classes.autocomplete}
                  />
                </>
              )}
            </>
          )}
        </FormDataConsumer>

        <TextInput
          source="numerocheque"
          label="Numéro de chèque"
          disabled
          className={classes.autocomplete}
        />
      </SimpleForm>
    </Edit>
  );
};
