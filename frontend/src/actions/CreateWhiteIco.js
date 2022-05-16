import {IconContext} from "react-icons";
import React from "react";

export  function CreateWhiteIco(ico){
  return(
      <IconContext.Provider value={{color: 'white'}}>
      <div style={{marginTop: "-1px"}}>
          {ico}
      </div>
    </IconContext.Provider>
  )
}