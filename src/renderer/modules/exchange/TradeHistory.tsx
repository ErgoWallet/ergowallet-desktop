import * as React from 'react';
import Paper from "../../components/Paper";
import {Typography} from "@material-ui/core";

function TradeHistory () {
  return (
    <Paper>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Trade History
      </Typography>
      <table>
        <tbody>
          <tr>
            <td>0.0001</td>
            <td>300</td>
            <td>19:20:12</td>
          </tr>
          <tr>
            <td>0.0001</td>
            <td>300</td>
            <td>19:20:12</td>
          </tr>
          <tr>
            <td>0.0001</td>
            <td>300</td>
            <td>19:20:12</td>
          </tr>
        </tbody>
      </table>
    </Paper>
  );
}

export default TradeHistory;
