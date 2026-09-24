import * as React from 'react';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../store/root-reducer";
import { fetchAddresses } from "../wallet-slice";
import { Box, Collapse, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useQRCode } from "react-qrcode";
import Address from "../../../components/Address";

function Addresses(): React.ReactElement {
  const dispatch = useDispatch();
  const wallet = useSelector((state: RootState) => state.wallet);

  React.useEffect(() => {
    dispatch(fetchAddresses());
  }, []);

  return (
    <AddressesView addresses={wallet.addresses} />
  );
}

export function AddressesView(props: { addresses: Array<any> }) {
  const { addresses } = props;
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Address</TableCell>
          <TableCell align="right">Tx</TableCell>
          <TableCell>Status</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {addresses.map((item) => (
          <Row key={item.address} item={item} />
        ))}
      </TableBody>
    </Table>
  );
}

const useRowStyles = {
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
};
/**
 * Collapsable Address Row
 * @param props
 */
const Row = (props: { item: any }) => {
  const { item } = props;
  const [open, setOpen] = React.useState(false);
  const dataUrl = useQRCode(item.address);

  return (
    <React.Fragment>
      <TableRow sx={useRowStyles.root}>
        <TableCell style={{ backgroundColor: item.internal ? '#f4ebc1' : '#a0c1b8' }}>
          {item.internal ? "change" : "receiving"}
        </TableCell>
        <TableCell>
          <Address
            copy={true}
            value={item.address}
          />
        </TableCell>
        <TableCell align="right">{item.txCount}</TableCell>
        <TableCell>{item.state}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            <Box m={1} display="flex">
              <Box flexBasis={0} flexGrow={1}>
                <Box display="flex" flexDirection="column">
                  <Box display="flex">
                    <Box flexBasis={0} flexGrow={1}>Derivation Path</Box>
                    <Box flexBasis={0} flexGrow={1}>{item.path}</Box>
                  </Box>
                  <Box display="flex">
                    <Box flexBasis={0} flexGrow={1}>Public key</Box>
                    <Box m={1} flexBasis={0} flexGrow={1}>{`0x${item.publicKey}`}</Box>
                  </Box>
                </Box>
              </Box>
              <Box flexBasis={0} flexGrow={1}>
                <img src={dataUrl} />
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Addresses;