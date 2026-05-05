import {
  AutocompleteInput,
  CreateButton,
  DatagridConfigurable,
  DateField,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  ReferenceInput,
  SelectColumnsButton,
  SelectInput,
  TextField,
  TopToolbar,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";

const natureChoices = [
  { id: "globale", name: "Globale" },
  { id: "specifique", name: "Spécifique" },
];

const typeChoices = ["CP", "CD", "CRG", "CRA", "CDIV", "CDEC"].map((value) => ({
  id: value,
  name: value,
}));

const origineChoices = [
  { id: "MIDELT", name: "MIDELT" },
  { id: "RABAT", name: "RABAT" },
];

const CautionListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
    <SelectColumnsButton />
  </TopToolbar>
);

export const CautionList = () => {
  const inputStyle = useInputStyleFilters();

  const cautionFilters = [
    <SelectInput
      key="nature"
      source="nature"
      label="Nature"
      choices={natureChoices}
      sx={inputStyle}
    />,
    <SelectInput
      key="type"
      source="type"
      label="Type"
      choices={typeChoices}
      sx={inputStyle}
    />,
    <SelectInput
      key="origine"
      source="origine"
      label="Origine"
      choices={origineChoices}
      sx={inputStyle}
    />,
    <ReferenceInput key="idMarche" source="idMarche" reference="marche" perPage={5000}>
      <AutocompleteInput
        label="Marché"
        optionValue="id"
        sx={{ ...inputStyle, width: 350 }}
        optionText={(choice) =>
          choice
            ? `${choice.numero || ""} - ${choice.codeAffaireText || choice.codeAffaire || ""}`
            : ""
        }
      />
    </ReferenceInput>,
  ];

  return (
    <List filters={cautionFilters} actions={<CautionListActions />}>
      <DatagridConfigurable bulkActionButtons={false} rowClick="edit">
        <TextField source="numero" label="N° caution" />
        <TextField source="nature" label="Nature" />
        <TextField source="type" label="Type" />
        <TextField source="marcheNumero" label="N° marché" />
        <TextField source="codeAffaire" label="Code affaire" />
        <TextField source="chantierLibelle" label="Chantier" />
        <TextField source="banqueNom" label="Banque" />
        <TextField source="fournisseurNom" label="Fournisseur" />
        <TextField source="numeroDossier" label="N° dossier" />
        <DateField source="dateDelivrance" label="Date délivrance" />
        <DateField source="dateEcheance" label="Date échéance" />
        <NumberField source="montant" label="Montant" />
        <TextField source="origine" label="Origine" />
        <NumberField source="taux" label="Taux" />
        <TextField source="createdBy" label="Créé par" />
        <DateField source="createdAt" label="Date création" />
        <TextField source="updatedBy" label="Modifié par" />
        <DateField source="updatedAt" label="Date modification" />
      </DatagridConfigurable>
    </List>
  );
};
