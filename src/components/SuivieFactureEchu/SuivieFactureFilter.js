import { DateInput, Filter,  SelectInput,  TextInput } from "react-admin";

const SuivieFactureEchuFilter = (props) => (

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
    <TextInput source = "ficheNavette"
    label = "ficheNavette" />

<DateInput source = "DateEcheancePaiement"
    label = "DateEcheance" />


  

    </Filter>

);
export default SuivieFactureEchuFilter;