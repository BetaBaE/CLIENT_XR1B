import {
  Create,
  DateInput,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";

export const OvcredocCreate = () => {
  const { identity } = useGetIdentity();
  const requiredField = required("Ce champ est obligatoire");
  return (
    <Create>
      <SimpleForm>
        <TextInput
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          source="Redacteur"
          sx={useInputStyleFilters}
          label="Vous êtes"
          defaultValue={identity?.fullName}
        />
        <SelectInput
          validate={requiredField}
          source="TypePaiement"
          choices={[
            { id: "Credoc", name: "CREDOC" },
            { id: "Ordre Virement", name: "Ordre Virement" },
          ]}
          sx={useInputStyleFilters}
          slotProps={{
            input: {
              autoComplete: "off",
            },
          }}
        />
        <ReferenceInput source="ribAtner" reference="ribatner" label="nom">
          <SelectInput
            optionText={(record) => `${record.nom} (${record.rib})`}
            validate={requiredField}
          />
        </ReferenceInput>
        <DateInput source="dateEcheance" />
        <NumberInput source="joursEcheance" />
        <SelectInput
          validate={requiredField}
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
        />
      </SimpleForm>
    </Create>
  );
};
