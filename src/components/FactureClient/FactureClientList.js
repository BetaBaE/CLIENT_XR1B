import {
  AutocompleteInput,
  CreateButton,
  DatagridConfigurable,
  DateField,
  DateInput,
  ExportButton,
  FilterButton,
  FunctionField,
  List,
  NumberField,
  ReferenceInput,
  SelectInput,
  SelectColumnsButton,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { Chip } from "@mui/material";
import { useInputStyleFilters } from "../global/DarkInputStyle";

const FactureClientListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
    <SelectColumnsButton />
  </TopToolbar>
);

export const FactureClientList = () => {
  const inputStyle = useInputStyleFilters();

  const filters = [
    <ReferenceInput key="idMarche" source="idMarche" reference="marche" perPage={5000}>
      <AutocompleteInput
        label="Marché"
        optionValue="id"
        sx={{ ...inputStyle, width: 350 }}
        filterToQuery={(searchText) => ({ numero: searchText })}
        optionText={(choice) =>
          choice
            ? `${choice.numero || ""} - ${choice.codeAffaireText || choice.codeAffaire || ""}`
            : ""
        }
      />
    </ReferenceInput>,
    <TextInput
      key="numeroFacture"
      source="numeroFacture"
      label="N° facture"
      sx={inputStyle}
    />,
    <DateInput key="dateFacture_gte" source="dateFacture_gte" label="Date facture du" sx={inputStyle} />,
    <DateInput key="dateFacture_lte" source="dateFacture_lte" label="Date facture au" sx={inputStyle} />,
    <SelectInput
      key="etat"
      source="etat"
      label="Etat"
      sx={inputStyle}
      choices={[
        { id: "saisie", name: "saisie" },
        { id: "annulee", name: "annulee" },
      ]}
    />,
  ];

  return (
    <List filters={filters} actions={<FactureClientListActions />}>
      <DatagridConfigurable
        bulkActionButtons={false}
        rowClick={(id, resource, record) =>
          record?.etat === "annulee" ? false : "edit"
        }
        rowSx={(record) => ({
          opacity: record?.etat === "annulee" ? 0.6 : 1,
          cursor: record?.etat === "annulee" ? "default" : "pointer",
        })}
      >
        <TextField source="numeroFacture" label="N° facture" />
        <DateField source="dateFacture" label="Date facture" />
        <FunctionField
          source="etat"
          label="Etat"
          render={(record) => (
            <Chip
              size="small"
              label={record?.etat || "saisie"}
              color={record?.etat === "annulee" ? "error" : "primary"}
            />
          )}
        />
        <TextField source="marcheNumero" label="N° marché" />
        <TextField source="codeAffaire" label="Code affaire" />
        <TextField source="chantierLibelle" label="Chantier" />
        <NumberField source="HT" label="HT" />
        <NumberField source="Tva" label="TVA" />
        <NumberField source="TTC" label="TTC" />
        <NumberField source="RestitAccompte" label="Restit. Accompte" />
        <NumberField source="retenueGarantie1" label="Retenue Garantie 1" />
        <NumberField source="retenueGarantie2" label="Retenue Garantie 2" />
        <TextField source="cautionNumero" label="N° caution" />
        <NumberField source="CautionRG" label="Caution RG" />
        <NumberField source="Penalite" label="Pénalité" />
        <NumberField source="Approvisionnement" label="Approvisionnement" />
        <NumberField source="revPrix" label="Rev. prix" />
        <NumberField source="netTTC" label="Net TTC" />
        <TextField source="createdBy" label="Créé par" />
        <DateField source="createdAt" label="Date création" />
        <TextField source="updatedBy" label="Modifié par" />
        <DateField source="updatedAt" label="Date modification" />
      </DatagridConfigurable>
    </List>
  );
};
