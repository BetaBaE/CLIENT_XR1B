import { DateInput, Filter,  SelectInput,  TextInput } from "react-admin";

const AllFilter = (props) => (

    <Filter {...props } >
    <TextInput source = "chantier"
    label = "chantier" />


    <TextInput source = "designation"
    label = "designation" />

    <DateInput source = "DateFactureMin"
    label = "DateFactureMin" />
    <DateInput source = "DateFacturemax"
    label = "DateFacturemax" />

    <DateInput source = "dateOperationMin"
    label = "dateOperation" />

<DateInput source = "dateOperationmax"
    label = "dateOperationmax" />

<TextInput source = "numerofacture"
    label = "numerofacture" />


    <TextInput source = "CodeFournisseur"
    label = "codefournisseur" />
    <TextInput source = "fournisseur"
    label = "fournisseur" />

    <SelectInput source = "modepaiement"
 choices={[
    { id: "paiement espece", name: "paiement espece" },
    { id: "paiement cheque", name: "paiement cheque" },
    { id: "paiement virement", name: "paiement virement" },
    { id: "non payé", name: "non payé" }
   

  ]}

    label = "mode de paiement" />

    <TextInput source = "ficheNavette"
    label = "ficheNavette" />

 


    <DateInput source = "dateExecutiondebut"
    label = "dateExecutiondebut" />
    <DateInput source = "Dateexecusionfin"
    label = "Dateexecusionfin" />

<TextInput source = "banque"
    label = "banque" />



<SelectInput source = "etat"
 choices={[
    { id: "Reglee", name: "Reglee" },
    { id: "En cours", name: "En cours" },
   

  ]}

    label = "mode de paiement" />
    </Filter>

);
export default AllFilter;