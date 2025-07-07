import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";

import { useInputStyle, useInputStyleFilters } from "../global/DarkInputStyle";

const useTransferItemListFilter = () => {
  return [
    <TextInput
      key="transferReference"
      source="TransferReference"
      label="Référence de transfert"
      sx={useInputStyleFilters}
    />,
    <ReferenceInput
      key="beneficiaryId"
      source="BeneficiaryId"
      reference="beneficiaries"
      label="Bénéficiaire Nom"
      sx={useInputStyle}
      perPage={500}
    >
      <AutocompleteInput
        sx={useInputStyle}
        optionText={(record) =>
          `${record.LastName} ${record.FirstName} (${record.IdentityNumber})`
        }
        filterToQuery={(searchText) => ({ q: searchText })}
        resettable
      />
    </ReferenceInput>,
    <ReferenceInput
      source="MassTransferId"
      reference="transfers"
      label="Reference MASSE"
      sx={useInputStyle}
      perPage={500}
    >
      <AutocompleteInput
        source="Reference"
        filterToQuery={(searchText) => ({ q: searchText })}
        optionText={(record) =>
          `${record.Reference} (${record.TotalAmount} DH) - (${record.Status})`
        }
        sx={useInputStyle}
      />
    </ReferenceInput>,
  ];
};

export const TransferItemList = () => {
  const filters = useTransferItemListFilter();
  return (
    <List filters={filters}>
      <Datagrid bulkActionButtons={false} rowClick="edit">
        <TextField source="TransferReference" label="Référence de transfert" />
        <NumberField source="Amount" label="Montant" />

        <ReferenceField
          source="BeneficiaryId"
          reference="beneficiaries"
          label="Bénéficiaire Nom"
          link={false}
        >
          <TextField source="LastName" />
        </ReferenceField>
        <ReferenceField
          source="BeneficiaryId"
          reference="beneficiaries"
          label="Bénéficiaire Prenom"
          link={false}
        >
          <TextField source="FirstName" />
        </ReferenceField>
        <ReferenceField
          source="BeneficiaryId"
          reference="beneficiaries"
          label="Bénéficiaire Identité"
          link={false}
        >
          <TextField source="IdentityNumber" />
        </ReferenceField>

        <ReferenceField
          source="MassTransferId"
          reference="transfers"
          label="Reference MASSE"
          link={false}
        >
          <TextField source="Reference" />
        </ReferenceField>
        <ReferenceField
          source="MassTransferId"
          reference="transfers"
          label="Status MASSE"
          link={false}
        >
          <TextField source="Status" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
