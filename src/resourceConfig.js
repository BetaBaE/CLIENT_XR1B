//! import { AvanceRestituerDetatailList } from "./components/AvanceRestituerDetatail/AvanceRestituerDetatailList";
import { Roles, RoleGroups } from "./utils/rbac";
import { FaTruck, FaCreditCard } from "react-icons/fa";

import { FournisseursList } from "./components/Fournisseur/FournisseursList";
import { FournisseurCreate } from "./components/Fournisseur/FournisseurCreate";
import { FournisseurEdit } from "./components/Fournisseur/FournisseurEdit";

import { TmpfournisseurList } from "./components/FournisseurTmp/TmpfournisseurList";
import { FournisseurTmpCreate } from "./components/FournisseurTmp/FournissuerTmpCreate";
import { TmpfournisseurEdit } from "./components/FournisseurTmp/TmpfournisseurEdit";

import { DesignationList } from "./components/Designations/DesignationList";
import { DesignationCreate } from "./components/Designations/DesignationCreate";
import { DesignationEdit } from "./components/Designations/EditDesignation";

import { AttestationFournisseurList } from "./components/AttestationFournisseur/AttestationFournisseurList";
import AttestationFournisseurCreate from "./components/AttestationFournisseur/AttestationFournisseurCreate";

import { RibaAtnerList } from "./components/RIBAtner/RibAtnerList";

import { RibtempoList } from "./components/RIBtempo/RibtempoList";
import { RibtempoCreate } from "./components/RIBtempo/RibtempoCreate";

import { FactureSaisieList } from "./components/FactureSaisie/FactureSaisieList";
import { FactureSaisieCreate } from "./components/FactureSaisie/FactureSaisieCreate";
import { FactureSaisieEdit } from "./components/FactureSaisie/FactureSaisieEdit";

import { FicheNavetteList } from "./components/FicheNavette/FicheNavetteList";
import { FicheNavetteCreate } from "./components/FicheNavette/FicheNavetteCreate";
import { FicheNavetteEdit } from "./components/FicheNavette/FicheNavetteEdit";

import { OrdervirementList } from "./components/OrderVirement/OrdervirementList";
import { OrdervirementCreate } from "./components/OrderVirement/OrdervirementCreate";
import { OrdervirementEdit } from "./components/OrderVirement/OrdervirementEdit";

import { OrdervirementFondList } from "./components/OrderVirementFond/OrdervirementList";
import { OrdervirementFondCreate } from "./components/OrderVirementFond/OrdervirementFondCreate";

import { VirementList } from "./components/Virement/VirementList";
import { VirementCreate } from "./components/Virement/VirementCreate";
import { VirementEdit } from "./components/Virement/VirementEdit";

import { VirementFondList } from "./components/VirementFond/VirementFondList";
import { VirementFondCreate } from "./components/VirementFond/VirementFondCreate";
import { VirementFondEdit } from "./components/VirementFond/VirementFondEdit";

import { ChequeList } from "./components/Cheque/ChequeList";
import { ChequeCreate } from "./components/Cheque/ChequeCreate";
import { ChequeEdit } from "./components/Cheque/ChequeEdit";

import { EspeceList } from "./components/Espece/EspeceList";
import { EspeceCreate } from "./components/Espece/EspeceCreate";

import { FactureList } from "./components/FacturesSage/FactureList";

import { HistoriqueFactureList } from "./components/HistoriqueFacture/HistoriqueFactureList";

import { ModificationFichnavette } from "./components/Modification fichnavette/ModificationFichnavette";
import { ModificationFichnavetteEdit } from "./components/Modification fichnavette/ModificationFichnavetteEdit";

import { AvancePayerList } from "./components/AvancePayer/AvancePayerList";

import { UserList } from "./components/User/UserList";
import { UserCreate } from "./components/User/UserCreate";
import { UserEdit } from "./components/User/UserEdit";

import { AvanceList } from "./components/Avance/AvanceList";
import { AvanceEdit } from "./components/Avance/AvanceEdit";
import { AvanceForupdateList } from "./components/AvanceForupdate/AvanceForupdateList";
import { AvanceForupdateEdit } from "./components/AvanceForupdate/AvanceForupdateEdit";
import { AvanceForupdateCreate } from "./components/AvanceForupdate/AvanceForupdateCreate";

