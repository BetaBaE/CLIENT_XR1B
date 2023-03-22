import { Datagrid, DateField, List, TextField } from "react-admin";
import AllFilter from "./AllFilter";

export const All = () => {
  return (
    <List filters={<AllFilter />} title="Log Facture Saisie">
      <Datagrid bulkActionButtons={false}>
        <TextField source="chantier" label="chantier" />
        <TextField source="designation" label="designation" />

        <TextField source="BonCommande" label="BonCommande" />

        <TextField source="numeroFacture" label="numeroFacture" />

        <DateField source="DateFacture" label="datefactue" />

        <DateField
          showTime
          source="Dateexecution"
          options={{ timeZone: "UTC" }}
        />
        <TextField source="CodeFournisseur" label="codefournisseur" />
        <TextField source="fournisseur" label="fournisseur" />
        <TextField source="rib" label="ribfournisseur" />
        <TextField source="TTC" label="ttc" />

        <TextField source="HT" label="horstaxe" />

        <TextField source="MontantTVA" label="récupération tva" />

        <TextField source="etat" label="etat" />

        <TextField source="orderVirementId" label="ordervirement" />

        <TextField source="ficheNavette" label="ficheNavette" />
        <TextField source="banque" label="banque" />

        <DateField
          showTime
          source="dateOperation"
          options={{ timeZone: "UTC" }}
        />
      </Datagrid>
    </List>
  );
};
