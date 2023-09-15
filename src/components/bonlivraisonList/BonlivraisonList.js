import React, { Fragment, useEffect, useState } from "react";
import {
  Datagrid,

  List,
  TextField,

} from "react-admin";

export const BonlivraisonList = (props) => {;
  return (
      <List 
      title="Log Facture Saisie">
        <Datagrid 
             bulkActionButtons={false}
        {...props}>
  
          <TextField source="Bonlivraison" label="Bonlivraison" />
          
          <TextField source="idfacturenavette" label="idfacturenavette" />
        </Datagrid>
      </List>
      
  );
};
