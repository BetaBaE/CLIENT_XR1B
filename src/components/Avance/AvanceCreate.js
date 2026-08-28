import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  AutocompleteInput,
  Create,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";

export const AvanceCreate = () => {
  const theme = useTheme();
  const { identity } = useGetIdentity(); // Hook pour récupérer l'identité de l'utilisateur actuel

  // États pour la gestion de l'affichage des champs ID
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [chantierIdField, setChantierIdField] = useState(false);

  // État pour stocker le code du chantier sélectionné
  const [selectedCodeChantier, setSelectedCodeChantier] = useState("");

  // État pour la catégorie de fournisseur sélectionnée
  const [selectedSupplierCategory, setSelectedSupplierCategory] = useState("");

  // Gestion de l'état de chargement et d'erreur pour l'identité de l'utilisateur
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Chargement...</>; // Affichage d'un message de chargement si l'identité est en cours de récupération
  if (error) return <>Erreur...</>; // Affichage d'un message d'erreur si la récupération de l'identité a échoué

  return (
    <Create>
      <SimpleForm>
        {/* Champ de texte pour afficher le nom complet de l'utilisateur */}
        <TextInput
          defaultValue={identity.username}
          label="Vous êtes"
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          source="fullName"
        />

        {/* Sélecteur d'autocomplétion pour choisir un fournisseur */}
        <ReferenceInput
          source="idfournisseur"
          reference="getAllFournissuersClean"
          perPage={50}
          sort={{ field: "nom", order: "ASC" }}
        >
          <AutocompleteInput
            label="Fournisseur"
            validate={required("Le fournisseur est obligatoire")}
            sx={{
              width: 650,
              input: {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                borderRadius: "4px",
              },
            }}
            slotProps={{
              input: {
                autoComplete: "off",
              },
            }}
            filterToQuery={(searchText) => ({ q: searchText })}
            matchSuggestion={() => true}
            optionText={(record) =>
              record?.id
                ? `${record.nom} ${record.CodeFournisseur}, ${record.catFournisseur}`
                : ""
            }
            onChange={(value, record) => {
              if (!value) {
                setFournisseurIdField(true);
                setChantierIdField(false);
                setSelectedSupplierCategory("");
              } else {
                setFournisseurIdField(false);
                setChantierIdField(true);
                setSelectedSupplierCategory(record?.catFournisseur || "");
              }
            }}
          />
        </ReferenceInput>

        {/* Sélecteur d'autocomplétion pour choisir un chantier */}
        <ReferenceInput
          source="codechantier"
          reference="Chantier"
          perPage={50}
          sort={{ field: "LIBELLE", order: "ASC" }}
        >
          <AutocompleteInput
            validate={required("Le chantier est obligatoire")}
            sx={{
              width: 650,
              input: {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                borderRadius: "4px",
              },
            }}
            slotProps={{
              input: {
                autoComplete: "off",
              },
            }}
            filterToQuery={(searchText) => ({ q: searchText })}
            matchSuggestion={() => true}
            optionText={(record) =>
              record?.id ? `${record.LIBELLE} | ${record.id}` : ""
            }
            onChange={(e) => setSelectedCodeChantier(e)}
          />
        </ReferenceInput>

        {/* Condition pour afficher le sélecteur de service si le chantier sélectionné est "A-9999" */}
        {selectedCodeChantier === "A-9999" && (
          <SelectInput
            sx={{ width: 650 }}
            source="service"
            choices={[
              { id: "comm", name: "Communication" },
              { id: "SI", name: "Service informatique" },
              { id: "RH", name: "Ressource Humaine" },
              { id: "QUALITE", name: "Qualité" },
              { id: "MC", name: "Moyen commun" },
            ]}
          />
        )}

        {/* Champ de texte pour entrer la fiche navette */}
        <TextInput
          label="Fiche navette"
          validate={required("La fiche navette est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: {
              autoComplete: "off",
            },
          }}
          source="ficheNavette"
        />

        {/* Champ de texte pour entrer le bon de commande d'avance */}
        <TextInput
          label="Bon de commande d'avance"
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: {
              autoComplete: "off",
            },
          }}
          validate={required("Le bon de commande est obligatoire")}
          source="Bcommande"
        />

        {/* Champ de texte pour entrer le montant d'avance */}
        <NumberInput
          label="Montant d'avance"
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: {
              autoComplete: "off",
            },
          }}
          validate={(value) => {
            const numericValue = parseFloat(value);
            return numericValue >= 1
              ? undefined
              : "Le montant d'avance doit être supérieur ou égal à 1";
          }}
          source="montantAvance"
        />

        {/* Condition pour afficher le sélecteur de catégorie de document */}
        {selectedSupplierCategory !== "personne morale" && (
          <SelectInput
            disabled={fournisseurIdField}
            sx={{ width: 650 }}
            validate={required("Mentionnez la catégorie")}
            source="CatFn"
            choices={[
              { id: "FET", name: "Fourniture Equipement Travaux" },
              { id: "Service", name: "Service" },
            ]}
            label="Catégorie de document"
          />
        )}

        {/* Champ de texte pour entrer le montant TTC d'avance */}
        <NumberInput
          label="TTC D'Avance"
          validate={required("Le montant d'avance est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: {
              autoComplete: "off",
            },
          }}
          source="TTC"
        />

        {/* Champ de texte pour entrer le montant HT */}
        <NumberInput
          label="Mentionnez HT"
          validate={required("HT est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: {
              autoComplete: "off",
            },
          }}
          source="HT"
        />

        {/* Champ de texte pour entrer le montant TVA */}
        <NumberInput
          label="Mentionnez TVA"
          validate={required("TVA est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: {
              autoComplete: "off",
            },
          }}
          source="MontantTVA"
        />
        <SelectInput
          disabled={fournisseurIdField}
          sx={{ width: 650 }}
          validate={required("Mentionnez la catégorie")}
          source="CatFn"
          choices={[
            { id: "FET", name: "Fourniture Equipement Travaux" },
            { id: "Service", name: "Service" },
          ]}
          label="Catégorie de document"
        />
      </SimpleForm>
    </Create>
  );
};
