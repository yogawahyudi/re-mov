import React from "react";
import {ChevronLeft } from "@mui/icons-material";
import { VisibilityContext } from 'react-horizontal-scrolling-menu';


const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <ChevronLeft disabled={isFirstItemVisible} onClick={() => scrollPrev()} sx={{
      alignSelf:"center"
    }}>
      Left
    </ChevronLeft>
  );
}

export default LeftArrow;

