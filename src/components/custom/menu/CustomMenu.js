import { Menu, usePermissions } from "react-admin";
import SubMenu from "./SubMenu";
import {
  FaCreditCard,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaUserTie,
  FaUser,
  FaEquals,
  FaPaperPlane,
  FaPrint,
  FaFolderOpen,
} from "react-icons/fa";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TbReportMoney } from "react-icons/tb";
import { Roles, RoleGroups, can } from "../../../utils/rbac";

export const CustomMenu = (props) => {
  const { permissions } = usePermissions();

  return (
    <Menu {...props}>
      {/* <Menu.DashboardItem /> */}

      {can(permissions, RoleGroups.READ) && (
        <SubMenu primaryText="Section Facture" leftIcon={<ChevronRightIcon />}>
          <Menu.Item
            to="AvanceForupdate"
            primaryText="Avance"
            leftIcon={<FaFileInvoiceDollar />}
          />
          <Menu.Item
            to="facturesSaisie"
            primaryText="Factures"
            leftIcon={<FaFileInvoice />}
          />
          <Menu.Item
            to="FicheNavette"
            primaryText="Fiche navette"
            leftIcon={<TbReportMoney />}
          />
          <Menu.Item
            to="Avance"
            primaryText="Restitution Avance"
            leftIcon={<TbReportMoney />}
          />
          <Menu.Item
            to="/designations"
            primaryText="Designations"
            leftIcon={<FaFileInvoiceDollar />}
          />
        </SubMenu>
      )}
      {can(permissions, RoleGroups.READ_WITH_ACHA) && (
        <SubMenu
          primaryText="Section Fournisseur"
          leftIcon={<ChevronRightIcon />}
        >
          <Menu.Item
            to="tmpfournisseurs"
            primaryText="Fournisseurs Achat"
            leftIcon={<FaUserTie />}
          />
          <Menu.Item
            to="fournisseurs"
            primaryText="Fournisseurs"
            leftIcon={<FaUserTie />}
          />
          {!can(permissions, [Roles.ACHATEUR]) ? (
            <>
              <Menu.Item
                to="ribtempo"
                primaryText="RIB Temporaire"
                leftIcon={<FaCreditCard />}
              />
              <Menu.Item
                to="ribfournisseurs"
                primaryText="RIB Fournisseurs"
                leftIcon={<FaCreditCard />}
              />
              <Menu.Item
                to="echeancefournisseur"
                primaryText="Modalité Paiement"
                leftIcon={<FaEquals />}
              />
              <Menu.Item
                to="Attestaion"
                primaryText="Attestation Fiscalité"
                leftIcon={<FaPaperPlane />}
              />{" "}
            </>
          ) : (
            ""
          )}
        </SubMenu>
      )}

      {can(permissions, RoleGroups.READ) && (
        <SubMenu primaryText="Section  Atner" leftIcon={<ChevronRightIcon />}>
          <Menu.Item
            to="ribatner"
            primaryText="RIB Atner"
            leftIcon={<FaCreditCard />}
          />
          <Menu.Item
            to="/ordervirementFond"
            primaryText="Order Virement Fond"
            leftIcon={<FaCreditCard />}
          />
          <Menu.Item
            to="/virementsFond"
            primaryText="Virements de fond"
            leftIcon={<FaUserTie />}
          />
        </SubMenu>
      )}

      {can(permissions, RoleGroups.READ) && (
        <SubMenu primaryText="Section Paiement" leftIcon={<ChevronRightIcon />}>
          <Menu.Item
            to="ordervirement"
            primaryText="Order Virement"
            leftIcon={<FaFileInvoiceDollar />}
          />
          <Menu.Item
            to="virements"
            primaryText="Virements"
            leftIcon={<FaFileInvoice />}
          />
          <Menu.Item
            to="cheque"
            primaryText="cheque"
            leftIcon={<TbReportMoney />}
          />
          <Menu.Item
            to="/espece"
            primaryText="espece"
            leftIcon={<TbReportMoney />}
          />
          <Menu.Item
            to="/print"
            primaryText="Imp. Documents"
            leftIcon={<FaPrint />}
          />
        </SubMenu>
      )}
      {can(permissions, RoleGroups.ADMIN_DG) && (
        <SubMenu
          primaryText="Section International"
          leftIcon={<ChevronRightIcon />}
        >
          <Menu.Item
            to="dossier"
            primaryText="Dossier"
            leftIcon={<FaFolderOpen />}
          />
          <Menu.Item
            to="ovcredoc"
            primaryText="OV & Credoc"
            leftIcon={<FaFolderOpen />}
          />
          <Menu.Item
            to="facturesinternational"
            primaryText="Facture"
            leftIcon={<FaFolderOpen />}
          />
          <Menu.Item
            to="virementinter"
            primaryText="Virement"
            leftIcon={<FaFolderOpen />}
          />
        </SubMenu>
      )}
      {can(permissions, [
        ...RoleGroups.READ_WITH_CONSULT,
        "montage",
        "electricite",
      ]) && (
        <SubMenu primaryText="Suive Facture" leftIcon={<ChevronRightIcon />}>
          <Menu.Item
            to="/getfacturedetails"
            primaryText="Log Facture"
            leftIcon={<FaFileInvoiceDollar />}
          />
          <Menu.Item
            to="/getavancedetails"
            primaryText="Log Avance"
            leftIcon={<FaFileInvoiceDollar />}
          />
        </SubMenu>
      )}
      {can(permissions, [
        ...RoleGroups.READ_WITH_CONSULT,
        "montage",
        "electricite",
      ]) && (
        <SubMenu primaryText="Alerte" leftIcon={<ChevronRightIcon />}>
          <Menu.Item
            to="/alertattestationregfisc"
            primaryText="Attest Reg Fisc"
            leftIcon={<FaFileInvoiceDollar />}
          />
          <Menu.Item
            to="/faayantfn"
            primaryText="FN Sage No Compta"
            leftIcon={<FaFileInvoiceDollar />}
          />
          <Menu.Item
            to="/preparationpaiement"
            primaryText="Préparation Paiement"
            leftIcon={<FaFileInvoiceDollar />}
          />
          <Menu.Item
            to="/fabcsamebc"
            primaryText="FA BC Ecart"
            leftIcon={<FaFileInvoiceDollar />}
          />
        </SubMenu>
      )}
      {can(permissions, [
        Roles.ADMIN,
        Roles.DG,
        Roles.COMPTABLE_MIDELT,
        Roles.SUP_COMP_MIDELT,
      ]) && (
        <SubMenu primaryText="Travaux Mensuel" leftIcon={<ChevronRightIcon />}>
          <Menu.Item
            to="/rastva"
            primaryText="RAS TVA"
            leftIcon={<FaFileInvoiceDollar />}
          />
          <Menu.Item
            to="/gettvalog"
            primaryText="Log TVA"
            leftIcon={<FaFileInvoiceDollar />}
          />
        </SubMenu>
      )}
      {can(permissions, [
        Roles.ADMIN,
        Roles.DG,
        Roles.DIR_CONSULT,
        Roles.SUP_COMP,
        Roles.COMPTABLE_MIDELT,
        Roles.SUP_COMP_MIDELT,
        Roles.COMPTABLE_PDT,
        Roles.COMPTABLE,
      ]) && (
        <SubMenu primaryText="Analyse" leftIcon={<ChevronRightIcon />}>
          {!can(permissions, [Roles.DIR_CONSULT]) ? (
            <Menu.Item
              to="/atnerpaiements"
              primaryText="ATNER Paiements"
              leftIcon={<FaFileInvoiceDollar />}
            />
          ) : (
            ""
          )}
          <Menu.Item
            to="/echencier"
            primaryText="Échéancier"
            leftIcon={<FaFileInvoiceDollar />}
          />
          {/* <Menu.Item
            to="/locationsituation"
            primaryText="Location Situation"
            leftIcon={<FaFileInvoiceDollar />}
          /> */}
          <Menu.Item
            to="/situationfn"
            primaryText="Situation FN"
            leftIcon={<FaFileInvoiceDollar />}
          />
          <Menu.Item
            to="/situationfournisseur"
            primaryText="Situation Fournisseur"
            leftIcon={<FaFileInvoiceDollar />}
          />
          <Menu.Item
            to="/situationchantier"
            primaryText="Situation Chantier"
            leftIcon={<FaFileInvoiceDollar />}
          />
        </SubMenu>
      )}
      {can(permissions, [
        ...RoleGroups.ADMIN_DG,
        Roles.SUP_COMP,
        Roles.SUP_COMP_MIDELT,
      ]) && (
        <SubMenu primaryText="MAD MASSE" leftIcon={<ChevronRightIcon />}>
          <Menu.Item
            to="/beneficiaries"
            primaryText="Bénéficiaires"
            leftIcon={<FaFileInvoice />}
          />
          <Menu.Item
            to="/transfers"
            primaryText="Entete"
            leftIcon={<FaCreditCard />}
          />
          <Menu.Item
            to="/transfersitems"
            primaryText="Lignes"
            leftIcon={<TbReportMoney />}
          />
          <Menu.Item
            to="/printtransefer"
            primaryText="Print MAD MASSE"
            leftIcon={<FaPrint />}
          />
        </SubMenu>
      )}
      {can(permissions, RoleGroups.ADMIN_DG) && (
        <SubMenu
          primaryText="Gestion Utilisateurs"
          leftIcon={<ChevronRightIcon />}
        >
          <Menu.Item
            to="/users"
            primaryText="Utilisateurs"
            leftIcon={<FaUser />}
          />
        </SubMenu>
      )}
    </Menu>
  );
};
