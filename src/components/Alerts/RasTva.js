import {
  Datagrid,
  DateField,
  InfiniteList,
  NumberField,
  TextField,
} from "react-admin";
import RasTvaFilter from "./RasTvaFilter";

export const RastvaList = () => (
  <InfiniteList filters={<RasTvaFilter />}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="catFournisseur" />
      <TextField source="Identifiant fiscal" />
      <TextField source="ICE" label="ICE" />
      <TextField source="nom" />
      <TextField source="RefernceDOC" label="Refernce Document" />
      <TextField source="CategorieFn" />
      <DateField source="dateFactue" />
      <DateField source="DateOperation" />
      <NumberField source="HT" label="HT" />
      <TextField source="Pourcentage TVA" label="Pourcentage TVA" />
      <NumberField source="TauxTva" label="TauxTva" />
      <TextField source="Pourcentage Ras" />
      <NumberField source="RaS" label="RaS" />
    </Datagrid>
  </InfiniteList>
);
