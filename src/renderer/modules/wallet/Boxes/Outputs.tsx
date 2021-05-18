import * as React from 'react';
import {shell} from 'electron';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Box, Checkbox, Collapse, IconButton, Link, Table} from "@material-ui/core";
import Hex from "../../../components/Hex";
import Send from "./Send";
import Chip from "@material-ui/core/Chip";
import AssetValue from "../../../components/AssetValue";
import Address from "../../../components/Address";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/root-reducer";
import {fetchUnspentBoxes, WalletState} from "../wallet-slice";
import TokensValues from "../TokensValues";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {makeStyles} from "@material-ui/core/styles";
import {WalletBox} from "../../../../main/application/services/wallet/Wallet";
import {explorerBaseUri} from "../../../config";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props: {box: WalletBox; selected: boolean; onSelect: any}): React.ReactElement {
  const { box, selected, onSelect } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const handleBoxIdClick = () => {
    shell.openExternal(`${explorerBaseUri}/box/${box.boxId}`);
  };
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell padding="checkbox">
          <Checkbox
            disabled={box.spentTransactionId !== null}
            onClick={onSelect}
            checked={selected}
          />
        </TableCell>
        <TableCell>
          <Address shortened={true} value={box.address}/>
        </TableCell>
        <TableCell style={{textTransform: "uppercase"}}>
          <Link onClick={handleBoxIdClick} href="#" variant="body2" title="Open in explorer">
            <Hex>{box.boxId.substr(0, 16)+'...'}</Hex>
          </Link>
        </TableCell>
        <TableCell align="right">
          <Box display="flex">
            <Chip
              label={(<AssetValue amount={box.value.toString()} decimals={9} symbol="ERG"/>)}
              variant="outlined"
            />
            <TokensValues assets={box.assets} />
          </Box>
        </TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component={"pre"} overflow={"auto"} border={1} borderColor={"grey.200"}>
              {JSON.stringify(box, null, 2)}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function Outputs(): React.ReactElement {
  const dispatch = useDispatch();
  const wallet: WalletState = useSelector<RootState, WalletState>((state: RootState) => state.wallet);
  const [selected, setSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    dispatch(fetchUnspentBoxes());
  }, []);

  function isItemSelected(box: WalletBox): boolean {
    return selected.indexOf(box.boxId) !== -1;
  }

  const handleClick = (event: React.MouseEvent<unknown>, box: WalletBox) => {
    const selectedIndex = selected.indexOf(box.boxId);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, box.boxId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // We can select only unspent boxes
      const newSelected = wallet.boxes
        .filter((b) => b.spentTransactionId === null)
        .map((n) => n.boxId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const numSelected = selected?.length;
  const rowCount = wallet.boxes.length;
  const selectedBoxes = wallet.boxes.filter((b) => selected.includes(b.boxId));

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Box</TableCell>
            <TableCell align="right">Assets</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {wallet.boxes.map((box) => (
            <Row
              key={box.boxId}
              box={box}
              selected={isItemSelected(box)}
              onSelect={(event) => handleClick(event, box)}
            />
          ))}
        </TableBody>
      </Table>
      <Send fromBoxes={selectedBoxes} />
    </>
  );
}

export default Outputs;
