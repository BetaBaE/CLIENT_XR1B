// src/CustomAppBar.js
import { AppBar } from "react-admin";
import CustomUserMenu from "./CustomUserMenu";

export const CustomAppBar = (props) => (
  <AppBar {...props} userMenu={<CustomUserMenu />} />
);
