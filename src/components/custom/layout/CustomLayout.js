import { Layout } from "react-admin";
// import { CustomAppBar } from "../appBar/CustomAppBar";
import { CustomMenu } from "../menu/CustomMenu";

export const CustomLayout = (props) => (
  <Layout
    title="Imp. order virement"
    {...props}
    menu={CustomMenu}
    // appBar={CustomAppBar}
  />
);
