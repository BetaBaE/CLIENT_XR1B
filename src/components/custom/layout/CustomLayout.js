import { Layout } from "react-admin";
import { CustomMenu } from "../menu/CustomMenu";

export const CustomLayout = (props) => (
  <Layout
    title="Imp. order virement"
    {...props}
    menu={CustomMenu}
    // appBar={CustomAppBar}
  />
);
