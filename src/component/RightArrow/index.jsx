import React from "react";
import {ChevronRight } from "@mui/icons-material";
import { VisibilityContext } from 'react-horizontal-scrolling-menu';


 const RightArrow = () => {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <ChevronRight disabled={isFirstItemVisible} onClick={() => scrollPrev()} sx={{
      alignSelf:"center"
    }}>
      Left
    </ChevronRight>
  );
}

export default RightArrow;