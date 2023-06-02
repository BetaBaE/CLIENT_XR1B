import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  Edit,
  FormDataConsumer,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useDataProvider,
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

const EditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" />
  </Toolbar>
);
export const OrdervirementEdit = (props) => {
  const dataProvider = useDataProvider();
  const [ribAtner, setribAtner] = useState([]);
  const redirect = useRedirect();

  useEffect(() => {
    dataProvider
      .getList("ribatner", {
        pagination: { page: 1, perPage: 20 },
        sort: { field: "nom", order: "ASC" },
      })
      .then(({ data }) => {
        setribAtner(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider]);

  let rib_choices = ribAtner.map(({ id, nom, rib }) => ({
    id: id,
    name: `(${nom}) ${rib}`,
  }));

  function regleeAlert(params) {
    if (params === "Reglee") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment régler cette ordre de virement?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, régler!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click();
          Swal.fire("Régler!", "Ordre de virement régler.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "ordre de virement pour ne pas changer.",
            "error"
          );
          redirect("list", "ordervirement");
        }
      });
    } else if (params === "Annule") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment Annule cette ordre de virement?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Non!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, Annule!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click();
          Swal.fire("Annule!", "Ordre de virement Annule.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "ordre de virement pour ne pas changer.",
            "error"
          );
          redirect("list", "ordervirement");
        }
      });
    }
  }
  const classes = useStyles();
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput className={classes.autocomplete} source="id" disabled />

        

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.etat !== "Reglee" &&
            formData.etat !== "Annule" && (
              <>
                <SelectInput
                  className={classes.autocomplete}
                  source="ribAtner"
                  validate={required()}
                  choices={rib_choices}
                  {...rest}
                />
                <SelectInput
                  className={classes.autocomplete}
                  validate={required()}
                  source="etat"
                  onChange={(e) => {
                    regleeAlert(e.target.value);
                  }}
                  choices={[
                    { id: "En cours", name: "En cours" },
                    { id: "Reglee", name: "Reglee" },
                    { id: "Annule", name: "Annule" },
                  ]}
                />
                <SelectInput
          validate={required("Le directeur est obligatoire")}
          emptyText="selectionnez le directeur"
          source="directeursigne"
          choices={[
            { id: "Youness ZAMANI", name: "Youness ZAMANI" },
            { id: "Mohamed ZAMANI", name: "Mohamed ZAMANI" },
          ]}
          initialValue="" // This line can be omitted
        />
              </>
            )
          }
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};

