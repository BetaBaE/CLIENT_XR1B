import {
  AutocompleteInput,
  Create,
  DateInput,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiUrl from "../../config";
import { format } from 'date-fns';
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "580px",
  },
  chip: {
    fontWeight: "bold",
  },
}));
export const FactureSaisieCreate = () => {
  const classes = useStyles();
   const [dateEcheance, setDateEcheance] = useState(null); 
   const [inputDateEcheance, setInputDateEcheance] = useState(null);
  const dataProvider1 = useDataProvider();
  const dataProvider2 = useDataProvider();
  const dataProvider = useDataProvider();
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [designation, setDesignation] = useState([]);
  // const [newIdentity, setNewIdentity] = useState('');
  const [tva, setTVA] = useState([]);
  const [fournisseur, setFournisseur] = useState([]);
  const [chantier, setChantier] = useState([]);
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const [formData, setFormData] = useState({
    idfournisseur: null,
    DateFacture: null, // Initialize to null or the desired default value

  });
  const [libelleChantier, setLibelleChantier] = useState([]);
  useEffect(() => {
    setInputDateEcheance(dateEcheance);
  }, [dateEcheance]);
  useEffect(() => {
    dataProvider2
        .getList("chantier", {
            pagination: { page: 1, perPage: 3000 },
            sort: { field: "LIBELLE", order: "ASC" },
        })
        .then(({ data }) => {
            setChantier(data);
        })
        .catch((error) => {
            console.log(error);
        });
}, [dataProvider2]);
let chantier_choices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id} `,
}));
 
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
    dataProvider
      .getList("fournisseurs", {
        pagination: { page: 1, perPage: 10000 },
        sort: { field: "id", order: "ASC" },
      })

      .then(({ data }) => {
        setFournisseur(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider]);

  let fournisseur_choices = fournisseur.map(({ id, nom, CodeFournisseur }) => ({
    id: id,
    name: `${nom} | ${CodeFournisseur} `,
  }));

  let designation_choices = designation.map(({ id, designation }) => ({
    id: id,
    name: `${designation} `,
  }));

 
  const getchantierByBCommande = (Boncommande) => {
    let url = `${apiUrl}/getchantierbyBonCommande/` + Boncommande;
console.log(url)
    fetch(url)
      .then((response) => response.json())
      .then((json) => setLibelleChantier(json));
  };






  const getTVA = (id) => {
    let url = `${apiUrl}/designationbycode/` + id;
 
    fetch(url)
      .then((response) => response.json())
      .then((json) => setTVA(json));
  };
  let tva_choices = tva.map(({ id, PourcentageTVA }) => ({
    id: id,
    name: `${PourcentageTVA}% `,
  }));
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  const validateBc = regex(
    /^CF[0-9]{3}[0-9]{3}$/,
    "ce bon commande n'est pas valide"
  );

  const validateDate = regex(
    /[1-9]\d{3}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])/,
    "le format des dates doit être conforme à la norme "
  );
  const validateprice = regex(
    /[+-]?([0-9]*[.])?[0-9]+/,
    "ce prix  n'est pas au bon format"
  );
  const numerofacturevalidation = regex(
    /^\S+$/,
    "la facture ne doit pas contenir des espaces"
  );

 


  const affichage = async (id) => {
    try {
      const avance_choices = await getavancebyfournisseur(id);
      if (avance_choices.length === 0)  {
        Swal.fire({
          text: 'Aucune avance trouvée',
        });
      } else {
        const choicesText = avance_choices
      
        .map(({ codechantier, montantAvance, Bcommande }) =>
          `Les avances : ${codechantier} | ${montantAvance} | ${Bcommande}`
        )
        .join("<br/>");
  
    
        Swal.fire({
          html: choicesText,
        });
      }
    } catch (error) {
      console.error("Error fetching avance_choices:", error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') { // Vérifie si la touche "Entrée" est pressée
       getchantierByBCommande(event.target.value)
       console.log(libelleChantier)
    }
  };

  const getavancebyfournisseur = (idfournisseur) => {
    let url = `${apiUrl}/getavancebyfournisseur/` + idfournisseur;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => json);
  };
  

  const getEcheanceLoiByFournisseur = async (idfournisseur) => {
    try {
      const response = await fetch(`${apiUrl}/getEcheanceLoibyfournisseur/${idfournisseur}`);
      const json = await response.json();
  
      if (!json || json.length === 0 || json[0].modalitePaiement === undefined) {
        return null; // Retournez null si les données ne sont pas valides ou manquantes
      }
  
      return json[0].modalitePaiement; // Retournez directement la valeur de modalitePaiement
    } catch (error) {
      console.error("Error in getEcheanceLoiByFournisseur:", error);
      throw error;
    }
  };
  
  const getEcheanceReelByFournisseur = async (idfournisseur) => {
    try {
      const response = await fetch(`${apiUrl}/getEcheanceReelbyfournisseur/${idfournisseur}`);
      const json = await response.json();
  
      if (!json || json.length === 0 || json[0].modalitePaiement === undefined) {
        return null; // Retournez null si les données ne sont pas valides ou manquantes
      }
  
      return json[0].modalitePaiement;
    } catch (error) {
      console.error("Error in getEcheanceReelByFournisseur:", error);
      throw error;
    }
  };
  

  const getEcheanceByFournisseur = async (idfournisseur, DateFacture) => {
    try {
        let modalitePaiement = null;
        const modaliteReel = await getEcheanceReelByFournisseur(idfournisseur);
        if (modaliteReel !== null) {
            modalitePaiement = modaliteReel.toString();
        } else {
          const modaliteLoi = await getEcheanceLoiByFournisseur(idfournisseur);
            if (modaliteLoi !== null) {
                modalitePaiement = modaliteLoi.toString();
            } else {
                let modalitePaiementDefault = 60;
                modalitePaiement = modalitePaiementDefault.toString();
            }
        }

        const modalitePaiementDays = parseInt(modalitePaiement, 10);
        console.log("Modalité de paiement :", modalitePaiement);

        let dateFacture = new Date(Date.parse(DateFacture));
        if (modalitePaiement.endsWith("fm")) {
            // Convertir la dateFacture à la fin du mois
            dateFacture = new Date(dateFacture.getFullYear(), dateFacture.getMonth() + 1, 0);
        }

        console.log("date facture", dateFacture);

        let dueDate = new Date(dateFacture.getTime() + modalitePaiementDays * 24 * 60 * 60 * 1000); // Convertir les jours en millisecondes
        console.log("Date d'échéance : ", dueDate);
        const dateEcheance = dueDate.toISOString().split('T')[0]; 
        console.log("Date d'échéance formatée : ", dateEcheance);
        return dateEcheance;
    } catch (error) {
        console.error("Erreur dans getEcheanceByFournisseur :", error);
        throw error;
    }
};

const handleDateChange = async (event) => {
  const inputDate = event.target.value;
  setFormData({ ...formData, DateFacture: inputDate });

  // If the inputDate is a valid date
  if (isValidPartialDate(inputDate)) {
    try {
      const dateEcheance = await getEcheanceByFournisseur(formData.idfournisseur, inputDate);
      setDateEcheance(dateEcheance);
    } catch (error) {
      console.error("Error updating dateEcheance:", error);
      setDateEcheance(null); // Set dateEcheance to null in case of error
    }
  } else {
    setDateEcheance(null); // Set dateEcheance to null if the inputDate is not valid
  }
};

function isValidPartialDate(dateString) {


  const currentYear = new Date().getFullYear();
  const regex = new RegExp(`^${currentYear}(-\\d{2}(-\\d{2})?)?$`);

  return regex.test(dateString);
}






  
  const dateFormatRegex =regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "veuillez saisir une date de format aaaa-mm-dd"
  )
  

  return (
    <Create label="ajouter">
      <SimpleForm>
        <TextInput
          defaultValue={identity.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="fullName"
        ></TextInput>
        <TextInput
          source="numeroFacture"
          label="numeroFacture"
          validate={[required("Le numeroFacture est obligatoire"),numerofacturevalidation]}
          className={classes.autocomplete}
        />
        <TextInput
          source="TTC"
          label="TTC"
          validate={[
            required("Le MontantApayer est obligatoire"),
            validateprice,
          ]}
          className={classes.autocomplete}
        />
        <AutocompleteInput
          label="designation"
          validate={required(" selectionnez la designation")}
          className={classes.autocomplete}
          source="iddesignation"
          choices={designation_choices}
          onChange={(e) => {
            if (!e) {
              setFournisseurIdField(true);
            } else {
              setFournisseurIdField(false);
              getTVA(e);
            }
          }}
        />
        <SelectInput
          validate={required("Ce champ est obligatoire")}
          disabled={fournisseurIdField}
          className={classes.autocomplete}
          source="iddesignation"
          choices={tva_choices}
          label="Pourcentage TVA"
        />
        <TextInput
          source="BonCommande"
          label="BonCommande"
          onKeyDown={handleKeyDown}
          className={classes.autocomplete}
        />
      {/* Afficher les données de libelleChantier ici */}
      <div>
      {libelleChantier.map((item, index) => (
        <div key={index}><pre>  Chantier : {item.libelleChantier}  Redacteur  : {item.REDACTEUR}
     
        </pre>
        </div>
        
      ))}
    </div>
   
    <AutocompleteInput
  label="fournisseur"
  validate={required("choisir le fournisseur")}
  className={classes.autocomplete}
  source="idfournisseur"
  choices={fournisseur_choices}
  onChange={async (e) => {
    if (e) {
      setFormData({ ...formData, idfournisseur: e });
      await affichage(e);
    }
  }}
/>


<DateInput
          source="DateFacture"
          label="date de la facture"
          validate={[required("Date obligatoire")]}
 
          onChange={async (event) => {
               handleDateChange(event)
            
          }}
        />
        <AutocompleteInput label = "chantier"
        className = { classes.autocomplete }
        source = "codechantier"
        choices = { chantier_choices }
        /> 
        <TextInput
  source="dateEcheance"
  label="format date Echeance: yyyy-mm-dd"
  validate={dateFormatRegex}
  defaultValue={dateEcheance}

/>
      <p>{dateEcheance}</p>
      </SimpleForm>
    </Create>
  );
};