import { AlertAttestationRegFiscList } from "./components/Alerts/AlertAttestationRegFiscList";
import { RastvaList } from "./components/Alerts/RasTva";
import { GetfacturedetailList } from "./components/newLogFacture/newlogFacture";
import { GetavancedetailList } from "./components/newLogAvance/newlogAvance";
import { TvalogList } from "./components/newLogFacture/TvaLog";
import FaAyantFnList from "./components/Alerts/FaAyantFn";

import { DossierList } from "./components/Dossier/DossierList";
import { DossierEdit } from "./components/Dossier/DossierEdit";
import { DossierCreate } from "./components/Dossier/DossierCreate";

import { OvcredocList } from "./components/Credoc/OvcredocList.js";
import { OvcredocEdit } from "./components/Credoc/OvcredocEdit.js";
import { OvcredocCreate } from "./components/Credoc/OvcredocCreate.js";

import { PreparationpaiementList } from "./components/Alerts/PreparationpaiementList.js";
import { EcheancefournisseurList } from "./components/EcheanceFournisseur/EcheancefournisseurList.js";
import { EcheancefournisseurCreate } from "./components/EcheanceFournisseur/EcheancefournisseurCreate.js";
import { EcheancefournisseurEdit } from "./components/EcheanceFournisseur/EcheancefournisseurEdit.js";
import { RibfournisseurList } from "./components/RIBFournisseurs/RibfournisseurList.js";
import { RibfournisseurEdit } from "./components/RIBFournisseurs/RibfournisseurEdit.js";
import { RIBAtnerCreate } from "./components/RIBAtner/RIBAtnerCreate.js";
import { RIBatnerEdit } from "./components/RIBAtner/RIBAtnerEdit.js.js";
import PrintModule from "./components/printModule/PrintModule.js";
import SuivieFactureExerciceList from "./components/SuivieFactureExercice/SuivieFactureExerciceList.js";
import { Echencier } from "./components/Analyse/echencier/echencier.js";
import { SituationFn } from "./components/Analyse/echencier/echencier2.js";
import StFournisseur from "./components/Analyse/Situation Fournisseur/StFournisseur.js";
import StChantier from "./components/Analyse/Situation chantier/StChantier.js";
import PaiementPage from "./components/Analyse/Paiement/PaiementPage.js";

// Utility: helper to quickly declare read-only resources
const readOnly = {
  create: null,
  edit: null,
};

/**
 * Creates a custom route configuration object
 * @param {string} path - The route path (must start with '/')
 * @param {React.Component} element - The component to render
 * @param {Array<string>} requiredRoles - Roles that can access this route
 * @returns {Object} Custom route configuration
 */
const customRoute = (path, element, requiredRoles) => ({
  path,
  element,
  requiredRoles,
});

// Add this array to hold custom routes configuration
export const customRoutesConfig = [
  customRoute("/print", PrintModule, RoleGroups.READ),
  customRoute(
    "/DetailFacturebyfournisseur",
    SuivieFactureExerciceList,
    RoleGroups.READ
  ),
  customRoute("/echencier", Echencier, RoleGroups.READ_WITH_CONSULT),
  customRoute("/situationfn", SituationFn, RoleGroups.READ_WITH_CONSULT),
  customRoute(
    "/situationfournisseur",
    StFournisseur,
    RoleGroups.READ_WITH_CONSULT
  ),
  customRoute("/situationchantier", StChantier, RoleGroups.READ_WITH_CONSULT),
  customRoute("/atnerpaiements", PaiementPage, [
    Roles.ADMIN,
    Roles.DG,
    Roles.COMPTABLE_MIDELT,
    Roles.SUP_COMP_MIDELT,
    Roles.SUP_COMP,
    Roles.COMPTABLE_PDT,
    Roles.COMPTABLE,
  ]),
];

