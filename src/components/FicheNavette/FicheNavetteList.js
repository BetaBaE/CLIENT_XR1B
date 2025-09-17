import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import FactureFicheNavetteFilter from "./FicheNavetteFilter";

export const FicheNavetteList = (props) => {
  return (
    <List filters={<FactureFicheNavetteFilter />} title="Fiche Navette">
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="nom" label="nom" />
        <TextField source="FN" label="fiche navette" />
        <TextField source="codechantier" label="code chantier" />
        <TextField source="NumeroDoc" label="Numero Document" />
        <DateField source="DateDoc" label="Date Document" />
        <NumberField source="HT" label="HT" />
        <NumberField source="TVA" label="TVA" />
        <NumberField source="TTC" label="TTC" />
        <TextField source="Etat" />
        <TextField source="CatDoc" label="Categorie Document" />
      </Datagrid>
    </List>
  );
};
