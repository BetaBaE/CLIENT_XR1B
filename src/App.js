import { Admin, Resource, CustomRoutes } from "react-admin";
import restProvider from "ra-data-simple-rest";
import { FournisseurList } from "./components/Fournisseur/ListFournisseurs";
import { FaTruck, FaCreditCard } from "react-icons/fa";
import { RibtempoList } from "./components/RIBtempo/RibtempoList";
import { RibtempoCreate } from "./components/RIBtempo/RibtempoCreate";
import { RibfournisseurList } from "./components/RIBFournisseurs/RibfournisseurList";
import { RibfournisseurEdit } from "./components/RIBFournisseurs/RibfournisseurEdit";
import { CustomLayout } from "./components/custom/layout/CustomLayout";
import PrintModule from "./components/printModule/PrintModule";
import { Route } from "react-router-dom";
import { RibatnerList } from "./components/RIBAtner/RibatnerList";
import { RibatnerEdit } from "./components/RIBAtner/RibatnerEdit";
import { UserList } from "./components/user/UserList";
import { UserEdit } from "./components/user/UserEdit";
import { UserCreate } from "./components/user/UserCreate";
import { auth } from "./authProvider";
import { OrdervirementEdit } from "./components/OrderVirement/OrdervirementEdit";
import { OrdervirementList } from "./components/OrderVirement/OrdervirementList";
import { OrdervirementCreate } from "./components/OrderVirement/OrdervirementCreate";
import { RIBAtnerCreate } from "./components/RIBAtner/RIBAtnerCreate";
import { FactureList } from "./components/Factures/FactureList";
import { VirementCreate } from "./components/Virement/VirementCreate";
import { VirementList } from "./components/Virement/VirementList";
import { VirementEdit } from "./components/Virement/VirementEdit";
import { LogfactureList } from "./components/logfacture/logfactureList";
import CreateFournisseur from "./components/Fournisseur/CreateFournisseur";
import { FactureRes } from "./components/FactureResptionner/FactureRes";
import { FactureResCreate } from "./components/FactureResptionner/FactureResCreate";

import { FactureRechereCreate } from "./components/factureRecherche/FactureRechereCreate";
import { FactureResEdit } from "./components/FactureResptionner/FactureResEdit";
import { FactureRecherche } from "./components/factureRecherche/FactureRechere";

import { historiquefacture } from "./components/historiquefacture/historiquefacture";

import { FactureValider } from "./components/Facturevalider/FactureValider";
import { FactureValiderEdit } from "./components/Facturevalider/FactureValiderEdit";

import { FactureRechereEdit } from "./components/factureRecherche/FactureRechereEdit";
import { HttpError } from "react-admin";

import { All } from "./components/all/All";

