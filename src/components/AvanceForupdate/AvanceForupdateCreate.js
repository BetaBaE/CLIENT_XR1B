import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  AutocompleteInput,
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

import { Grid } from "@mui/material";

export const AvanceForupdateCreate = () => {
  const theme = useTheme();
  const { identity } = useGetIdentity(); // Hook pour récupérer l'identité de l'utilisateur actuel
  // Utilisation des styles définis
  const [ttc, setTTC] = useState(0);

  const [tvainput, setTVAinput] = useState("");
  const [ht, setHT] = useState(0);
  const [prctTVA, setPrctTVA] = useState(1);
  // États pour la gestion de l'affichage des champs ID
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [chantierIdField, setChantierIdField] = useState(false);

  // const [newIdentity, setNewIdentity] = useState('');
  // const [tva, setTVA] = useState([]);
  const [FourRasIR, setFourRasIR] = useState("");
  // État pour stocker le code du chantier sélectionné
  const [selectedCodeChantier, setSelectedCodeChantier] = useState("");
  // État pour la catégorie de fournisseur sélectionnée
  const [selectedSupplierCategory, setSelectedSupplierCategory] = useState("");
  console.log(chantierIdField, selectedSupplierCategory);

  // Gestion de l'état de chargement et d'erreur pour l'identité de l'utilisateur
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Chargement...</>; // Affichage d'un message de chargement si l'identité est en cours de récupération
  if (error) return <>Erreur...</>; // Affichage d'un message d'erreur si la récupération de l'identité a échoué

  return (
    <Create title="Créer une avance">
      <SimpleForm>
        {/* Champ de texte pour afficher le nom complet de l'utilisateur */}

        <Grid container>
          <Grid item md={6}>
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
                },
              }}
              source="fullName"
            />
          </Grid>
          <Grid item md={6}>
            <TextInput
              label="N° Proforma / Devis"
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
                input: { autoComplete: "off" },
              }}
              validate={required("N° Proforma / Devis est obligatoire")}
              source="NdocAchat"
            />
          </Grid>
          <Grid item md={6}>
            <DateInput
              label="Date de document"
              sx={{ width: 650 }}
              validate={required("Date de document est obligatoire")}
              source="DateDocAchat"
            />
          </Grid>
          {/* Sélecteur d'autocomplétion pour choisir un fournisseur */}
          <Grid item md={6}>
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
                  input: { autoComplete: "off" },
                }}
                filterToQuery={(searchText) => ({ q: searchText })}
                matchSuggestion={() => true}
                optionText={(record) =>
                  record?.id
                    ? `${record.nom} ${record.CodeFournisseur}, ${record.catFournisseur}`
                    : ""
                }
                onChange={(value, record) => {
                  setFourRasIR(record || null);
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
          </Grid>
          {/* Sélecteur d'autocomplétion pour choisir un chantier */}
          <Grid item md={6}>
            <ReferenceInput
              source="codechantier"
              reference="chantier"
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
                  input: { autoComplete: "off" },
                }}
                filterToQuery={(searchText) => ({ q: searchText })}
                matchSuggestion={() => true}
                optionText={(record) =>
                  record?.id ? `${record.LIBELLE} | ${record.id}` : ""
                }
                onChange={(e) => setSelectedCodeChantier(e)}
              />
            </ReferenceInput>
          </Grid>
          {/* Condition pour afficher le sélecteur de service si le chantier sélectionné est "A-9999" */}

          {selectedCodeChantier === "A-9999" && (
            <Grid item md={6}>
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
            </Grid>
          )}

          {/* Champ de texte pour entrer la fiche navette */}
          <Grid item md={6}>
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
                input: { autoComplete: "off" },
              }}
              source="ficheNavette"
            />
          </Grid>
          {/* Champ de texte pour entrer le montant TTC d'avance */}
          <Grid item md={6}>
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
                input: { autoComplete: "off" },
              }}
              source="TTC"
              onChange={(e) => {
                setTTC(e.target.value);
                setHT(e.target.value / prctTVA);
                setTVAinput(e.target.value - e.target.value / prctTVA);
                e.target.value === "" ? setPrctTVA(1) : setPrctTVA(prctTVA);
                // getTTC(e.target.value, PourcentageTva);
              }}
            />
          </Grid>
          {/* Champ de texte pour entrer le bon de commande d'avance */}
          <Grid item md={6}>
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
                input: { autoComplete: "off" },
              }}
              validate={required("Le bon de commande est obligatoire")}
              source="Bcommande"
            />
          </Grid>

          <Grid item md={6}>
            <ReferenceInput
              source="iddesignation"
              reference="designation"
              perPage={50}
              sort={{ field: "id", order: "ASC" }}
            >
              <AutocompleteInput
                label="designation"
                validate={required("selectionnez la designation")}
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
                  input: { autoComplete: "off" },
                }}
                filterToQuery={(searchText) => ({ q: searchText })}
                matchSuggestion={() => true}
                optionText={(record) =>
                  record?.id
                    ? `${record.codeDesignation}||${record.designation}`
                    : ""
                }
                onChange={(value, record) => {
                  if (record?.PourcentageTVA) {
                    const percent = record.PourcentageTVA;
                    setPrctTVA(percent);
                    setHT(ttc / percent);
                    setTVAinput(ttc - ttc / percent);
                  }
                }}
              />
            </ReferenceInput>
          </Grid>
          <Grid item md={6}>
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
          </Grid>
          {FourRasIR.RasIr === "Oui" ? (
            <Grid item md={6}>
              <SelectInput
                sx={{ width: 650 }}
                source="EtatIR"
                label="Etat Ras IR"
                validate={
                  FourRasIR.RasIr === "Oui"
                    ? required("Etat RAS IR est obligatoire")
                    : undefined
                }
                choices={[
                  { id: "Oui", name: "Oui" },
                  { id: "Non", name: "Non" },
                ]}
              />
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        {ttc > 0 ? (
          <div>
            HT : {ht.toFixed(2)}
            <br />
            TVA : {tvainput.toFixed(2)} / Taux TVA :
            {ttc > 0 ? `${((prctTVA - 1) * 100).toFixed(2)}%` : "0"}
            <br />
            TTC : {ttc}
          </div>
        ) : (
          ""
        )}
      </SimpleForm>
    </Create>
  );
};