export const resourceConfig = [
  // Fournisseurs
  {
    name: "fournisseurs",
    viewRoles: RoleGroups.READ_WITH_ACHA,
    list: FournisseursList,
    create: FournisseurCreate,
    createRoles: [Roles.ADMIN, Roles.SUP_COMP_MIDELT, Roles.COMPTABLE_MIDELT],
    edit: FournisseurEdit,
    editRoles: [Roles.ADMIN, Roles.SUP_COMP_MIDELT, Roles.COMPTABLE_MIDELT],
    icon: FaTruck,
  },
  {
    name: "tmpfournisseurs",
    viewRoles: RoleGroups.READ_WITH_ACHA,
    list: TmpfournisseurList,
    create: FournisseurTmpCreate,
    createRoles: [Roles.ADMIN, Roles.ACHATEUR],
    edit: TmpfournisseurEdit,
    editRoles: [Roles.ADMIN, Roles.SUP_COMP_MIDELT, Roles.COMPTABLE_MIDELT],
  },
  {
    name: "designations",
    viewRoles: RoleGroups.READ,
    list: DesignationList,
    create: DesignationCreate,
    createRoles: [Roles.ADMIN, Roles.SUP_COMP_MIDELT],
    edit: DesignationEdit,
    editRoles: [Roles.ADMIN, Roles.SUP_COMP_MIDELT],
  },
  {
    name: "Attestaion",
    viewRoles: RoleGroups.READ,
    list: AttestationFournisseurList,
    create: AttestationFournisseurCreate,
    createRoles: [
      Roles.ADMIN,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE_MIDELT,
      Roles.COMPTABLE,
    ],
  },
  {
    name: "ribfournisseurs",
    viewRoles: [
      Roles.ADMIN,
      Roles.DG,
      Roles.NORMAL,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.COMPTABLE_PDT,
      Roles.SUP_COMP,
    ],
    list: RibfournisseurList,
    edit: RibfournisseurEdit,
    editRoles: [Roles.SUP_COMP_MIDELT, Roles.SUP_COMP],
    icon: FaCreditCard,
  },
  {
    name: "ribatner",
    viewRoles: RoleGroups.READ,
    list: RibaAtnerList,
    create: RIBAtnerCreate,
    edit: RIBatnerEdit,
    createRoles: [Roles.SUP_COMP_MIDELT],
    editRoles: [Roles.SUP_COMP_MIDELT],
    icon: FaCreditCard,
  },
  {
    name: "ribtempo",
    viewRoles: RoleGroups.READ,
    list: RibtempoList,
    create: RibtempoCreate,
    createRoles: [
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE_MIDELT,
      Roles.COMPTABLE,
    ],
    icon: FaCreditCard,
  },
  {
    name: "facturesSaisie",
    viewRoles: RoleGroups.READ,
    list: FactureSaisieList,
    create: FactureSaisieCreate,
    createRoles: [Roles.ADMIN, Roles.COMPTABLE_MIDELT, Roles.SUP_COMP_MIDELT],
    edit: FactureSaisieEdit,
    editRoles: [
      Roles.ADMIN,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.COMPTABLE,
    ],
  },
  {
    name: "FicheNavette",
    viewRoles: RoleGroups.READ,
    list: FicheNavetteList,
    create: FicheNavetteCreate,
    createRoles: [
      Roles.ADMIN,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    edit: FicheNavetteEdit,
    editRoles: [
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
  },
  {
    name: "ordervirement",
    viewRoles: RoleGroups.READ,
    list: OrdervirementList,
    create: OrdervirementCreate,
    createRoles: [
      Roles.ADMIN,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    edit: OrdervirementEdit,
    editRoles: [
      Roles.ADMIN,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    icon: FaCreditCard,
  },
  {
    name: "ordervirementFond",
    viewRoles: RoleGroups.READ,
    list: OrdervirementFondList,
    create: OrdervirementFondCreate,
    createRoles: [
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    // reuses OrdervirementEdit for edit as in original code
    edit: OrdervirementEdit,
    editRoles: [
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    icon: FaCreditCard,
  },
  {
    name: "cheque",
    viewRoles: RoleGroups.READ,
    list: ChequeList,
    create: ChequeCreate,
    createRoles: [
      Roles.ADMIN,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE_PDT,
      Roles.COMPTABLE,
    ],
    edit: ChequeEdit,
    editRoles: [
      Roles.ADMIN,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    icon: FaCreditCard,
  },
  {
    name: "espece",
    viewRoles: RoleGroups.READ,
    list: EspeceList,
    create: EspeceCreate,
    createRoles: [
      Roles.ADMIN,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE_PDT,
      Roles.COMPTABLE,
    ],
    icon: FaCreditCard,
  },
  {
    name: "factures",
    viewRoles: RoleGroups.READ,
    list: FactureList,
    ...readOnly,
    icon: FaCreditCard,
  },
  {
    name: "historiquefacture",
    viewRoles: [
      Roles.ADMIN,
      Roles.DG,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE_PDT,
      Roles.SUP_COMP_MIDELT,
    ],
    list: HistoriqueFactureList,
    icon: FaCreditCard,
  },
  {
    name: "ModificationFichnavette",
    viewRoles: [
      Roles.ADMIN,
      Roles.DG,
      Roles.NORMAL,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    list: ModificationFichnavette,
    edit: ModificationFichnavetteEdit,
    icon: FaCreditCard,
  },
  {
    name: "virementsFond",
    viewRoles: [
      Roles.ADMIN,
      Roles.DG,
      Roles.NORMAL,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    list: VirementFondList,
    create: VirementFondCreate,
    createRoles: [
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    edit: VirementFondEdit,
    editRoles: [Roles.COMPTABLE_MIDELT, Roles.SUP_COMP_MIDELT],
    icon: FaCreditCard,
  },
  {
    name: "virements",
    viewRoles: RoleGroups.READ,
    list: VirementList,
    create: VirementCreate,
    createRoles: [
      Roles.ADMIN,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    edit: VirementEdit,
    editRoles: [
      Roles.ADMIN,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    icon: FaCreditCard,
  },
  {
    name: "logfactures",
    viewRoles: RoleGroups.READ,
    list: AvancePayerList,
    ...readOnly,
  },
  {
    name: "users",
    viewRoles: RoleGroups.ADMIN_DG,
    list: UserList,
    create: UserCreate,
    createRoles: [Roles.ADMIN],
    edit: UserEdit,
    editRoles: [Roles.ADMIN],
    icon: FaCreditCard,
  },
  {
    name: "Avance",
    viewRoles: RoleGroups.READ,
    list: AvanceList,
    edit: AvanceEdit,
    editRoles: RoleGroups.READ,
    icon: FaCreditCard,
  },
  {
    name: "AvanceForupdate",
    viewRoles: [
      Roles.ADMIN,
      Roles.DG,
      Roles.NORMAL,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.COMPTABLE_PDT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    list: AvanceForupdateList,
    create: AvanceForupdateCreate,
    createRoles: [
      Roles.ADMIN,
      Roles.NORMAL,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    edit: AvanceForupdateEdit,
    editRoles: [
      Roles.ADMIN,
      Roles.NORMAL,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE,
    ],
    icon: FaCreditCard,
  },
  {
    name: "alertattestationregfisc",
    viewRoles: RoleGroups.READ_WITH_CONSULT,
    list: AlertAttestationRegFiscList,
    ...readOnly,
  },
  {
    name: "faayantfn",
    viewRoles: RoleGroups.READ_WITH_CONSULT,
    list: FaAyantFnList,
    ...readOnly,
  },
  {
    name: "rastva",
    viewRoles: [
      Roles.ADMIN,
      Roles.DG,
      Roles.COMPTABLE_MIDELT,
      Roles.COMPTABLE_PDT,
      Roles.SUP_COMP_MIDELT,
    ],
    list: RastvaList,
    ...readOnly,
  },
  {
    name: "getfacturedetails",
    viewRoles: [
      Roles.ADMIN,
      Roles.DG,
      Roles.DIR_CONSULT,
      "montage",
      "electricite",
      Roles.NORMAL,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE_PDT,
      Roles.COMPTABLE,
    ],
    list: GetfacturedetailList,
    ...readOnly,
  },
  {
    name: "getavancedetails",
    viewRoles: RoleGroups.READ_WITH_CONSULT,
    list: GetavancedetailList,
    ...readOnly,
  },
  {
    name: "gettvalog",
    viewRoles: RoleGroups.READ,
    list: TvalogList,
    ...readOnly,
  },
  {
    name: "echeancefournisseur",
    viewRoles: RoleGroups.READ,
    list: EcheancefournisseurList,
    create: EcheancefournisseurCreate,
    edit: EcheancefournisseurEdit,
  },
  {
    name: "dossier",
    viewRoles: RoleGroups.ADMIN_DG,
    list: DossierList,
    create: DossierCreate,
    edit: DossierEdit,
  },
  {
    name: "ovcredoc",
    viewRoles: RoleGroups.ADMIN_DG,
    list: OvcredocList,
    create: OvcredocCreate,
    edit: OvcredocEdit,
  },
  {
    name: "preparationpaiement",
    viewRoles: [
      Roles.ADMIN,
      Roles.DG,
      Roles.COMPTABLE_MIDELT,
      Roles.SUP_COMP_MIDELT,
      Roles.SUP_COMP,
      Roles.COMPTABLE_PDT,
      Roles.COMPTABLE,
    ],
    list: PreparationpaiementList,
    ...readOnly,
  },
];
