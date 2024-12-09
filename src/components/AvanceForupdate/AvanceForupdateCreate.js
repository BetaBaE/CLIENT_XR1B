import React, { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import apiUrl from "../../config";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
}));

export const AvanceForupdateCreate = () => {
  const dataProvider = useDataProvider(); // Hook pour accéder au fournisseur de données
  const dataProvider1 = useDataProvider();
  const { identity } = useGetIdentity(); // Hook pour récupérer l'identité de l'utilisateur actuel
  const classes = useStyles(); // Utilisation des styles définis
  const [ttc, setTTC] = useState(0);
  const [tvainput, setTVAinput] = useState("");
  const [ht, setHT] = useState("");
  const [PourcentageTva, setPourcentageTVA] = useState(0);
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

  const getTVA = (PourcentageTva) => {
    let HT = (ttc / PourcentageTva).toFixed(2);
    let TVA = (ttc - ttc / PourcentageTva).toFixed(2);
    console.log("HT", HT);
    console.log("TVA", TVA);

    setTVAinput(TVA);
    setHT(HT);
  };

  const getTTC = (TTC, PourcentageTva) => {
    console.log("PourcentageTva", PourcentageTva);
    let calculPerTva = PourcentageTva > 0 ? PourcentageTva : 1;
    console.log("calculPerTva", calculPerTva);
    let HT = (TTC / calculPerTva).toFixed(2);
    let TVA = (TTC - HT).toFixed(2);
    console.log("HT", HT);
    console.log("TVA", TVA);
    setTVAinput(TVA);
    setHT(HT);
  };

  useEffect(() => {
    dataProvider1
      .getList("getPourcentageTva", {
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

  // Effet pour charger la liste des chantiers au montage du composant

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
  let designation_choices = designation.map(({ id, PourcentageTva100 }) => ({
    id: id,
    name: `${PourcentageTva100}`,
  }));

  // Gestion de l'état de chargement et d'erreur pour l'identité de l'utilisateur
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Chargement...</>; // Affichage d'un message de chargement si l'identité est en cours de récupération
  if (error) return <>Erreur...</>; // Affichage d'un message d'erreur si la récupération de l'identité a échoué

  return (
    <Create>
      <SimpleForm>
        {/* Champ de texte pour afficher le nom complet de l'utilisateur */}
        <TextInput
          defaultValue={identity.fullName}
          label="Vous êtes"
          className={classes.autocomplete}
          disabled
          source="fullName"
        />

        {/* Sélecteur d'autocomplétion pour choisir un fournisseur */}
        <AutocompleteInput
          label="Fournisseur"
          validate={required("Le fournisseur est obligatoire")}
          className={classes.autocomplete}
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

        {/* Sélecteur d'autocomplétion pour choisir un chantier */}
        <AutocompleteInput
          validate={required("Le chantier est obligatoire")}
          className={classes.autocomplete}
          source="codechantier"
          choices={chantier_choices}
          onChange={(e) => setSelectedCodeChantier(e)}
        />

        {/* Condition pour afficher le sélecteur de service si le chantier sélectionné est "A-9999" */}
        {selectedCodeChantier === "A-9999" && (
          <SelectInput
            className={classes.autocomplete}
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
          className={classes.autocomplete}
          source="ficheNavette"
        />

        {/* Champ de texte pour entrer le bon de commande d'avance */}
        <TextInput
          label="Bon de commande d'avance"
          className={classes.autocomplete}
          validate={required("Le bon de commande est obligatoire")}
          source="Bcommande"
        />

        {/* Champ de texte pour entrer le montant d'avance */}
        {/* <NumberInput
          label="Montant d'avance"
          className={classes.autocomplete}
          validate={(value) => {
            const numericValue = parseFloat(value);
            return numericValue >= 1
              ? undefined
              : "Le montant d'avance doit être supérieur ou égal à 1";
          }}
          source="montantAvance"
        /> */}

        {/* Condition pour afficher le sélecteur de catégorie de document 
        
        {selectedSupplierCategory !== "personne morale" && (
          <SelectInput
            disabled={fournisseurIdField}
            className={classes.autocomplete}
            validate={required("Mentionnez la catégorie")}
            source="CatFn"
            choices={[
              { id: "FET", name: "Fourniture Equipement Travaux" },
              { id: "Service", name: "Service" },
            ]}
            label="Catégorie de document"
          />
        )}
*/}
        {/* Champ de texte pour entrer le montant TTC d'avance */}
        <NumberInput
          label="TTC D'Avance"
          validate={required("Le montant d'avance est obligatoire")}
          className={classes.autocomplete}
          source="TTC"
          onChange={(e) => {
            setTTC(e.target.value);

            getTTC(e.target.value, PourcentageTva);
          }}
          // onChange={(e) => {
          //   getTTC(e, PourcentageTva);
          // }}
        />
        <AutocompleteInput
          // eslint-disable-next-line
          disabled={ttc == 0 ? true : false}
          label="TauxTVA"
          validate={required("selectionnez la designation")}
          className={classes.autocomplete}
          source="iddesignation"
          choices={designation_choices}
          onChange={(e) => {
            console.log("e", e);
            setPourcentageTVA(e);
            // getTVA(e );
            if (e) {
              getTVA(e);
            } else {
            }
          }}
        />

        {tvainput.length > 0 && <div>le montant TVA : : {tvainput} DH</div>}

        {ht.length > 0 && <div>le montant HT : : {ht} DH</div>}

        {/* Champ de texte pour entrer le montant TVA */}
        {/* <TextInput
          id="TVAid"
          label="TVA"
          validate={required("TVA est obligatoire")}
          className={classes.autocomplete}
          source="MontantTVA"
          defaultValue={tvainput}
          disabled={true}
        /> */}
        <SelectInput
          disabled={fournisseurIdField}
          className={classes.autocomplete}
          validate={required("Mentionnez la catégorie")}
          source="CatFn"
          choices={[
            { id: "FET", name: "Fourniture Equipement Travaux" },
            { id: "Service", name: "Service" },
          ]}
          label="Catégorie de document"
        />
        {FourRasIR.RasIr === "Oui" ? (
          <SelectInput
            className={classes.autocomplete}
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
        ) : (
          ""
        )}
      </SimpleForm>
    </Create>
  );
};
