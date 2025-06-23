import {
  DateInput,
  DateTimeInput,
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);
export const OvcredocEdit = () => {
  const requiredField = required("Ce champ est obligatoire");
  return (
    <Edit>
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput
          sx={useInputStyleFilters}
          source="id"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
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
        <NumberInput sx={useInputStyleFilters} source="ribAtner" />
        <ReferenceInput source="ribAtner" reference="ribatner" label="nom">
          <SelectInput
            optionText={(record) => `${record.nom} (${record.rib})`}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </ReferenceInput>
        <DateInput sx={useInputStyleFilters} source="dateEcheance" />
        <NumberInput sx={useInputStyleFilters} source="joursEcheance" />
        <TextInput sx={useInputStyleFilters} source="etat" />
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
        <DateTimeInput
          source="dateExecution"
          locales="fr-MA" // Consistent Morocco time
          sx={useInputStyleFilters}
        />
        <SelectInput
          validate={required("Le directeur est obligatoire")}
          emptyText="selectionnez le directeur"
          source="directeurSigne"
          label="Directeur"
          sx={useInputStyleFilters}
          choices={[
            { id: "Youness ZAMANI", name: "Youness ZAMANI" },
            { id: "Mohamed ZAMANI", name: "Mohamed ZAMANI" },
          ]}
          initialValue="" // This line can be omitted
        />
      </SimpleForm>
    </Edit>
  );
};
