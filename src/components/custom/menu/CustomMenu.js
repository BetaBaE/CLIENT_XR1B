import * as React from "react";
import { Menu, usePermissions } from "react-admin";
import {
  FaTruck,
  FaCreditCard,
  FaPrint,
  FaBuilding,
  FaUser,
  FaPager,
  FaFileInvoice,
  FaRegListAlt,
  FaSearch,
  FaHistory,
  FaEnvelope,
  FaTrash,
  FaBorderAll,
  FaAndroid,
  FaMonero,
  FaAngleLeft,
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaCreativeCommonsZero,
} from "react-icons/fa";
import { Md1XMobiledata, MdPayments } from "react-icons/md";

export const CustomMenu = (props) => {
  const { permissions } = usePermissions();

  return (
    <Menu {...props}>
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/fournisseurs"
          primaryText="Fournisseurs"
          leftIcon={<FaTruck />}
        />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/ribtempo"
          primaryText="RIB Temporaire"
          leftIcon={<FaCreditCard />}
        />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "superviseur comptabilite") && (
        <Menu.Item
          to="/ribfournisseurs"
          primaryText="RIB Validé"
          leftIcon={<FaCreditCard />}
        />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/ribatner"
          primaryText="RIB Atner"
          leftIcon={<FaBuilding />}
        />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/factures"
          primaryText="Factures"
          leftIcon={<FaFileInvoice />}
        />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/ordervirement"
          primaryText="Order Virement"
          leftIcon={<FaPager />}
        />
      )}

      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/virements"
          primaryText="Virements"
          leftIcon={<MdPayments />}
        />
      )}

{(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/VirementAvance"
          primaryText="AvanceVirement"
          leftIcon={<FaCreativeCommonsZero />}
        />
      )}







 {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/cheque"
          primaryText="cheque"
          leftIcon={<FaAndroid />}
        />
      )}



{(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/espece"
          primaryText="espece"
          leftIcon={<FaMonero />}
        />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/logfactures"
          primaryText="Log Factures"
          leftIcon={<FaRegListAlt />}
        />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/facturesres"
          primaryText="Facture Saisie"
          leftIcon={<FaEnvelope />}
        />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/FactureValider"
          primaryText="Archivage Facture"
          leftIcon={<FaHistory />}
        />
      )}

      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/factureRech"
          primaryText="Fiche Navette"
          leftIcon={<FaSearch />}
        />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
        permissions === "comptable midelt" ||
        permissions === "superviseur comptabilite midelt" ||
        permissions === "comptable") && (
        <Menu.Item
          to="/historiquefacture"
          primaryText="Historique Facture"
          leftIcon={<FaTrash />}
        />
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
        <Menu.Item
          to="/all"
          primaryText="Log Facture Saisie"
          leftIcon={<FaBorderAll />}
        />
      )}
      {(permissions === "admin" || permissions === "normal user") && (
          <Menu.Item to="/users" primaryText="Users" leftIcon={<FaUser />} />
        )}
    </Menu>
  );
};
