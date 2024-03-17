import { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import apiUrl from "../../config";
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
  // Separate styles for SweetAlert
  'swal2-popup.swal2-left': {
    right: 0,
    transform: 'translateX(0)',
  },
}));
export const VirementFondCreate = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const [orderVirement, setOrderVirement] = useState([
    {
      id: "null",
      ribAtner: 0,
      datecreation: "",
      etat: "",
    },
  ]);
  const [RibAtner, setRibAtner] = useState([
    {
      nom: "",
      id: 0,
      rib: "",
      validation: "",
    },
  ]);
  const [orderVirementField, setOrderVirementField] = useState(true);
  useEffect(() => {
    fetch(`${apiUrl}/ordervirementencoursFond`)
      .then((response) => response.json())
      .then((json) => setOrderVirement(json));
  }, []);
  const getFournisseurFilteredByOv = (id) => {
    fetch(
      `${apiUrl}/ribatnerValid/${id}?ordervirment={"id":"${id}"}`
    )
      .then((response) => response.json())
      .then((json) => setRibAtner(json));
  };
  let orderVirement_choices = orderVirement.map(({ id }) => ({
    id: id,
    name: id,
  }));
  let ribAtner_choices = RibAtner.map(
    ({ id, nom, rib }) => ({
      id: id,
      name: `${nom}|||${rib}`,
    })
  );
  const classes = useStyles();
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>
  return (
    <Create>
      <SimpleForm>
      <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Redacteur"
        ></TextInput>
        <SelectInput
          validate={required("Ce champ est obligatoire")}
          className={classes.autocomplete}
          source="orderVirementFondId"
          onChange={(e) => {
            // console.log(e.target.value);
            if (e.target.value === "") {
              setOrderVirementField(true);
            } else {
              setOrderVirementField(false);
              getFournisseurFilteredByOv(e.target.value);
            }
          }}
          choices={orderVirement_choices}
        />
        <AutocompleteInput
          validate={required("Ce champ est obligatoire")}
          disabled={orderVirementField}
          className={classes.autocomplete}
          source="RibAtnerDestId"
          choices={ribAtner_choices}
          // onChange={(e) => {
          //   setOnchangefournisseur(e);
          //   // console.log(e);
          //   if (!e) {
          //     setFournisseurIdField(true);
          //    // getCheckedFournisseur(e)
          //   } else {
          //     setFournisseurIdField(false);
          //    // getCheckedFournisseur(e)
          //   }
          // }}
        />
{/* 

        <SelectInput
          validate={required("Ce champ est obligatoire")}
          disabled={fournisseurIdField}
          className={classes.autocomplete}
          onChange={(e) => {
            if (e.target.value === "") {
            } else {
             
            }
          }}
          source="ribFournisseurId"
          
        />
    */}

<TextInput
          validate={[ required("Le Montant est obligatoire")]}
          className={classes.autocomplete}
          source="montantVirement"
        />

      </SimpleForm>
    </Create>
  );
};
