import { useEffect } from "react";
import {
  Edit,
  FormDataConsumer,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useDataProvider,
  useGetIdentity,
} from "react-admin";

// import Swal from "sweetalert2";

export const ModificationFichnavetteEdit = (props) => {
  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  // const [fournisseur, setFournisseur] = useState([]);
  // const [facture, setFacture] = useState([{ id: "", BonCommande: "" }]);
  const dataProvider = useDataProvider();
  // const redirect = useRedirect();

  // const annuleAlert = (params) => {
  //   if (params === "Annuler") {
  //     Swal.fire({
  //       title: "Êtes-vous sûr?",
  //       text: "Voulez-vous vraiment Annuler cette ficheNavette?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       cancelButtonText: "Non!",
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Oui, Annule!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         document.querySelector("#save").click();
  //         Swal.fire("Annulé!", "FicheNavette Annulée", "success");
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         Swal.fire(
  //           "Modification annulée",
  //           "FicheNavette ne sera pas modifiée.",
  //           "error"
  //         );
  //         redirect("list", "factureRech");
  //       }
  //     });
  //   }
  // };
  // function formatDate(string) {
  //   var options = { year: "numeric", month: "long", day: "numeric" };
  //   return new Date(string).toLocaleDateString([], options);
  // }

  useEffect(() => {
    // dataProvider
    //   .getList("fournisseurs", {
    //     pagination: { page: 1, perPage: 3000 },
    //     sort: { field: "nom", order: "ASC" },
    //   })
    //   .then(({ data }) => {
    //     setFournisseur(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [dataProvider]);
  // const getFactureByFourniseur = (id) => {
  //   let url = `${apiUrl}/facturebyfournisseur/` + id;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((json) => setFacture(json));
  // };
  // let facture_choices = { id: "", BonCommande: "" };
  // let fournisseurs_choices = fournisseur.map(
  //   ({ id, nom, CodeFournisseur }) => ({
  //     id: id,
  //     name: `${nom} | ${CodeFournisseur} `,
  //   })
  // );
  // facture_choices = facture.map(({ id, numeroFacture, TTC, DateFacture }) => ({
  //   id: id,
  //   name: `${numeroFacture} | ${TTC} DH | ${formatDate(DateFacture)}`,
  // }));

  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Edit>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <FormDataConsumer>
          {({ formData }) =>
            formData.ficheNavette !== "Annuler" && (
              <>
                <TextInput
                  label="Fiche Navette"
                  sx={{ width: 650 }}
                  source="ficheNavette"
                />
                {/* <SelectInput
                  source="annulation"
                  sx={{ width: 650 }}
                  onChange={(e) => {
                    console.log(e.target.value);
                    annuleAlert(e.target.value);
                  }}
                  // validate={required()}
                  choices={[{ id: "Annuler", name: "Annuler" }]}
                /> */}
              </>
            )
          }
        </FormDataConsumer>
        {/* 
        <TextInput
          label="Bon commande"
          sx={{ width: 650 }}
          source="BonCommande"
        /> */}

        <SelectInput
          sx={{ width: 650 }}
          source="CatFn"
          label="Catégorie Facture"
          validate={required()}
          choices={[
            { id: "FET", name: "Fourniture Equipement Travaux" },
            { id: "Service", name: "Service" },
          ]}
        ></SelectInput>
      </SimpleForm>
    </Edit>
  );
};
