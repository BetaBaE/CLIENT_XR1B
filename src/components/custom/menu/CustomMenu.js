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
  FaPaperPlane,
  FaPrint,
  FaFolderOpen,
} from "react-icons/fa";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TbReportMoney } from "react-icons/tb";

export const CustomMenu = (props) => {
  const { permissions } = usePermissions();

  return (
    <Menu {...props}>
      {/* <Menu.DashboardItem /> */}

      {(permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "comptable PdT" ||
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
          <Menu.Item
            to="/designations"
            primaryText="Designations"
            leftIcon={<FaFileInvoiceDollar />}
          />
        </SubMenu>
      )}
      {(permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
        permissions === "achateur" ||
        permissions === "comptable") && (
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
          {permissions !== "achateur" ? (
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

      {(permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
        permissions === "comptable") && (
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

      {(permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
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
          <Menu.Item
            to="/print"
            primaryText="Imp. Documents"
            leftIcon={<FaPrint />}
          />
        </SubMenu>
      )}
      {(permissions === "admin" || permissions === "direction générale") && (
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
        </SubMenu>
      )}
      {(permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "consultation directeur" ||
        permissions === "montage" ||
        permissions === "electricite" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
        permissions === "comptable") && (
        <SubMenu primaryText="Suive Facture" leftIcon={<ChevronRightIcon />}>
          {/* <Menu.Item
            to="/SuivieFacture"
            primaryText="Log Facture Saisie"
            leftIcon={<FaFileInvoiceDollar />}
          /> */}
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
          {/* <Menu.Item
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
          /> */}
        </SubMenu>
      )}
      {(permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "consultation directeur" ||
        permissions === "montage" ||
        permissions === "electricite" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
        permissions === "comptable") && (
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
        </SubMenu>
      )}
      {(permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt") && (
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
      {(permissions === "admin" ||
        permissions === "direction générale" ||
        permissions === "consultation directeur" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable PdT" ||
        permissions === "comptable") && (
        <SubMenu primaryText="Analyse" leftIcon={<ChevronRightIcon />}>
          {permissions !== "consultation directeur" ? (
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
      {(permissions === "admin" || permissions === "direction générale") && (
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
