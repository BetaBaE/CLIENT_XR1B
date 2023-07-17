import {
  AutocompleteInput,
  Edit,
  regex,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "580px",
  },
}));

export const FactureValiderEdit = () => {
  const [chantier, setChantier] = useState([]);
  const classes = useStyles();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const dataProvider = useDataProvider();

  useEffect(() => {
    dataProvider
      .getList("chantier", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "LIBELLE", order: "ASC" },
      })
      .then(({ data }) => {
        setChantier(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider]);

  const validateBc = regex(
    /^CF[0-9]{3}[0-9]{3}$/,
    "Ce bon de commande n'est pas valide"
  );

  const chantierChoices = chantier.map(({ id, LIBELLE, CODEAFFAIRE }) => ({
    id: id,
    name: `${LIBELLE} | ${CODEAFFAIRE}`,
  }));

  return (
    <Edit>
      <SimpleForm>
        <TextInput
          defaultValue={identity.fullName}
          label="Vous êtes"
          disabled={true}
          source="updatedBy"
        />
        <SelectInput
          source="verifiyMidelt"
          choices={[{ id: "verifié", name: "verifié" }]}
        />
        <TextInput
          source="BonCommande"
          label="Bon de Commande"
          
          resettable
        />
        <AutocompleteInput
          label="Chantier"
          source="codechantier"
          choices={chantierChoices}
          className={classes.autocomplete}
        />
      </SimpleForm>
    </Edit>
  );
};
