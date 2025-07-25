import {
  CreateButton,
  DatagridConfigurable,
  DateField,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceField,
  SelectColumnsButton,
  SelectInput,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
import FactureInternationalFilter from "./FactureInternastionalFilter";

const FactureDeviseFilters = [
  <TextInput source="NumDossier" label="N° Dossier" />,
  <SelectInput
    source="Devise"
    choices={[
      { id: "USD", name: "USD - US Dollar" },
      { id: "EUR", name: "EUR - Euro" },
      { id: "GBP", name: "GBP - British Pound" },
      { id: "CAD", name: "CAD - Canadian Dollar" },
      { id: "AUD", name: "AUD - Australian Dollar" },
      { id: "CHF", name: "CHF - Swiss Franc" },
      { id: "JPY", name: "JPY - Japanese Yen" },
      { id: "CNY", name: "CNY - Chinese Yuan" },
      { id: "SAR", name: "SAR - Saudi Riyal" },
      { id: "AED", name: "AED - Emirati Dirham" },
    ]}
    sx={useInputStyleFilters}
    slotProps={{
      input: {
        autoComplete: "off",
      },
    }}
  />,
  <TextInput source="nom" label="Fournisseur" />,
  <TextInput source="numDoc" label="N° facture" />,
  <TextInput source="codeChantier" label="Chantier" />,
  <TextInput source="Redacteur" label="Createur" />,
];

const FactureInterListActions = () => (
  <TopToolbar>
    <FilterButton filters={FactureDeviseFilters} />
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const FacturesinternationalList = () => (
  <List
    actions={<FactureInterListActions />}
    filters={<FactureInternationalFilter />}
    title="Factures Internationales"
  >
    <DatagridConfigurable bulkActionButtons={false} rowClick="edit">
      <ReferenceField
        source="idDossier"
        reference="dossier"
        label="Num Dossier"
        link={false}
      >
        <TextField source="NumDossier" />
      </ReferenceField>
      <TextField source="Devise" />
      <NumberField source="MontantHtDevise" label="HT Devise" />
      <NumberField source="MontantTvaDevise" label="TVA Devise" />
      <NumberField source="MontantTTCDevise" label="TTC Devise" />
      <NumberField source="MontantPreparation" />
      <NumberField source="CumulPaiementDevise" label="Cumul Paie" />
      <NumberField source="TauxInit" />
      <NumberField source="MontantHtDh" label="HT DH" />
      <NumberField source="MontantTvaDh" label="TVA DH" />
      <NumberField source="MontantTTCDh" label="TTC DH" />
      <ReferenceField
        source="iddesignation"
        reference="designations"
        label="designation"
        link={false}
      >
        <NumberField source="designation" />
      </ReferenceField>
      <ReferenceField
        source="idFournisseur"
        reference="allfournisseurs"
        label="Fournisseurs"
        link={false}
      >
        <NumberField source="nom" />
      </ReferenceField>

      <DateField source="dateDoc" label="Date Facture" />
      <TextField source="numDoc" label="N° Facture" />
      <TextField source="codeChantier" label="Chantier" />
      <TextField source="Redacteur" label="Createur" />
      <DateField source="dateDouane" />
    </DatagridConfigurable>
  </List>
);
