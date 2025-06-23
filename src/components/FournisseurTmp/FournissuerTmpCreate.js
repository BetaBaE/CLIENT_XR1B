import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  useGetIdentity,
} from "react-admin";
import { required } from "react-admin";
import "../Analyse/echencier/DataGrid/styles.css";

import Card from "@mui/material/Card";
import { CardContent, CardHeader } from "@mui/material";
import { useState } from "react";
import apiUrl from "../../config";
import { useTheme } from "@mui/material/styles";
const Aside = ({ asideData }) => {
  // Safely destructure with default empty object and array
  const { json = [] } = asideData || {};
  console.log("test", json);

  return (
    <Card sx={{ width: "40%", margin: "1em" }}>
      <CardHeader
        subheader="Avant de procéder à l'enregistrement, assurez-vous que le fournisseur saise n'est pas répertorié dans la table."
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{
          variant: "subtitle1",
          style: { color: "red", fontSize: "1.2em", fontWeight: "bold" },
        }}
        sx={{ textAlign: "center" }}
      />

      <CardContent>
        <div className="my-custom-table">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {/* Wrap th in tr for valid HTML */}
                  <th>Nom Fournisseur</th>
                  <th>Code Tier</th>
                </tr>
              </thead>
              <tbody>
                {json.length > 0 ? (
                  json.map((fou) => (
                    <tr
                      key={
                        fou.ModifiedName || fou.OriginalName || Math.random()
                      }
                    >
                      <td>{fou.OriginalName}</td>
                      <td>{fou.CodeFournisseur}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center" colSpan="2">
                      Aucun fournisseur trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      {/* <Typography variant="h6">
        Assurez-vous que le fournisseur n'est pas répertorié dans la table avant
        de l'enregistrer.
      </Typography> */}
      {/* <Typography variant="h6">chantier : {asideData.chantier}</Typography> */}
    </Card>
  );
};
export const FournisseurTmpCreate = (props) => {
  const { identity, isLoading, error } = useGetIdentity(); // Single call for identity
  // Removed unused loading state
  const [asideData, setAsideData] = useState([]);
  const theme = useTheme();

  if (isLoading) return <div>Chargement en cours...</div>;
  if (error) return <div>Une erreur est survenue.</div>;

  const getchantierByBCommande = async (fournisseur) => {
    // Early return if empty fournisseur
    if (!fournisseur || fournisseur.trim() === "") {
      setAsideData({ json: [] }); // Reset to empty array
      return;
    }

    let url = `${apiUrl}/fournisseursmatch/${encodeURIComponent(fournisseur)}`;

    // setLoading(true); // Removed unused loading state
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      // console.log("API response:", json);

      // Handle both array and object responses
      const resultArray = Array.isArray(json) ? json : [];

      setAsideData({
        json: resultArray,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setAsideData({ json: [] }); // Ensure state is cleared on error
    } finally {
      // setLoading(false); // Removed unused loading state
    }
  };

  const handleBlur = (event) => {
    // Call the function when the input loses focus
    getchantierByBCommande(event.target.value);
  };

  return (
    <Create aside={<Aside asideData={asideData} {...props} />}>
      <SimpleForm
      // toolbar={<EditToolbar />}
      >
        {/* Nom de l'utilisateur connecté */}
        <TextInput
          defaultValue={identity?.fullName}
          label="Vous êtes"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          source="Redacteur"
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
        />

        {/* Champ 'nom' requis */}
        <TextInput
          label="Nom"
          source="nom"
          validate={required("Le nom est obligatoire")}
          onChange={handleBlur}
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
        />

        {/* Champ 'catFournisseur' requis */}
        <SelectInput
          source="catFournisseur"
          label="Catégorie Fournisseur"
          choices={[
            { id: "personne physique", name: "Personne Physique" },
            { id: "personne morale", name: "Personne Morale" },
          ]}
          validate={required("La catégorie est obligatoire")}
          sx={{ width: 650 }}
        />
      </SimpleForm>
    </Create>
  );
};
