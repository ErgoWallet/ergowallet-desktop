import * as React from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from "../../../store/root-reducer";
import {fetchAddresses} from "../wallet-slice";
import {Box, Collapse, IconButton} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {makeStyles} from "@material-ui/core/styles";
import {useQRCode} from "react-qrcode";
import Address from "../../../components/Address";

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
          <TableCell align="right">Tx</TableCell>
          <TableCell>Status</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {wallet.addresses.map((item) => (
          <Row key={item.address} item={item} />
        ))}
      </TableBody>
    </Table>
  );
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
/**
 * Collapsable Address Row
 * @param props
 */
const Row = (props: { item: any }) => {
  const {item} = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const dataUrl = useQRCode(item.address);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{backgroundColor: item.internal ? '#f4ebc1': '#a0c1b8'}}>
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
