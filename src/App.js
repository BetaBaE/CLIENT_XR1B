import { Admin, CustomRoutes, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";

import { FaTruck, FaCreditCard } from "react-icons/fa";
import { RibtempoList } from "./components/RIBtempo/RibtempoList";
import { RibtempoCreate } from "./components/RIBtempo/RibtempoCreate";
import { RibfournisseurList } from "./components/RIBFournisseurs/RibfournisseurList";
import { RibfournisseurEdit } from "./components/RIBFournisseurs/RibfournisseurEdit";
import { CustomLayout } from "./components/custom/layout/CustomLayout";
import PrintModule from "./components/printModule/PrintModule";
import { Route } from "react-router-dom";
import { RibaAtnerList } from "./components/RIBAtner/RibAtnerList";
import { RibatnerEdit } from "./components/RIBAtner/RIBAtnerEdit";
import { UserList } from "./components/User/UserList";
import { UserEdit } from "./components/User/UserEdit";
import { UserCreate } from "./components/User/UserCreate";
import { auth } from "./authProvider";
import { OrdervirementEdit } from "./components/OrderVirement/OrdervirementEdit";
import { OrdervirementList } from "./components/OrderVirement/OrdervirementList";
import { OrdervirementCreate } from "./components/OrderVirement/OrdervirementCreate";
import { RIBAtnerCreate } from "./components/RIBAtner/RIBAtnerCreate";

import { VirementCreate } from "./components/Virement/VirementCreate";
import { VirementList } from "./components/Virement/VirementList";
import { VirementEdit } from "./components/Virement/VirementEdit";

import { FournisseurCreate } from "./components/Fournisseur/FournisseurCreate";

import { FactureSaisieCreate } from "./components/FactureSaisie/FactureSaisieCreate";

import { FactureSaisieEdit } from "./components/FactureSaisie/FactureSaisieEdit";

import { SuivieFacture } from "./components/SuivieFacture/SuivieFacture";

import { ChequeCreate } from "./components/Cheque/ChequeCreate";
import { ChequeList } from "./components/Cheque/ChequeList";
import { EspeceList } from "./components/Espece/EspeceList";
import { EspeceCreate } from "./components/Espece/EspeceCreate";
import { ChequeEdit } from "./components/Cheque/ChequeEdit";

import apiUrl from "./config";
import { ModificationFichnavette } from "./components/Modification fichnavette/ModificationFichnavette";
import { ModificationFichnavetteEdit } from "./components/Modification fichnavette/ModificationFichnavetteEdit";

import { SuivieFactureEchuList } from "./components/SuivieFactureEchu/SuivieFactureEchuList";

import { FactureNonPaye } from "./components/FactureNonPayé/FactureNonPayé";
import SuivieFactureExerciceList from "./components/SuivieFactureExercice/SuivieFactureExerciceList";
import { OrdervirementFondList } from "./components/OrderVirementFond/OrdervirementList";
import { OrdervirementFondCreate } from "./components/OrderVirementFond/OrdervirementFondCreate";
import { VirementFondList } from "./components/VirementFond/VirementFondList";
import { VirementFondCreate } from "./components/VirementFond/VirementFondCreate";
import { VirementFondEdit } from "./components/VirementFond/VirementFondEdit";
import AttestationFournisseurCreate from "./components/AttestationFournisseur/AttestationFournisseurCreate";
import { AttestationFournisseurList } from "./components/AttestationFournisseur/AttestationFournisseurList";
import { AvanceList } from "./components/Avance/AvanceList";
import { AvanceEdit } from "./components/Avance/AvanceEdit";
import { FicheNavetteList } from "./components/FicheNavette/FicheNavetteList";

import { FicheNavetteCreate } from "./components/FicheNavette/FicheNavetteCreate";
import { FournisseursList } from "./components/Fournisseur/FournisseursList";
import { FactureList } from "./components/FacturesSage/FactureList";
import { AvancePayerList } from "./components/AvancePayer/AvancePayerList";
import { FactureSaisieList } from "./components/FactureSaisie/FactureSaisieList";
import { HistoriqueFactureList } from "./components/HistoriqueFacture/HistoriqueFactureList";
// import { FactureValiderList } from "./components/FactureValider/FactureValiderList";
// import { FactureValiderEdit } from "./components/FactureValider/FactureValiderEdit";
import { FournisseurEdit } from "./components/Fournisseur/FournisseurEdit";
// import { EcheanceReeList } from "./components/EcheanceReelList/EcheanceReeList";
// import EcheanceReelCreate from "./components/EcheanceReelList/EcheanceReelCreate";
// import { EcheanceLoiList } from "./components/EcheanceLoi/EcheanceLoiList";
// import EcheanceLoiCreate from "./components/EcheanceLoi/EcheanceLoiCreate";
import { AvanceRestituerDetatailList } from "./components/AvanceRestituerDetatail/AvanceRestituerDetatailList";
import { AvanceForupdateList } from "./components/AvanceForupdate/AvanceForupdateList";
import { AvanceForupdateEdit } from "./components/AvanceForupdate/AvanceForupdateEdit";
import { AvanceForupdateCreate } from "./components/AvanceForupdate/AvanceForupdateCreate";
import { FicheNavetteEdit } from "./components/FicheNavette/FicheNavetteEdit";
import { AlertAttestationRegFiscList } from "./components/Alerts/AlertAttestationRegFiscList";
import { Echencier } from "./components/Analyse/echencier/echencier";
import { RastvaList } from "./components/Alerts/RasTva";
import { GetfacturedetailList } from "./components/newLogFacture/newlogFacture";
import { GetavancedetailList } from "./components/newLogAvance/newlogAvance";
import { SituationFn } from "./components/Analyse/echencier/echencier2";
import FaAyantFnList from "./components/Alerts/FaAyantFn";
import StFournisseur from "./components/Analyse/Situation Fournisseur/StFournisseur";
import { TvalogList } from "./components/newLogFacture/TvaLog";
import StChantier from "./components/Analyse/Situation chantier/StChantier";
import PaiementPage from "./components/Analyse/Paiement/PaiementPage";
import { DesignationList } from "./components/Designations/DesignationList";
import { DesignationEdit } from "./components/Designations/EditDesignation";
import { DesignationCreate } from "./components/Designations/DesignationCreate";
import { EcheancefournisseurList } from "./components/EcheanceFournisseur/EcheancefournisseurList";
import { EcheancefournisseurEdit } from "./components/EcheanceFournisseur/EcheancefournisseurEdit";
import { EcheancefournisseurCreate } from "./components/EcheanceFournisseur/EcheancefournisseurCreate";
import { FournisseurTmpCreate } from "./components/FournisseurTmp/FournissuerTmpCreate";
import { TmpfournisseurList } from "./components/FournisseurTmp/TmpfournisseurList";
import { TmpfournisseurEdit } from "./components/FournisseurTmp/TmpfournisseurEdit";

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
    // statusText = o.statusText,
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
  const dataProvider = restProvider(apiUrl, fetchJson);

  return (
    <Admin
      {...props}
      dataProvider={dataProvider}
      authProvider={auth}
      layout={CustomLayout}
    >
      {(permissions) => [
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
        permissions === "superviseur comptabilite" ||
        permissions === "achateur" ||
        permissions === "comptable" ? (
          <Resource
            name="fournisseurs"
            list={FournisseursList}
            create={
              permissions === "admin" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "comptable midelt"
                ? FournisseurCreate
                : null
            }
            edit={
              permissions === "admin" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "comptable midelt"
                ? FournisseurEdit
                : null
            }
            icon={FaTruck}
          />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "achateur" ||
        permissions === "comptable" ? (
          <Resource
            lable="Fournisseurs Achat"
            name="tmpfournisseurs"
            list={TmpfournisseurList}
            create={
              permissions === "admin" || permissions === "achateur"
                ? FournisseurTmpCreate
                : null
            }
            edit={
              permissions === "admin" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "comptable midelt"
                ? TmpfournisseurEdit
                : null
            }
          />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="designations"
            list={DesignationList}
            create={
              permissions === "admin" ||
              permissions === "superviseur comptabilite midelt"
                ? // || permissions === "comptable midelt"
                  DesignationCreate
                : null
            }
            edit={
              permissions === "admin" ||
              permissions === "superviseur comptabilite midelt"
                ? // || permissions === "comptable midelt"
                  DesignationEdit
                : null
            }
            icon={FaTruck}
          />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource
            name="Attestaion"
            list={AttestationFournisseurList}
            create={
              permissions === "admin" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable midelt" ||
              permissions === "comptable"
                ? AttestationFournisseurCreate
                : null
            }
            con={FaTruck}
          />
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
        permissions === "superviseur comptabilite" ? (
          <Resource
            name="ribfournisseurs"
            list={RibfournisseurList}
            edit={
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite"
                ? RibfournisseurEdit
                : null
            }
            icon={FaCreditCard}
          />
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="getAvanceDetailRestit"
            list={AvanceRestituerDetatailList}
            icon={FaTruck}
          />
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "comptable PdT" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="ribatner"
            list={RibaAtnerList}
            edit={
              permissions === "superviseur comptabilite midelt"
                ? RibatnerEdit
                : null
            }
            create={
              permissions === "superviseur comptabilite midelt"
                ? RIBAtnerCreate
                : null
            }
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "comptable PdT" ||
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
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ||
        permissions === "normal user" ||
        permissions === "admin" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource
            name="facturesSaisie"
            list={FactureSaisieList}
            edit={
              permissions === "admin" ||
              permissions === "comptable midelt" ||
              permissions === "comptable" ||
              permissions === "superviseur comptabilite midelt"
                ? FactureSaisieEdit
                : null
            }
            create={
              permissions === "admin" ||
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt"
                ? FactureSaisieCreate
                : null
            }
            icon={FaTruck}
          ></Resource>
        ) : null,
        /* permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource
            name="facturevalider"
            list={FactureValiderList}
            edit={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite"
                ? FactureValiderEdit
                : null
            }
            icon={FaTruck}
          ></Resource>
        ) : 
        null, */

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ||
        permissions === "comptable PdT" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource
            name="historiquefacture"
            list={HistoriqueFactureList}
            icon={FaCreditCard}
          />
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ||
        permissions === "comptable PdT" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource
            name="FicheNavette"
            create={
              permissions === "admin" ||
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? FicheNavetteCreate
                : null
            }
            list={FicheNavetteList}
            edit={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? FicheNavetteEdit
                : null
            }
          />
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ||
        permissions === "comptable PdT" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource
            name="SuivieFacture"
            list={SuivieFacture}
            icon={FaTruck}
          ></Resource>
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ||
        permissions === "comptable PdT" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource
            name="FactureNonPaye"
            list={FactureNonPaye}
            icon={FaTruck}
          ></Resource>
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource
            name="SuivieFactureEchu"
            list={SuivieFactureEchuList}
            icon={FaTruck}
          ></Resource>
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource
            name="ordervirement"
            list={OrdervirementList}
            icon={FaCreditCard}
            create={
              permissions === "admin" ||
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? OrdervirementCreate
                : null
            }
            edit={
              permissions === "admin" ||
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
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="ordervirementFond"
            list={OrdervirementFondList}
            icon={FaCreditCard}
            create={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? OrdervirementFondCreate
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
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource
            name="cheque"
            list={ChequeList}
            icon={FaCreditCard}
            create={
              permissions === "admin" ||
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable PdT" ||
              permissions === "comptable"
                ? ChequeCreate
                : null
            }
            edit={
              permissions === "admin" ||
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? ChequeEdit
                : null
            }
          />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource
            name="espece"
            list={EspeceList}
            icon={FaCreditCard}
            create={
              permissions === "admin" ||
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable PdT" ||
              permissions === "comptable"
                ? EspeceCreate
                : null
            }
          />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
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
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="ModificationFichnavette"
            list={ModificationFichnavette}
            edit={ModificationFichnavetteEdit}
            icon={FaCreditCard}
          />
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="virementsFond"
            list={VirementFondList}
            create={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? VirementFondCreate
                : null
            }
            edit={
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt"
                ? VirementFondEdit
                : null
            }
            icon={FaCreditCard}
          />
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource
            name="virements"
            list={VirementList}
            create={
              permissions === "admin" ||
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? VirementCreate
                : null
            }
            edit={
              permissions === "admin" ||
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? VirementEdit
                : null
            }
            icon={FaCreditCard}
          />
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource name="logfactures" list={AvancePayerList} />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <CustomRoutes>
            <Route path="/print" element={<PrintModule />} />
          </CustomRoutes>
        ) : null,
        permissions === "admin" || permissions === "direction générale" ? (
          <Resource
            name="users"
            list={UserList}
            edit={permissions === "admin" ? UserEdit : ""}
            create={permissions === "admin" ? UserCreate : ""}
            icon={FaCreditCard}
          />
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <CustomRoutes>
            <Route
              path="/DetailFacturebyfournisseur"
              element={<SuivieFactureExerciceList />}
            />
          </CustomRoutes>
        ) : null,

        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource
            name="Avance"
            list={AvanceList}
            edit={
              permissions === "admin" ||
              permissions === "direction générale" ||
              permissions === "normal user" ||
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? AvanceEdit
                : ""
            }
            // create={AvanceCreate}
            icon={FaCreditCard}
          />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable" ? (
          <Resource
            name="AvanceForupdate"
            list={AvanceForupdateList}
            edit={
              permissions === "admin" ||
              permissions === "normal user" ||
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? AvanceForupdateEdit
                : ""
            }
            icon={FaCreditCard}
            create={
              permissions === "admin" ||
              permissions === "normal user" ||
              permissions === "comptable midelt" ||
              permissions === "superviseur comptabilite midelt" ||
              permissions === "superviseur comptabilite" ||
              permissions === "comptable"
                ? AvanceForupdateCreate
                : ""
            }
          />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "consultation directeur" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource
            name="alertattestationregfisc"
            list={AlertAttestationRegFiscList}
          />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "consultation directeur" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource name="faayantfn" list={FaAyantFnList} />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "consultation directeur" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <CustomRoutes>
            <Route path="/echencier" element={<Echencier />} />
          </CustomRoutes>
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "consultation directeur" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <CustomRoutes>
            <Route path="/situationfn" element={<SituationFn />} />
          </CustomRoutes>
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "comptable midelt" ||
        permissions === "comptable PdT" ||
        permissions === "superviseur comptabilite midelt" ? (
          <Resource name="rastva" list={RastvaList} />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "consultation directeur" ||
        permissions === "montage" ||
        permissions === "electricite" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource name="getfacturedetails" list={GetfacturedetailList} />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "consultation directeur" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource name="getavancedetails" list={GetavancedetailList} />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource name="gettvalog" list={<TvalogList />} />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <Resource
            name="echeancefournisseur"
            list={EcheancefournisseurList}
            edit={EcheancefournisseurEdit}
            create={EcheancefournisseurCreate}
          />
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "consultation directeur" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <CustomRoutes>
            <Route path="/situationfournisseur" element={<StFournisseur />} />
          </CustomRoutes>
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "consultation directeur" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <CustomRoutes>
            <Route path="/situationchantier" element={<StChantier />} />
          </CustomRoutes>
        ) : null,
        permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable PdT" ||
        permissions === "comptable" ? (
          <CustomRoutes>
            <Route path="/atnerpaiements" element={<PaiementPage />} />
          </CustomRoutes>
        ) : null,
      ]}
    </Admin>
  );
}

export default App;
