import * as React from 'react';
import Paper from '../../../components/Paper';
import SellOrders from './SellOrders';
import BuyOrders from './BuyOrders';
import {Divider, Box, Typography} from "@mui/material";


function OrderBook (): React.ReactElement {
  return (
    <Paper>
      <Box display={"flex"} minWidth={"200px"} flexDirection={"column"}>
        <Box>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Order Book
          </Typography>
        </Box>
        <SellOrders />
        <Divider />
        <Box>Spread 10%</Box>
        <Divider />
        <BuyOrders />
      </Box>
    </Paper>
  );
}

export default OrderBook;
