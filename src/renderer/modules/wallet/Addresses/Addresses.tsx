import * as React from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Hex from "../../../components/Hex";
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from "../../../store/root-reducer";
import {fetchAddresses} from "../wallet-slice";

function Addresses (): React.ReactElement {
  const dispatch = useDispatch();
  const wallet = useSelector((state: RootState) => state.wallet);

  React.useEffect(() => {
    dispatch(fetchAddresses());
  }, []);

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Path</TableCell>
          <TableCell align="right">Tx</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {wallet.addresses.map((item) => (
          <TableRow key={item.address}>
            <TableCell>{item.internal ? 'change':'receiving'}</TableCell>
            <TableCell><Hex>{item.address}</Hex></TableCell>
            <TableCell>{item.path}</TableCell>
            <TableCell align="right">{item.txCount}</TableCell>
            <TableCell>{item.state}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Addresses;
