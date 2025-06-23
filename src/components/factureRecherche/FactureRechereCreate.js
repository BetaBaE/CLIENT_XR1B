import React, { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  required,
  SelectInput,
  regex,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
} from "react-admin";

import apiUrl from "../../config";

const formatDate = (string) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
};

export const FactureRechereCreate = (props) => {
  const [factureSelected, setFactureSelected] = useState(null); // Change to null
  const dataProvider = useDataProvider();
  const [fournisseur, setFournisseur] = useState([]);
  const [facture, setFacture] = useState([]);
  const [chantier, setChantier] = useState([]);
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [factureidField, setFactureidField] = useState(true);
  const [chantierIdField, setChantierIdField] = useState(false);
  const [selectedCodeChantier, setSelectedCodeChantier] = useState("");
  const [selectedCategorieFournisseur, setselectedCategorieFournisseur] =
    useState("");
  const [selectedSupplierCategory, setSelectedSupplierCategory] = useState(""); // State for supplier category
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
        console.error(error); // Use console.error for errors
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
      console.error(error); // Use console.error for errors
    }
  };

  const fetchFactureByFournisseur = (id) => {
    fetch(`${apiUrl}/facturebyfournisseur/${id}`)
      .then((response) => response.json())
      .then((json) => setFacture(json))
      .catch((error) => {
        console.error(error); // Use console.error for errors
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
      })
      .catch((error) => {
        console.error(error); // Use console.error for errors
      });
  };

  const fournisseurs_choices = fournisseur.map(
    ({ id, nom, CodeFournisseur, catFournisseur }) => ({
      id: id,
      name: `${nom} | ${CodeFournisseur} `,
      categorie: catFournisseur, // Add category to the choices
    })
  );

  const facture_choices = facture.map(
    ({ id, numeroFacture, TTC, DateFacture }) => ({
      id: id,
      name: `${numeroFacture} | ${TTC} DH | ${formatDate(DateFacture)}`,
    })
  );

  const catfn_choices = facture.map(({ CatFn }) => ({
    id: CatFn,
    name: `${CatFn}`,
  }));

  const chantier_choices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id} `,
  }));

  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  const validateBc = regex(
    /^CF[0-9]{3}[0-9]{3}$/,
    "Ce bon de commande n'est pas valide"
  );

  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity.fullName}
          label="Vous êtes"
          hidden={false}
          sx={{ width: 650 }}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          source="fullName"
        />

        <AutocompleteInput
          label="Fournisseur"
          validate={required("Le fournisseur est obligatoire")}
          sx={{ width: 650 }}
          source="idfournisseur"
          choices={fournisseurs_choices}
          onChange={(e) => {
            if (!e) {
              setFournisseurIdField(true);
              setChantierIdField(false);
              setFacture([]); // Clear facture when changing fournisseur
              setFactureSelected(null); // Clear selected facture
              setSelectedSupplierCategory(""); // Clear selected supplier category
            } else {
              const selectedFournisseur = fournisseurs_choices.find(
                (f) => f.id === e
              );
              setFournisseurIdField(false);
              setChantierIdField(true);
              fetchFactureByFournisseur(e);
              fetchChantier();
              setSelectedSupplierCategory(selectedFournisseur.categorie); // Set selected supplier category
              console.log(
                "selectedFournisseur.catFournisseur",
                selectedFournisseur
              );
            }
          }}
        />
        <SelectInput
          disabled={fournisseurIdField}
          sx={{ width: 650 }}
          source="idFacture"
          choices={facture_choices}
          label="Facture"
          emptyValue={null} // Use null instead of true
          onChange={(e) => {
            if (!e) {
              setFactureidField(true);
              setChantierIdField(false);
              setFactureSelected(null); // Clear selected facture
            } else {
              setFactureidField(false);
              setChantierIdField(true);
              fetchChantierByFactureId(e.target.value);
              setFactureSelected(e.target.value); // Set selected facture
            }
          }}
        />

        <AutocompleteInput
          validate={required("Le chantier est obligatoire")}
          sx={{ width: 650 }}
          source="codechantier"
          choices={chantier_choices.map(({ id, name }) => ({
            id: id,
            name: name,
          }))}
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
              { id: "QUALITE", name: "Qualité" }, // Fix typo
              { id: "MC", name: "Moyen commun" },
            ]}
          />
        )}

        <TextInput
          label="Fiche navette"
          validate={required("La fiche navette est obligatoire")}
          sx={{ width: 650 }}
          source="ficheNavette"
        />

        <TextInput
          label="Bon de commande d'avance"
          sx={{ width: 650 }}
          validate={
            factureSelected === null
              ? required("Le bon de  commande est obligatoire")
              : null
          }
          source="Bcommande"
          disabled={factureSelected !== null}
        />
        <TextInput
          label="Montant d'avance"
          sx={{ width: 650 }}
          validate={(value) => {
            const numericValue = parseFloat(value);
            console.log("numericValue", numericValue);

            if (factureSelected === null) {
              return numericValue >= 1
                ? null
                : "Le montant d'avance doit être supérieur ou égal à 1";
            }

            if (facture.length === 0) {
              return required("Le montant d'avance est obligatoire");
            }

            if (factureSelected === null) {
              return "Le montant d'avance doit être supérieur à 0";
            }

            return null;
          }}
          source="montantAvance"
          defaultValue={factureSelected === null ? null : 0}
          disabled={factureSelected !== null}
        />

        {factureSelected === null
          ? selectedSupplierCategory !== "personne morale" && (
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
            )
          : selectedSupplierCategory !== "personne morale" && (
              <SelectInput
                disabled={fournisseurIdField}
                sx={{ width: 650 }}
                validate={required("Mentionnez la catégorie")}
                source="CatFn"
                choices={catfn_choices}
                label="Catégorie de document"
              />
            )}

        <TextInput
          label="TTC D'Avance"
          disabled={factureSelected !== null}
          validate={
            factureSelected === null
              ? required("Le bon de  commande est obligatoire")
              : null
          }
          sx={{ width: 650 }}
          source="TTC"
          defaultValue={factureSelected === null ? null : 0}
        />
        <TextInput
          label="Mentionnez HT"
          disabled={factureSelected !== null}
          validate={
            factureSelected === null
              ? required("Le bon de  commande est obligatoire")
              : null
          }
          sx={{ width: 650 }}
          source="HT"
          defaultValue={factureSelected === null ? null : 0}
        />
        <TextInput
          disabled={factureSelected !== null}
          label="Mentionnez TVA"
          validate={
            factureSelected === null
              ? required("Le bon de  commande est obligatoire")
              : null
          }
          sx={{ width: 650 }}
          source="MontantTVA"
          defaultValue={factureSelected === null ? null : 0}
        />
      </SimpleForm>
    </Create>
  );
};
