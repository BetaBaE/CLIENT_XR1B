// import * as React from "react";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  useTheme,
} from "@mui/material";
import { useTranslate, useSidebarState } from "react-admin";

export const SubMenu = (props: SubMenuProps) => {
  const { isDropdownOpen = false, primaryText, leftIcon, children } = props;

  const translate = useTranslate();
  const [open] = useSidebarState();
  const [isOpen, setIsOpen] = useState(isDropdownOpen);
  const theme = useTheme();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ListItem
        dense
        button
        onClick={handleToggle}
        sx={{
          paddingLeft: ".7rem",
          color: theme.palette.text.secondary,
        }}
      >
        {isOpen ? <ExpandMoreIcon /> : leftIcon}
        {!isOpen && (
          <ListItemText
            inset
            disableTypography
            primary={translate(primaryText)}
            sx={{
              paddingLeft: 2,
              fontSize: "1rem",
              color: theme.palette.text.primary,
            }}
          />
        )}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            paddingLeft: open ? "25px" : 0,
            transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
          }}
        >
          {children}
        </List>
      </Collapse>
    </>
  );
};

export type SubMenuProps = {
  children?: React.ReactNode,
  isDropdownOpen?: boolean,
  leftIcon?: React.ReactElement,
  primaryText?: string,
};

export default SubMenu;
