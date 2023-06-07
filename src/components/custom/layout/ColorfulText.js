import React from 'react';
import colors from './color';


const ColorfulText = () => {
  return (
    <span  >
     <p><span style={{ color: colors.primary }}>facture qui ont fiche navette</span>
      </p> 
    <p>
    <span style={{ color: colors.secondary }}>facture qui n'ont pas fiche navette</span>
    </p>

    </span>
  );
};


export default ColorfulText;
