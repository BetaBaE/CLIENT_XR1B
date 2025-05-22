import { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import apiUrl from "../../config";

const formatDate = (string) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
};

export const FicheNavetteCreate = (props) => {
  const theme = useTheme();
  const [factureSelected, setFactureSelected] = useState(null);
  const dataProvider = useDataProvider();
  const [fournisseur, setFournisseur] = useState([]);
  const [facture, setFacture] = useState([]);
  const [chantier, setChantier] = useState([]);
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [factureidField, setFactureidField] = useState(true);
  const [chantierIdField, setChantierIdField] = useState(false);
  const [selectedCodeChantier, setSelectedCodeChantier] = useState("");
  const [selectedCategorieFacture, setSelectedCategorieFacture] = useState("");
  const { identity, isLoading: identityLoading } = useGetIdentity();

  useEffect(() => {
    const fetchFournisseurs = async () => {
      try {
        const response = await dataProvider.getList("fournisseurs", {
          pagination: { page: 1, perPage: 3000 },
          sort: { field: "nom", order: "ASC" },
        });
        setFournisseur(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFournisseurs();
  }, [dataProvider]);

  const fetchChantier = async () => {
    try {
      const response = await fetch(`${apiUrl}/Chantier?range=[0,1000]`);
      const json = await response.json();
      setChantier(json);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFactureByFournisseur = (id) => {
    fetch(`${apiUrl}/facturebyfournisseur/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setFacture(json);
        console.log("Factures fetched:", json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchChantierByFactureId = (id) => {
    fetch(`${apiUrl}/getchantierbyfactureid/${id}`)
      .then((response) => response.json())
      .then((json) => {
        if (json && json.length > 0) {
          setChantier(json);
        } else {
          fetchChantier();
          setChantier([]);
        }
        console.log("Chantiers fetched by facture ID:", json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fournisseurs_choices = fournisseur.map(
    ({ id, nom, CodeFournisseur, catFournisseur }) => ({
      id: id,
      name: `${nom} | ${CodeFournisseur}  | ${catFournisseur}`,
      categorie: catFournisseur,
    })
  );

  const facture_choices = facture.map(
    ({ id, numeroFacture, TTC, DateFacture, CatFn }) => ({
      id: id,
      name: `${numeroFacture} | ${TTC} DH | ${formatDate(
        DateFacture
      )} | ${CatFn}`,
      CatFn: CatFn,
    })
  );

  const chantier_choices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id} `,
  }));

  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName}
          label="Vous êtes"
          hidden={false}
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
          disabled={true}
          source="fullName"
        />

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
            if (!e) {
              setFournisseurIdField(true);
              setChantierIdField(false);
              setFacture([]);
              setFactureSelected(null);
              setSelectedCategorieFacture("");
            } else {
              const selectedFournisseur = fournisseurs_choices.find(
                (f) => f.id === e
              );
              setFournisseurIdField(false);
              setChantierIdField(true);
              fetchFactureByFournisseur(e);
              fetchChantier();
              setSelectedCategorieFacture(selectedFournisseur.categorie);
              console.log(
                "Selected fournisseur category:",
                selectedFournisseur.categorie
              );
            }
          }}
        />

        <SelectInput
          disabled={fournisseurIdField}
          validate={required("La facture est obligatoire")}
          sx={{ width: 650 }}
          source="idFacture"
          choices={facture_choices}
          label="Facture"
          onChange={(e) => {
            const factureId = e.target.value;
            if (!factureId) {
              setFactureidField(true);
              setChantierIdField(false);
              setFactureSelected(0);
            } else {
              setFactureidField(false);
              setChantierIdField(true);
              fetchChantierByFactureId(factureId);
              setFactureSelected(factureId);
              const selectedFacture = facture_choices.find(
                (f) => f.id === factureId
              );
              if (selectedFacture) {
                setSelectedCategorieFacture(selectedFacture.CatFn);
                console.log(
                  "Facture category selected:",
                  selectedFacture.CatFn
                );
              }
            }
          }}
        />

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
          onChange={(e) => {
            setSelectedCodeChantier(e);
          }}
        />

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
        {/* 
        <SelectInput
          disabled={factureidField}
          sx={{ width: 650 }}
          validate={required("Veuillez sélectionner une catégorie")}
          source="CatFn"
          choices={
            selectedCategorieFacture
              ? facture_choices
                  .filter(
                    (facture) => facture.CatFn === selectedCategorieFacture
                  )
                  .map((facture) => ({
                    id: facture.CatFn,
                    name: facture.CatFn,
                  }))
              : [
                  { id: "FET", name: "FET" },
                  { id: "Service", name: "Service" },
                ]
          }
          label="Catégorie de document"
        /> */}
      </SimpleForm>
    </Create>
  );
};
