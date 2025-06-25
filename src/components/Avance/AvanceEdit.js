import React, { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Edit,
  required,
  SimpleForm,
  TextInput,
  NumberInput,
  Toolbar,
  SaveButton,
  useGetIdentity,
  useNotify,
  useRedirect,
  useRefresh,
  useUpdate,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import apiUrl from "../../config";

const MyToolbar = (props) => {
  const [update, { isLoading }] = useUpdate();
  const notify = useNotify();
  const { getValues } = useFormContext();
  const [showAlert, setShowAlert] = useState(false);
  const redirect = useRedirect();

  const handleClick = (e) => {
    e.preventDefault();
    const { id, ...data } = getValues();

    update(
      "Avance",
      { id, data },
      {
        onSuccess: () => {
          setShowAlert(true);
          notify("Enregistrement des données...", { type: "info" });

          setTimeout(() => {
            setShowAlert(false);
            notify("Les données ont été traitées avec succès!", {
              type: "success",
            });
            redirect("list", "Avance");
          }, 5000);
        },
        onError: (error) => {
          notify(`Error: ${error.message}`, { type: "error" });
        },
      }
    );
  };

  return (
    <Toolbar>
      <SaveButton type="button" onClick={handleClick} disabled={isLoading} />
      {showAlert && (
        <div style={{ color: "blue", marginLeft: "10px" }}>
          Traitement... ⏳
        </div>
      )}
    </Toolbar>
  );
};

export const AvanceEdit = (props) => {
  const theme = useTheme();
  const { id } = useParams();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();

  // Hooks called at top-level only
  const [update, { isLoading: isUpdating }] = useUpdate();
  console.log(`isUpdating: ${isUpdating}`);

  const [avanceData, setAvanceData] = useState(null);
  const [isAvanceLoading, setIsAvanceLoading] = useState(true);

  const [ttcFacture, setTccFacture] = useState(0);
  const [montantRestituer, setMontantRestituer] = useState(0);
  const [isRefreshed, setIsRefreshed] = useState(false);

  useEffect(() => {
    if (!id) return;

    setIsAvanceLoading(true);
    fetch(`${apiUrl}/Avance/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setAvanceData(data))
      .catch(() => {
        notify("Erreur lors du chargement des données", { type: "error" });
        redirect("/Avance");
      })
      .finally(() => setIsAvanceLoading(false));
  }, [id, notify, redirect]);

  const handleRefresh = () => {
    refresh();
    setIsRefreshed(true);
  };

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
    update(
      "Avance",
      { id: values.id, data: values },
      {
        onSuccess: () => {
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
  };

  if (isAvanceLoading || identityLoading) return <div>Loading...</div>;

  if (!avanceData || !avanceData.data) {
    return (
      <div>L'avance est totalement payée ou elle est restituée totalement.</div>
    );
  }
  const { avanceRestitution, factures } = avanceData.data;
  if (!avanceRestitution || !factures) {
    return <div>Aucune donnée disponible pour cette avance.</div>;
  }

  return (
    <Edit {...props}>
      {!isRefreshed ? (
        <div>
          <button onClick={handleRefresh}>Rafraîchir les données</button>
        </div>
      ) : (
        <SimpleForm
          toolbar={<MyToolbar disabled={!isRefreshed} />}
          validate={validateMontantRestantARestituer}
          save={handleSave}
          defaultValues={{
            id: avanceRestitution.id,
            Redacteur: identity.username,
            Montant: avanceRestitution.Montant || "",
            CodeAffaire: avanceRestitution.CodeAffaire || "",
            etat: avanceRestitution.etat || "",
            nom: avanceRestitution.nom || "",
            ModePaiement: avanceRestitution.ModePaiement || "",
          }}
        >
          <TextInput
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
            InputProps={{ readOnly: true }}
            source="Redacteur"
          />
          <AutocompleteInput
            label="Factures"
            source="idfacture"
            sx={{
              width: 650,
              input: {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                borderRadius: "4px",
              },
            }}
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
            sx={{
              width: 650,
              input: {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                borderRadius: "4px",
              },
            }}
            source="Montant"
            InputProps={{ readOnly: true }}
          />
          <TextInput
            label="Code Affaire"
            sx={{
              width: 650,
              input: {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                borderRadius: "4px",
              },
            }}
            source="CodeAffaire"
            InputProps={{ readOnly: true }}
          />
          <NumberInput
            sx={{
              width: 650,
              input: {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                borderRadius: "4px",
              },
            }}
            label="Montant Restant A Restituer"
            source="MontantRestantARestituer"
          />
          <TextInput
            sx={{
              width: 650,
              input: {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                borderRadius: "4px",
              },
            }}
            label="etatRestit"
            source="etat"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <TextInput
            sx={{
              width: 650,
              input: {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                borderRadius: "4px",
              },
            }}
            label="Fourisseur"
            source="nom"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <TextInput
            sx={{
              width: 650,
              input: {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                borderRadius: "4px",
              },
            }}
            label="ModePaiement"
            source="ModePaiement"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </SimpleForm>
      )}
    </Edit>
  );
};
