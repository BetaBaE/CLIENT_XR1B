import React, { useState } from "react";
import {
  AutocompleteInput,
  Edit,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  FormDataConsumer,
  Toolbar,
  SaveButton,
  useRedirect,
  useGetIdentity,
} from "react-admin";

import apiUrl from "../../config";
import Swal from "sweetalert2";

export const FactureRechereEdit = (props) => {
  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  const [facture, setFacture] = useState([{ id: "", BonCommande: "" }]);
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const { identity, isLoading: identityLoading } = useGetIdentity();

  const redirect = useRedirect();

  const annuleAlert = (params) => {
    if (params === "Annuler") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment Annuler cette ficheNavette?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Non!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, Annule!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click();
          Swal.fire("Annulé!", "FicheNavette Annulée", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "FicheNavette ne sera pas modifiée.",
            "error"
          );
          redirect("list", "factureRech");
        }
      });
    }
  };

  const formatDate = (string) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  const getFactureByFournisseur = (id) => {
    let url = `${apiUrl}/facturebyfournisseur/` + id;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setFacture(json));
  };

  let facture_choices = { id: "", BonCommande: "" };
  facture_choices = facture.map(({ id, numeroFacture, TTC, DateFacture }) => ({
    id: id,
    name: `${numeroFacture} | ${TTC} DH | ${formatDate(DateFacture)}`,
  }));

  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <TextInput
          defaultValue={identity.username}
          label="vous êtes"
          hidden={false}
          sx={{ width: 650 }}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          source="Validateur"
        ></TextInput>

        <ReferenceInput
          source="codechantier"
          reference="chantier"
          perPage={50}
          sort={{ field: "LIBELLE", order: "ASC" }}
        >
          <AutocompleteInput
            label="chantier"
            validate={required("Le chantier est obligatoire")}
            sx={{ width: 650 }}
            filterToQuery={(searchText) => ({ q: searchText })}
            matchSuggestion={() => true}
            optionText={(record) =>
              record?.id ? `${record.LIBELLE} | ${record.id}` : ""
            }
          />
        </ReferenceInput>
        <ReferenceInput
          source="idfournisseur"
          reference="fournisseurs"
          perPage={50}
          sort={{ field: "nom", order: "ASC" }}
        >
          <AutocompleteInput
            label="Fournisseur"
            validate={required("Le fournisseur est obligatoire")}
            sx={{ width: 650 }}
            filterToQuery={(searchText) => ({ q: searchText })}
            matchSuggestion={() => true}
            optionText={(record) =>
              record?.id ? `${record.nom} | ${record.CodeFournisseur} ` : ""
            }
            onChange={(value) => {
              if (!value) {
                setFournisseurIdField(true);
              } else {
                setFournisseurIdField(false);
                getFactureByFournisseur(value);
              }
            }}
          />
        </ReferenceInput>
        <SelectInput
          disabled={fournisseurIdField}
          sx={{ width: 650 }}
          source="idFacture"
          choices={facture_choices}
          label="facture"
          emptyValue={true}
        />
        <TextInput
          label="Montant d'avance"
          sx={{ width: 650 }}
          source="montantAvance"
        />

        <TextInput
          label="Fiche navette"
          validate={required("La fiche navette est obligatoire")}
          sx={{ width: 650 }}
          source="ficheNavette"
        />
      </SimpleForm>
    </Edit>
  );
};
