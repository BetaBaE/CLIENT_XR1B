import * as React from "react";
import { Menu, usePermissions } from "react-admin";
import SubMenu from "./SubMenu";
import {
  FaCreditCard,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaUserTie,
  FaUser,
  FaEquals,
  FaRegMoneyBillAlt,
  FaPaperPlane,
  FaPrint,
  FaBatteryEmpty,
} from "react-icons/fa";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TbReportMoney } from "react-icons/tb";

export const CustomMenu = (props) => {
  const { permissions } = usePermissions();

  return (
    <Menu {...props}>
      {/* <Menu.DashboardItem /> */}
      {(permissions === "admin" || permissions === "normal user") && (
        <Menu.Item to="/users" primaryText="Users" leftIcon={<FaUser />} />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
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
          {/* <Menu.Item
            to="/ModificationFichnavette"
            primaryText="Modif/Annul Av/FN"
            leftIcon={<FaFileInvoiceDollar />}
          /> */}

          {/* <Menu.Item
            to="/FactureValider"
            primaryText="Archivage Facture"
            leftIcon={<FaFileInvoice />}
          /> */}
          <Menu.Item
            to="/historiquefacture"
            primaryText="Historique Facture"
            leftIcon={<FaFileInvoice />}
          />
          <Menu.Item
            to="/getAvanceDetailRestit"
            primaryText="AvanceRestituerDetatailList"
            leftIcon={<FaBatteryEmpty />}
          />
        </SubMenu>
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <SubMenu
          primaryText="Section Fournisseur"
          leftIcon={<ChevronRightIcon />}
        >
          <Menu.Item
            to="fournisseurs"
            primaryText="Fournisseurs"
            leftIcon={<FaUserTie />}
          />
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
            to="EcheanceReel"
            primaryText="Echeance Fournisseur Reel"
            leftIcon={<FaRegMoneyBillAlt />}
          />
          <Menu.Item
            to="EcheanceLoi"
            primaryText="Echeance Fournisseur Loi"
            leftIcon={<FaEquals />}
          />
          <Menu.Item
            to="Attestaion"
            primaryText="Attestation Fiscalité"
            leftIcon={<FaPaperPlane />}
          />
        </SubMenu>
      )}

      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <SubMenu primaryText="Section  Atner" leftIcon={<ChevronRightIcon />}>
          <Menu.Item
            to="users"
            primaryText="Users"
            leftIcon={<FaCreditCard />}
          />
          <Menu.Item
            to="ribatner"
            primaryText="RIB Atner"
            leftIcon={<FaCreditCard />}
          />
          <Menu.Item
            to="/virementsFond"
            primaryText="Virements de fond"
            leftIcon={<FaUserTie />}
          />
          <Menu.Item
            to="/ordervirementFond"
            primaryText="ordervirementFond"
            leftIcon={<FaCreditCard />}
          />
        </SubMenu>
      )}

      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
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
        </SubMenu>
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/print"
          primaryText="Imp. Order Virement"
          leftIcon={<FaPrint />}
        />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <SubMenu primaryText="Suive Facture" leftIcon={<ChevronRightIcon />}>
          <Menu.Item
            to="/SuivieFacture"
            primaryText="Log Facture Saisie"
            leftIcon={<FaFileInvoiceDollar />}
          />
          <Menu.Item
            to="/SuivieFactureEchu"
            primaryText="Facture enregistrée prête pour l'échéance"
            leftIcon={<FaFileInvoice />}
          />
          <Menu.Item
            to="/FactureNonPaye"
            primaryText="Facture Non Paye"
            leftIcon={<TbReportMoney />}
          />
          <Menu.Item
            to="/DetailFacturebyfournisseur"
            primaryText="Somme par Fournisseur"
            leftIcon={<TbReportMoney />}
          />
        </SubMenu>
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <SubMenu primaryText="Alerts" leftIcon={<ChevronRightIcon />}>
          <Menu.Item
            to="/alertattestationregfisc"
            primaryText="Alerts Log Facture Saisie"
            leftIcon={<FaFileInvoiceDollar />}
          />
        </SubMenu>
      )}
    </Menu>
  );
};
