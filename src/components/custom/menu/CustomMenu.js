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
} from "react-icons/fa";
import { MdPayments } from "react-icons/md";

export const CustomMenu = (props) => {
  const { permissions } = usePermissions();

  return (
    <Menu {...props}>
      {(permissions === "admin" ||
        permissions === "normal user" ||
        permissions === "superviseur comptabilite" ||
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
        permissions === "comptable") && (
        <Menu.Item
          to="/ribtempo"
          primaryText="RIB Temporaire"
          leftIcon={<FaCreditCard />}
        />
      )}
      {(permissions === "admin" ||
        permissions === "normal user" ||
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
        permissions === "comptable") && (
        <Menu.Item
          to="/print"
          primaryText="Print Order Virement"
          leftIcon={<FaPrint />}
        />
      )}
      {permissions === "admin" && (
        <Menu.Item to="/users" primaryText="Users" leftIcon={<FaUser />} />
      )}
    </Menu>
  );
};
