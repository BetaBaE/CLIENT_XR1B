import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  AutocompleteInput,
  Create,
  DateInput,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";

import apiUrl from "../../config";
import { Grid } from "@mui/material";

export const AvanceForupdateCreate = () => {
  const theme = useTheme();
  const dataProvider = useDataProvider(); // Hook pour accéder au fournisseur de données
  const dataProvider1 = useDataProvider();
  const { identity } = useGetIdentity(); // Hook pour récupérer l'identité de l'utilisateur actuel
  // Utilisation des styles définis
  const [ttc, setTTC] = useState(0);

  const [tvainput, setTVAinput] = useState("");
  const [ht, setHT] = useState(0);
  const [prctTVA, setPrctTVA] = useState(1);
  // États pour les données des fournisseurs et chantiers
  const [fournisseur, setFournisseur] = useState([]);
  const [chantier, setChantier] = useState([]);

  // États pour la gestion de l'affichage des champs ID
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [chantierIdField, setChantierIdField] = useState(false);

  const [designation, setDesignation] = useState([]);
  // const [newIdentity, setNewIdentity] = useState('');
  // const [tva, setTVA] = useState([]);
  const [FourRasIR, setFourRasIR] = useState("");
  // État pour stocker le code du chantier sélectionné
  const [selectedCodeChantier, setSelectedCodeChantier] = useState("");
  // État pour la catégorie de fournisseur sélectionnée
  const [selectedSupplierCategory, setSelectedSupplierCategory] = useState("");
  console.log(chantierIdField, selectedSupplierCategory);

  // Effet pour charger la liste des fournisseurs au montage du composant
  useEffect(() => {
    const fetchFournisseurs = async () => {
      try {
        // Appel à l'API pour récupérer la liste des fournisseurs
        const response = await dataProvider.getList("getAllFournissuersClean", {
          pagination: { page: 1, perPage: 3000 }, // Pagination pour récupérer tous les fournisseurs
          sort: { field: "nom", order: "ASC" }, // Tri par nom ascendant
        });
        setFournisseur(response.data); // Mise à jour de l'état avec les données des fournisseurs
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des fournisseurs :",
          error
        ); // Affichage de l'erreur en cas de problème
      }
    };
    fetchFournisseurs(); // Appel de la fonction pour charger les fournisseurs au montage
  }, [dataProvider]); // Dépendance au fournisseur de données pour l'exécution de l'effet

  // Effet pour charger la liste des chantiers au montage du composant
  useEffect(() => {
    dataProvider1
      .getList("designation", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "id", order: "ASC" },
      })

      .then(({ data }) => {
        setDesignation(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider1]);
  useEffect(() => {
    const fetchChantier = async () => {
      try {
        // Requête HTTP pour récupérer les chantiers depuis l'API
        const response = await fetch(`${apiUrl}/Chantier?range=[0,1000]`);
        const json = await response.json(); // Conversion de la réponse en JSON
        setChantier(json); // Mise à jour de l'état avec les données des chantiers
      } catch (error) {
        console.error("Erreur lors de la récupération des chantiers :", error); // Affichage de l'erreur en cas de problème
      }
    };
    fetchChantier(); // Appel de la fonction pour charger les chantiers au montage
  }, []); // Utilisation d'un tableau de dépendances vide pour que cet effet s'exécute une seule fois au montage
  let designation_choices = designation.map(
    ({ id, designation, codeDesignation, PourcentageTVA }) => ({
      id: id,
      name: `${codeDesignation}||${designation}`,
      percent: PourcentageTVA,
    })
  );
  // Transformation des fournisseurs en choix pour l'autocomplétion
  const fournisseurs_choices = fournisseur.map(
    ({ id, nom, CodeFournisseur, catFournisseur }) => ({
      id: id,
      name: `${nom} ${CodeFournisseur}, ${catFournisseur}`,
      categorie: catFournisseur,
    })
  );

  // Transformation des chantiers en choix pour l'autocomplétion
  const chantier_choices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id}`,
  }));

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
              defaultValue={identity.fullName}
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
              inputProps={{ autoComplete: "off" }}
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
              // defaultValue={identity.fullName}
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
              inputProps={{ autoComplete: "off" }}
              validate={required("N° Proforma / Devis est obligatoire")}
              source="NdocAchat"
            />
          </Grid>
          <Grid item md={6}>
            <DateInput
              // defaultValue={identity.fullName}
              label="Date de document"
              sx={{ width: 650 }}
              validate={required("Date de document est obligatoire")}
              source="DateDocAchat"
            />
          </Grid>
          {/* Sélecteur d'autocomplétion pour choisir un fournisseur */}
          <Grid item md={6}>
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
              inputProps={{ autoComplete: "off" }}
              source="idfournisseur"
              choices={fournisseurs_choices}
              onChange={(e) => {
                const foundItem = fournisseur.find((item) => item.id === e);
                setFourRasIR(foundItem || null);
                console.log(foundItem);
                if (!e) {
                  // Si aucun fournisseur n'est sélectionné
                  setFournisseurIdField(true); // Désactiver le champ ID fournisseur
                  setChantierIdField(false); // Activer le champ ID chantier

                  setSelectedSupplierCategory(""); // Remettre à zéro la catégorie de fournisseur sélectionnée
                } else {
                  // Si un fournisseur est sélectionné
                  const selectedFournisseur = fournisseurs_choices.find(
                    (f) => f.id === e
                  );
                  setFournisseurIdField(false); // Activer le champ ID fournisseur
                  setChantierIdField(true); // Désactiver le champ ID chantier

                  setSelectedSupplierCategory(selectedFournisseur.categorie); // Mettre à jour la catégorie de fournisseur sélectionnée
                }
              }}
            />
          </Grid>
          {/* Sélecteur d'autocomplétion pour choisir un chantier */}
          <Grid item md={6}>
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
              inputProps={{ autoComplete: "off" }}
              source="codechantier"
              choices={chantier_choices}
              onChange={(e) => setSelectedCodeChantier(e)}
            />
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
              inputProps={{ autoComplete: "off" }}
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
              inputProps={{ autoComplete: "off" }}
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
              inputProps={{ autoComplete: "off" }}
              validate={required("Le bon de commande est obligatoire")}
              source="Bcommande"
            />
          </Grid>

          <Grid item md={6}>
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
              inputProps={{ autoComplete: "off" }}
              source="iddesignation"
              choices={designation_choices}
              onChange={(e) => {
                // console.log(e);
                let prc = designation_choices.find((item) => item.id === e);
                console.log(prc.percent);
                setPrctTVA(prc.percent);
                setHT(ttc / prc.percent);
                let newht = ttc / prc.percent;
                setTVAinput(ttc - newht);
              }}
            />
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
