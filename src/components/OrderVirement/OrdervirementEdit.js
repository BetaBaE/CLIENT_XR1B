import { useEffect, useState } from "react";
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
  useDataProvider,
  useRedirect,
} from "react-admin";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";
const EditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" />
  </Toolbar>
);
export const OrdervirementEdit = (props) => {
  const dataProvider = useDataProvider();
  const [ribAtner, setribAtner] = useState([]);
  const redirect = useRedirect();
  const theme = useTheme();

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
    } else if (params === "Annuler") {
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

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
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
          source="id"
          disabled
        />
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.etat !== "Reglee" &&
            formData.etat !== "Annuler" && (
              <>
                <SelectInput
                  sx={{ width: 650 }}
                  source="ribAtner"
                  validate={required()}
                  choices={rib_choices}
                  {...rest}
                />
                <SelectInput
                  sx={{ width: 650 }}
                  validate={required()}
                  source="etat"
                  onChange={(e) => {
                    regleeAlert(e.target.value);
                  }}
                  choices={[
                    { id: "En cours", name: "En cours" },
                    // { id: "Reglee", name: "Reglee" },
                    { id: "Annuler", name: "Annuler" },
                  ]}
                />
                <SelectInput
                  validate={required("Le directeur est obligatoire")}
                  emptyText="selectionnez le directeur"
                  source="directeursigne"
                  sx={{ width: 650 }}
                  label="Directeur"
                  choices={[
                    { id: "Youness ZAMANI", name: "Youness ZAMANI" },
                    { id: "Mohamed ZAMANI", name: "Mohamed ZAMANI" },
                  ]}
                  initialValue="" // This line can be omitted
                />
                <DateInput
                  sx={{ width: 650 }}
                  source="dateExecution"
                  label="date Execution"
                  validate={[required("Date obligatoire")]}
                />
              </>
            )
          }
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};