import { ChequeCreate } from "./components/cheque/ChequeCreate";
import { ChequeList } from "./components/cheque/chequeList";
import { EspeceList } from "./components/espece/EspeceList";
import { EspeceCreate } from "./components/espece/EspeceCreate";
import { ChequeEdit } from "./components/cheque/ChequeEdit";
import { VirementAvanceCreate } from "./components/VirementAvance/VirementAvanceCreate";
import { VirementAvanceList } from "./components/VirementAvance/VirementAvanceList";
import { ChequeAvanceList } from "./components/chequeAvance/ChequeAvanceList";
import { ChequeAvanceCreate } from "./components/chequeAvance/ChequeAvanceCreate";
import { ChequeAvanceEdit } from "./components/chequeAvance/ChequeAvanceEdit";
import { EspeceAvanceList } from "./components/especeAvance/EspeceAvanceList";
import { EspeceAvanceCreate } from "./components/especeAvance/EspeceAvanceCreate";
const fetchJson = async (url, options = {}) => {
  const requestHeaders =
    options.headers ||
    new Headers({
      Accept: "application/json",
    });
  if (
    !requestHeaders.has("Content-Type") &&
    !(options && options.body && options.body instanceof FormData)
  ) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(url, { ...options, headers: requestHeaders });
  const text = await response.text();
  const o = {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    body: text,
  };
  let status = o.status,
    statusText = o.statusText,
    headers = o.headers,
    body = o.body;
  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {
    // not json, no big deal
  }
  if (status < 200 || status >= 300) {
    return Promise.reject(body);
  }
  return Promise.resolve({
    status: status,
    headers: headers,
    body: body,
    json: json,
  });
};
function App(props) {
  const dataProvider = restProvider("http://10.111.1.95:8080", fetchJson);
  return (
    <Admin
      {...props}
      // dataProvider={restProvider("http://10.111.1.217:8080")}
      dataProvider={dataProvider}
      authProvider={auth}
      layout={CustomLayout}
    >
      {(permissions) => [
        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="fournisseurs"
            list={FournisseurList}
            create={
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable midelt" ||
              permissions === "comptable" 
                ? CreateFournisseur
                : null
            }
            icon={FaTruck}
          />
        ) : null,
        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ? (
          <Resource
            name="ribfournisseurs"
            list={RibfournisseurList}
            edit={
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite"||
              permissions === "comptable"||
              permissions === "comptable midelt"
                ? RibfournisseurEdit
                : null
            }
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="ribatner"
            list={RibatnerList}
            edit={
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable midelt" ||
              permissions === "comptable"
                ? RibatnerEdit
                : null
            }
            create={
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable midelt" ||
              permissions === "comptable"
                ? RIBAtnerCreate
                : null
            }
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="ribtempo"
            list={RibtempoList}
            create={
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable midelt" ||
              permissions === "comptable"
                ? RibtempoCreate
                : null
            }
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ||
        permissions === "normal user" ||
        permissions === "admin" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource
            name="facturesres"
            list={FactureRes}
            edit={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable" ||
              permissions === "superviseur comptabilite midelt"
                ? FactureResEdit
                : null
            }
            create={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable" ||
              permissions === "superviseur comptabilite midelt"
                ? FactureResCreate
                : null
            }
            icon={FaTruck}
          ></Resource>
        ) : null,

       










        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource
            name="facturevalider"
            list={FactureValider}
            edit={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt"
                ? FactureValiderEdit
                : null
            }
            icon={FaTruck}
          ></Resource>
        ) : null,

        permissions === "admin" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource
            name="historiquefacture"
            list={historiquefacture}
            icon={FaCreditCard}
          />
        ) : null,

        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource
            name="factureRech"
            create={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? FactureRechereCreate
                : null
            }
            list={FactureRecherche}
            edit={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? FactureRechereEdit
                : null
            }
          />
        ) : null,

        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource name="all" list={All} icon={FaTruck}></Resource>
        ) : null,

        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="ordervirement"
            list={OrdervirementList}
            icon={FaCreditCard}
            create={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? OrdervirementCreate
                : null
            }
            edit={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? OrdervirementEdit
                : null
            }
          />
        ) : null,


        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="cheque"
            list={ChequeList}
            icon={FaCreditCard}
            create={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? ChequeCreate
                : null
            }
            edit={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt"
        
                ? ChequeEdit
                : null
            } 
        
          />
        ) : null,



        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="espece"
            list={EspeceList}
            icon={FaCreditCard}
            create={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? EspeceCreate
                : null
            }
        
          />
        ) : null,
        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="factures"
            list={FactureList}
            // edit={EditGuesser}
            // create={OrdervirementCreate}
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="virements"
            list={VirementList}
            create={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? VirementCreate
                : null
            }
            edit={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt"
                ? VirementEdit
                : null
            }
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable" ? (
          <Resource name="logfactures" list={LogfactureList} />
        ) : null,
        permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <CustomRoutes>
            <Route path="/print" element={<PrintModule />} />
          </CustomRoutes>
        ) : null,
        permissions === "admin" || permissions === "normal user" ? (
          <Resource
            name="users"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
            icon={FaCreditCard}
          />
        ) : null,
      ]}
    </Admin>
  );
}

export default App;
