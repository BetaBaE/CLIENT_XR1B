import {
  AutocompleteInput,
  CreateButton,
  DatagridConfigurable,
  DateField,
  ExportButton,
  FilterButton,
  FunctionField,
  List,
  NumberField,
  ReferenceInput,
  SelectColumnsButton,
  SelectInput,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";

const MarcheListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
    <SelectColumnsButton />
  </TopToolbar>
);

export const MarcheList = () => {
  const inputStyle = useInputStyleFilters();

  const marcheFilters = [
    <TextInput
      key="numero"
      source="numero"
      label="N° marché"
      sx={inputStyle}
    />,
    <TextInput key="client" source="client" label="Client" sx={inputStyle} />,
    <ReferenceInput
      key="codeAffaire"
      source="codeAffaire"
      reference="Chantier"
      perPage={5000}
    >
      <AutocompleteInput
        label="Chantier"
        optionValue="id"
        sx={{ ...inputStyle, width: 350 }}
        optionText={(choice) =>
          choice ? `${choice.CODEAFFAIRE || ""} - ${choice.LIBELLE || ""}` : ""
        }
      />
    </ReferenceInput>,
    <ReferenceInput
      key="natissementBankId"
      source="natissementBankId"
      reference="ribatner"
      perPage={1000}
    >
      <SelectInput label="Banque" optionText="nom" />
    </ReferenceInput>,
    <SelectInput
      key="statut"
      source="statut"
      label="Statut"
      sx={inputStyle}
      choices={[
        { id: "En cours", name: "En cours" },
        { id: "Réceptionné PV", name: "Réceptionné provisoire" },
        { id: "Réceptionné DF", name: "Réceptionné définitive" },
        { id: "Annulé", name: "Annulé" },
        { id: "Clôturé", name: "Clôturé" },
      ]}
    />,
  ];

  return (
    <List filters={marcheFilters} actions={<MarcheListActions />}>
      <DatagridConfigurable bulkActionButtons={false} rowClick="edit">
        <TextField source="numero" label="N° Marché" />
        <TextField source="codeAffaireText" label="Code affaire" />
        <TextField source="chantierLibelle" label="Chantier" />
        <TextField source="client" label="Client" />
        <TextField source="partenaire" label="Partenaire" />
        <TextField source="objet" label="Objet" />
        <TextField source="bailleur" label="Bailleur" />
        <NumberField source="montant" label="Montant" />
        <TextField source="bankNom" label="Banque natissement" />
        <DateField source="dateMES" label="Date MES" />
        <DateField source="dateRP" label="Date réception provisoire" />
        <TextField source="PV_RP" label="Réception provisoire" />
        <DateField source="dateRD" label="Date réception définitive" />
        <TextField source="PV_RD" label="Réception définitive" />
        <TextField source="delai" label="Délai (mois)" />
        <TextField source="statut" label="Statut" />
        <TextField source="createdBy" label="Créé par" />
        <DateField source="createdAt" label="Date création" />
        <TextField source="updatedBy" label="Modifié par" />
        <DateField source="updatedAt" label="Date modification" />
        <FunctionField
          label="TVA"
          render={(record) =>
            `${((Number(record?.tauxTva || 0) - 1) * 100).toFixed(0)}%`
          }
        />
      </DatagridConfigurable>
    </List>
  );
};
