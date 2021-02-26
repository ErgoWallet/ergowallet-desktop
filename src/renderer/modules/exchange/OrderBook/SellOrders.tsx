import * as React from 'react';
import {Box} from "@material-ui/core";


function SellOrders () {
  return (
    <>
      <Box display={"flex"} flexDirection={"column"}>
        <Box display={"flex"}>
          <Box flexBasis={0} flexGrow={1}>Price</Box>
          <Box flexBasis={0} flexGrow={1}>Amount</Box>
          <Box flexBasis={0} flexGrow={1}>Total</Box>
        </Box>
        <Box display={"flex"}>
          <Box flexBasis={0} flexGrow={1} color={"red"}>19.30</Box>
          <Box flexBasis={0} flexGrow={1}>500</Box>
          <Box flexBasis={0} flexGrow={1}>0.01118250</Box>
        </Box>
        <Box display={"flex"}>
          <Box flexBasis={0} flexGrow={1} color={"red"}>19.20</Box>
          <Box flexBasis={0} flexGrow={1}>1222</Box>
          <Box flexBasis={0} flexGrow={1}>0.01118250</Box>
        </Box>
        <Box display={"flex"}>
          <Box flexBasis={0} flexGrow={1} color={"red"}>19.10</Box>
          <Box flexBasis={0} flexGrow={1}>222.12</Box>
          <Box flexBasis={0} flexGrow={1}>0.01118250</Box>
        </Box>
      </Box>
    </>
  );
}

export default SellOrders;
