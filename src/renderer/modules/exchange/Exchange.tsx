import * as React from 'react';
import Orders from './Orders';
import OrderBook from './OrderBook';
import BuySell from './BuySell';
import Chart from './Chart';
import {Grid} from "@mui/material";
import Pairs from "./Pairs";
import TradeHistory from "./TradeHistory";

const Exchange = () => {
  return (
    <Grid container spacing={1} direction={'column'}>
      {/* ------------------ */}
      <Grid container item xs={12}>
        <Grid container spacing={1}>

          <Grid item xs={3}>
            <OrderBook />
          </Grid>

          <Grid item xs={6}>
            <Grid container direction={'column'} spacing={1}>
              <Grid item>
                <Chart />
              </Grid>
              <Grid item>
                <BuySell />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={3} >
            <Grid spacing={1} container direction={'column'}>
              <Grid item>
                <Pairs />
              </Grid>
              <Grid item>
                <TradeHistory />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
      {/* ------------------ */}
      <Grid item xs={12}>
        <Orders />
      </Grid>
      {/* ------------------ */}

    </Grid>
  );
};

export default Exchange;
