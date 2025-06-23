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
import { useTheme } from "@mui/material/styles";
export const OrdervirementCreate = () => {
  const theme = useTheme();
  const { identity, isLoading, error } = useGetIdentity(); // Single call
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

    if (inputribAtner || inputdirecteursigne) {
      inputribAtner.autocomplete = "off";
      inputdirecteursigne.autocomplete = "off";
    }
  }, []);

  let rib_choices = ribAtner.map(({ id, nom, rib }) => ({
    id: id,
    name: `(${nom}) ${rib}`,
  }));

  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          source="Redacteur"
        />
        <SelectInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          validate={required("Le RIB est obligatoire")}
          source="ribAtner"
          choices={rib_choices}
        />
        <SelectInput
          validate={required("Le directeur est obligatoire")}
          emptyText="selectionnez le directeur"
          source="directeursigne"
          label="Directeur"
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
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
