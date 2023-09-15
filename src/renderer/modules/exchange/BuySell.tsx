import * as React from 'react';
import Paper from "../../components/Paper";
import {Button, Grid, TextField} from "@mui/material";

function BuySell () {
  return (
    <Paper>
      <Grid container spacing={1}>
        {/* ---------------------------------------------- */}
        {/* Buy Part                                       */}
        {/* ---------------------------------------------- */}
        <Grid item lg={6} md={6} xs={12} sm={6} container spacing={1}>
          <Grid item lg={12} md={12} xs={12} sm={12}>
            Buy ERG
          </Grid>
          <Grid container spacing={1} item lg={12} md={12} xs={12} sm={12}>
            <Grid item>
              <TextField
                label="Price"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                label={"Amount"}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth={true}
                label={"Total"}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} xs={12} sm={12}>
            <Button fullWidth={true} variant="outlined" color="primary">Buy</Button>
          </Grid>
        </Grid>

        {/* ---------------------------------------------- */}
        {/* Sell Part                                      */}
        {/* ---------------------------------------------- */}
        <Grid item lg={6} md={6} xs={12} sm={6} container spacing={1}>
          <Grid item lg={12} md={12} xs={12} sm={12}>
            Sell ERG
          </Grid>
          <Grid container spacing={1} item lg={12} md={12} xs={12} sm={12}>
            <Grid item>
              <TextField
                label={"Price"}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                label={"Amount"}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth={true}
                label={"Total"}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} xs={12} sm={12}>
            <Button variant="outlined" fullWidth={true} color="primary">Sell</Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BuySell;
