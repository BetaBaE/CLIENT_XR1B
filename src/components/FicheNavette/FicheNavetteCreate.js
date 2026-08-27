import { useState } from "react";
import {
  AutocompleteInput,
  Create,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";
import apiUrl from "../../config";
import { useInputStyleFilters } from "../global/DarkInputStyle";

const formatDate = (string) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
};

export const FicheNavetteCreate = (props) => {
  const [factureSelected, setFactureSelected] = useState(null);
  const [facture, setFacture] = useState([]);
  const [chantier, setChantier] = useState([]);
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [factureidField, setFactureidField] = useState(true);
  const [chantierIdField, setChantierIdField] = useState(false);
  const [selectedCodeChantier, setSelectedCodeChantier] = useState("");
  const [selectedCategorieFacture, setSelectedCategorieFacture] = useState("");
  const { identity, isLoading, error } = useGetIdentity(); // Single call
  console.log(
    factureSelected,
    factureidField,
    chantierIdField,
    selectedCategorieFacture
  );
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

  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.username}
          label="Vous êtes"
          hidden={false}
          sx={useInputStyleFilters}
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          source="fullName"
        />

        <ReferenceInput
          source="idfournisseur"
          reference="fournisseurs"
          perPage={50}
          sort={{ field: "nom", order: "ASC" }}
        >
          <AutocompleteInput
            label="Fournisseur"
            validate={required("Le fournisseur est obligatoire")}
            sx={useInputStyleFilters}
            slotProps={{ input: { autoComplete: "off" } }}
            filterToQuery={(searchText) => ({ q: searchText })}
            matchSuggestion={() => true}
            optionText={(record) =>
              record?.id
                ? `${record.nom} | ${record.CodeFournisseur}  | ${record.catFournisseur}`
                : ""
            }
            onChange={(value, record) => {
              if (!value) {
                setFournisseurIdField(true);
                setChantierIdField(false);
                setFacture([]);
                setFactureSelected(null);
                setSelectedCategorieFacture("");
              } else {
                setFournisseurIdField(false);
                setChantierIdField(true);
                fetchFactureByFournisseur(value);
                fetchChantier();
                setSelectedCategorieFacture(record?.catFournisseur || "");
              }
            }}
          />
        </ReferenceInput>

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
          sx={useInputStyleFilters}
          slotProps={{ input: { autoComplete: "off" } }}
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
          sx={useInputStyleFilters}
          slotProps={{ input: { autoComplete: "off" } }}
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
