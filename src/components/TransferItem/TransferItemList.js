import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
} from "react-admin";

export const TransferItemList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
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
        label="Reference Transfert"
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
      {/* <TextField source="MassTransferId" label="ID Transfert de masse" /> */}
      {/* <TextField source="BeneficiaryId" label="ID Bénéficiaire" /> */}
    </Datagrid>
  </List>
);
