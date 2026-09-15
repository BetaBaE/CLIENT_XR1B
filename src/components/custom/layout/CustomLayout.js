import { Layout } from "react-admin";
import { CustomMenu } from "../menu/CustomMenu";
import { CustomAppBar } from "../menu/CustomAppBar";
import { SyncThemeClass } from "../../global/SyncThemeClass";

export const CustomLayout = (props) => (
  <>
    <SyncThemeClass />
    <Layout
      {...props}
      appBar={CustomAppBar}
      menu={CustomMenu}
    />
  </>
);
