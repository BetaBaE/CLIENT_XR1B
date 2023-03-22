import { DateInput, Filter, TextInput } from "react-admin";

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

    <TextInput source = "ordervirement"
    label = "ordervirement" />

    <TextInput source = "ficheNavette"
    label = "ficheNavette" />

 


    <DateInput source = "dateExecutiondebut"
    label = "dateExecutiondebut" />
    <DateInput source = "Dateexecusionfin"
    label = "Dateexecusionfin" />

<TextInput source = "banque"
    label = "banque" />


    </Filter>

);
export default AllFilter;