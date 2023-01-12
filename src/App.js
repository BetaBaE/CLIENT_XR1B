// import Dashboard from "./Admin/Dashboard";
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
function App(props) {
  return (
    <Admin
      {...props}
      dataProvider={restProvider("http://10.111.1.92:8080")}
      authProvider={auth}
      layout={CustomLayout}
    >
      {(permissions) => [
        permissions === "admin" || permissions === "normal user" ? (
          <Resource name="fournisseurs" list={FournisseurList} icon={FaTruck} />
        ) : null,
        permissions === "admin" || permissions === "normal user" ? (
          <Resource
            name="ribfournisseurs"
            list={RibfournisseurList}
            edit={RibfournisseurEdit}
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" || permissions === "normal user" ? (
          <Resource
            name="ribatner"
            list={RibatnerList}
            edit={RibatnerEdit}
            create={RIBAtnerCreate}
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" || permissions === "normal user" ? (
          <Resource
            name="ribtempo"
            list={RibtempoList}
            // edit={RibatnerEdit}
            create={RibtempoCreate}
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" || permissions === "normal user" ? (
          <Resource
            name="ordervirement"
            list={OrdervirementList}
            edit={OrdervirementEdit}
            create={OrdervirementCreate}
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" || permissions === "normal user" ? (
          <Resource
            name="factures"
            list={FactureList}
            // edit={EditGuesser}
            // create={OrdervirementCreate}
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" || permissions === "normal user" ? (
          <Resource
            name="virements"
            list={VirementList}
            edit={VirementEdit}
            create={VirementCreate}
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" || permissions === "normal user" ? (
          <Resource name="logfactures" list={LogfactureList} />
        ) : null,
        permissions === "admin" || permissions === "normal user" ? (
          <CustomRoutes>
            <Route path="/print" element={<PrintModule />} />
          </CustomRoutes>
        ) : null,
        permissions === "admin" ? (
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
