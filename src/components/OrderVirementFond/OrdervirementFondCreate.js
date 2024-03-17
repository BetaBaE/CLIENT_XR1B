import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  Create,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

export const OrdervirementFondCreate = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const dataProvider = useDataProvider();
  const [ribAtner, setribAtner] = useState([]);
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


  useEffect(() => {
    // Désactiver l'autocomplétion après le chargement du DOM
    const inputribAtner = document.getElementById("ribAtner");
    const inputdirecteursigne = document.getElementById("directeursigne");
 
    if (inputribAtner ||inputdirecteursigne  ) {
      inputribAtner.autocomplete = "off";
      inputdirecteursigne.autocomplete = "off";
     
    }
  }, []);

  let rib_choices = ribAtner.map(({ id, nom, rib }) => ({
    id: id,
    name: `(${nom}) ${rib}`,
  }));
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
        > 
        </TextInput>
        <SelectInput
          className={classes.autocomplete}
          validate={required("Le RIB est obligatoire")}
          source="ribAtner"
          choices={rib_choices}
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
      </SimpleForm>
    </Create>
  );
};
