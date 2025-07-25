import {
  DatagridConfigurable,
  DateField,
  DateInput,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  Pagination,
  SelectColumnsButton,
  SimpleShowLayout,
  TextField,
  TextInput,
  TopToolbar,
  useGetOne,
  useListContext,
  usePermissions,
  useRecordContext,
} from "react-admin";
import FilterFactureDetailList from "./FilterFactureDetailList";
import { Box, Grid, Typography } from "@mui/material";
import { createExporter } from "../GlobalFunction/CustomExportCsv";
const FacturePagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);

const newLoGFilter = [
  <DateInput source="dateExercices" />,
  <TextInput source="codechantier" />,
  <TextInput source="nom" />,
  <TextInput source="numeroFacture" />,
  <TextInput source="Fn" />,
  <DateInput source="DateFacture" />,
  <TextInput source="Etat" />,
  <TextInput source="modepaiement" />,
  <TextInput source="RefPay" />,
  <DateInput source="DateOperation" />,
  <TextInput source="Bank" />,
];

const FactureDetailsActions = () => {
  return (
    <TopToolbar>
      <FilterButton userRolee="admin" filters={newLoGFilter} />
      <SelectColumnsButton />
      <ExportButton />
    </TopToolbar>
  );
};

const FactureDetail = () => {
  const record = useRecordContext(); // Fetch current row data (the expanded row)

  // Ensure that idAvance exists before attempting to call useGetOne
  const idAvance = record?.idAvance;

  // Call useGetOne unconditionally, but check if idAvance is defined in the hook's parameters
  const {
    data: relatedData,
    isLoading,
    error,
  } = useGetOne("getavancedetails", { id: idAvance });

  // Handle cases where `idAvance` is undefined (before calling useGetOne)
  // eslint-disable-next-line eqeqeq
  if (idAvance == "null") {
    return <div>Pas D'avance sur cette Facture</div>;
  }
  if (!idAvance) {
    return <div>Pas D'avance sur cette Facture</div>;
  }

  // Loading state
  if (isLoading) {
    return <div>Telechargement de donnée..</div>;
  }

  // Error handling
  if (error) {
    return <div>Error loading related data.</div>;
  }
  console.log("fetch", relatedData);

  // Render SimpleShowLayout once data is available
  return (
    <SimpleShowLayout>
      <Grid container>
        {/* BonCommande */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" component="div">
            <Box fontWeight={700}>Bon Commande</Box>
          </Typography>

          <TextField source="BonCommande" record={relatedData} />
        </Grid>
        {/* Fn */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" component="div">
            <Box fontWeight={700}>FN</Box>
          </Typography>
          <TextField source="Fn" record={relatedData} />
        </Grid>
        {/* Mode Paiement */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" component="div">
            <Box fontWeight={700}>Etat Avance</Box>
          </Typography>
          <TextField source="Etat" record={relatedData} />
        </Grid>
        {/* Ref Pay */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" component="div">
            <Box fontWeight={700}>Ref Pay</Box>
          </Typography>
          <TextField source="RefPay" record={relatedData} />
        </Grid>
        {/* Date Operation */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" component="div">
            <Box fontWeight={700}>Date Operation</Box>
          </Typography>
          <DateField source="DateOperation" record={relatedData} />
        </Grid>
        {/* Ras */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" component="div">
            <Box fontWeight={700}>RAS</Box>
          </Typography>
          <TextField source="Ras" record={relatedData} />
        </Grid>
        {/* Bank */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" component="div">
            <Box fontWeight={700}> Bank</Box>
          </Typography>
          <TextField source="Bank" record={relatedData} />
        </Grid>
        {/* Montant Paiement */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" component="div">
            <Box fontWeight={700}> Montant Paiement</Box>
          </Typography>
          <NumberField source="montantPaiement" record={relatedData} />
        </Grid>
      </Grid>
    </SimpleShowLayout>
  );
};

export const GetfacturedetailList = () => {
  const { permissions } = usePermissions();
  const resource = "getfacturedetails";
  const fileName = "Facture Log";

  let activeExporter;

  const ExporterBridge = () => {
    const { filterValues } = useListContext();
    activeExporter = async () => {
      const exportFunction = createExporter(resource, fileName);
      return exportFunction(filterValues);
    };
    return null; // invisible
  };

  let filterChantier;

  switch (permissions) {
    case "montage":
      filterChantier = "A-9994";
      break;
    case "electricite":
      filterChantier = "A-9991";
      break;
    default:
      filterChantier = "";
      break;
  }
  const currentYear = new Date().getFullYear();
  const defaultDateExercices = `${currentYear}-01-01`;
  return (
    <List
      exporter={(data, fetchRelated, ctx) => activeExporter?.()}
      pagination={<FacturePagination />}
      filters={<FilterFactureDetailList />}
      actions={<FactureDetailsActions />}
      filterDefaultValues={{
        dateExercices: defaultDateExercices,
        codechantier: filterChantier,
      }}
      title="nouv. Facture Log"
    >
      <DatagridConfigurable
        expand={<FactureDetail />}
        expandSingle
        bulkActionButtons={false}
      >
        <ExporterBridge />
        <TextField source="codechantier" />
        <TextField source="nom" />
        <TextField source="Fn" />
        <TextField source="numeroFacture" />
        <DateField source="DateFacture" />
        <NumberField source="HT" label="HT" />
        <NumberField source="MontantTVA" label="TVA" />
        <NumberField source="TTC" label="TTC" />
        <NumberField source="montantPaiement" />
        <NumberField source="AcompteReg" />
        <NumberField source="AcompteVal" />
        <TextField source="Etat" />
        <TextField source="modepaiement" />
        <TextField source="RefPay" />
        <DateField source="DateOperation" />
        <NumberField source="Ras" />
        <TextField source="Bank" />
        <TextField source="idAvance" />
      </DatagridConfigurable>
    </List>
  );
};
