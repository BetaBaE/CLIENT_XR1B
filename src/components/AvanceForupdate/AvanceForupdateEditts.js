import React, { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Edit,
  required,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  useGetIdentity,
  NumberInput,
  useNotify,
  useRedirect,
  useRefresh,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import apiUrl from "../../config";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

const UserEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" disabled={props.disabled} />
  </Toolbar>
);

export const AvanceForupdateEdit = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const [ttcFacture, setTccFacture] = useState(0);
  const [montantRestituer, setMontantRestituer] = useState(0);
  const [isRefreshed, setIsRefreshed] = useState(false); // État pour vérifier si le bouton a été cliqué

  const queryClient = useQueryClient();
  const notify = useNotify();
  const redirect = useRedirect();

  const refresh = useRefresh();
  const handleClick = () => {
    refresh();
    setIsRefreshed(true); // Marquer comme rafraîchi
  };

  const { data: avanceData, isLoading: isAvanceLoading } = useQuery(
    ["avance", id],
    async () => {
      const response = await fetch(`${apiUrl}/Avance/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      enabled: !!id,
    }
  );

  const mutation = useMutation(
    async (updatedData) => {
      const response = await fetch(`${apiUrl}/Avance/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["avance", id]);
        notify("Modification réussie", { type: "success" });
        if (montantRestituer === 0) {
          notify("L'avance est totalement restituée", { type: "info" });
        }
        redirect("/Avance");
      },
      onError: (error) => {
        notify(`Erreur: ${error.message}`, { type: "error" });
      },
    }
  );

  useEffect(() => {
    if (!isAvanceLoading && (!avanceData || !avanceData.data)) {
      alert(
        "Cette avance est déjà restituée totalement ou il n'a pas encore payé."
      );
      redirect("/Avance");
    }
  }, [isAvanceLoading, avanceData, redirect]);

  if (isAvanceLoading || identityLoading) return <div>Loading...</div>;

  if (!avanceData || !avanceData.data) {
    return (
      <div>
        {" "}
        L'avance est totalement payée ou elle est restituée totalement.
      </div>
    );
  }

  const { avanceRestitution, factures } = avanceData.data;

  const formatDate = (string) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  const validateMontantRestantARestituer = (values) => {
    const errors = {};
    if (
      values.MontantRestantARestituer == null ||
      values.MontantRestantARestituer === ""
    ) {
      errors.MontantRestantARestituer =
        "Le montant à restituer n'est pas inséré";
    } else {
      const montantRestituerValue = parseFloat(values.MontantRestantARestituer);
      if (values.Montant < montantRestituerValue) {
        errors.MontantRestantARestituer =
          "Le montant est incorrect, impossible de compléter la restitution";
      } else if (ttcFacture < montantRestituerValue) {
        errors.MontantRestantARestituer =
          "Le montant à restituer est supérieur au montant de la facture";
      }
    }
    return errors;
  };

  const handleSave = (values) => {
    setMontantRestituer(parseFloat(values.MontantRestantARestituer));
    mutation.mutate(values);
  };

  return (
    <Edit {...props}>
      {!isRefreshed ? (
        <div>
          <button onClick={handleClick}>Rafraîchir les données</button>
        </div>
      ) : (
        <SimpleForm
          toolbar={<UserEditToolbar disabled={!isRefreshed} />}
          validate={validateMontantRestantARestituer}
          save={handleSave}
        >
          <TextInput
            defaultValue={identity.fullName}
            label="Vous êtes"
            className={classes.autocomplete}
            disabled
            source="Redacteur"
          />
          <AutocompleteInput
            label="Factures"
            source="idfacture"
            className={classes.autocomplete}
            choices={factures.map((facture) => ({
              id: facture.idfacture,
              name: `${facture.numeroFacture} | ${
                facture.TTC
              } DH | ${formatDate(facture.DateFacture)}`,
            }))}
            validate={required("mentionnez la facture")}
            onChange={(e) => {
              const id = e;
              const selectedFacture = factures.find(
                (fac) => fac.idfacture === id
              );
              if (selectedFacture) {
                setTccFacture(selectedFacture.TTC);
              }
            }}
          />
          <TextInput
            label="Montant restant NON Restituer"
            className={classes.autocomplete}
            source="Montant"
            defaultValue={avanceRestitution.Montant || ""}
            disabled
          />
          <TextInput
            label="Code Affaire"
            className={classes.autocomplete}
            source="CodeAffaire"
            defaultValue={avanceRestitution.CodeAffaire || ""}
            disabled
          />
          <NumberInput
            label="Montant Restant A Restituer"
            source="MontantRestantARestituer"
          />
          <TextInput
            label="etatRestit"
            source="etat"
            defaultValue={avanceRestitution.etat || ""}
            disabled
          />
          <TextInput
            label="Fourisseur"
            source="nom"
            defaultValue={avanceRestitution.nom || ""}
            disabled
          />
          <TextInput
            label="ModePaiement"
            source="ModePaiement"
            defaultValue={avanceRestitution.ModePaiement || ""}
            disabled
          />
        </SimpleForm>
      )}
    </Edit>
  );
};
