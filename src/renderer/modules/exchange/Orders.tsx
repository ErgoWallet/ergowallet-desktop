import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Typography} from "@mui/material";
import Paper from '../../components/Paper';

// Generate Order Data
function createData(id: any, date: any, type: any, amount: any, price: any, total: any) {
  return { id, date, type, amount, price, total };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Sell', 12.5, 0.2, 312.44),
  createData(1, '16 Mar, 2019', 'Buy', 12.5, 0.2, 866.99),
  createData(2, '16 Mar, 2019', 'Sell', 12.5, 0.2, 100.81),
  createData(3, '16 Mar, 2019', 'Sell', 12.5, 0.2, 654.39),
  createData(4, '15 Mar, 2019', 'Buy', 12.5, 0.2, 212.79),
];


export default function Orders() {
  return (
    <Paper>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Open Orders
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="right">Cancel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell align="right">Cancel</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Paper>
  );
}
