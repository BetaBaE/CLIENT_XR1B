// src/pages/transferItems/TransferItemCreate.jsx
import {
  Create,
  SimpleForm,
  NumberInput,
  ReferenceInput,
  AutocompleteInput,
  useNotify,
  required,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
import { useState, useCallback } from "react";
import apiUrl from "../../config";

export const TransferItemCreate = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotify();

  const fetchBeneficiaries = useCallback(
    async (transferId) => {
      if (!transferId) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/beneficiaries/${transferId}/not-in-transfer`
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setBeneficiaries(Array.isArray(data) ? data : []);
      } catch (error) {
        notify("Failed to load beneficiaries", { type: "error" });
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [notify]
  );

  return (
    <Create>
      <SimpleForm>
        <ReferenceInput
          source="MassTransferId"
          reference="transfers"
          label="Transfert de masse Référence"
          filter={{ StatusA: "'Saisie', 'Genere'" }} // Only show records with these statuses
        >
          <AutocompleteInput
            sx={useInputStyleFilters}
            validate={required()}
            optionText="Reference"
            filterToQuery={(searchText) => ({
              StatusA: "'Saisie', 'Genere'", // Ensure only Saisie/Genere appear in results
            })}
            onChange={(event, choice) =>
              choice?.id && fetchBeneficiaries(choice.id)
            }
          />
        </ReferenceInput>

        <AutocompleteInput
          source="BeneficiaryId"
          sx={useInputStyleFilters}
          label="Bénéficiaire"
          validate={required()}
          choices={beneficiaries}
          optionValue="id"
          disabled={isLoading || !beneficiaries.length}
          isLoading={isLoading}
        />

        <NumberInput
          validate={required()}
          source="amount"
          label="Montant"
          min={0}
          sx={useInputStyleFilters}
        />
      </SimpleForm>
    </Create>
  );
};
