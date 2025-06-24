import { Layout } from "react-admin";
import { CustomMenu } from "../menu/CustomMenu";
import { CustomAppBar } from "../menu/CustomAppBar";

export const CustomLayout = (props) => (
  <Layout
    {...props}
    appBar={CustomAppBar}
    menu={CustomMenu}
    // appBar={CustomAppBar}
  />
);
