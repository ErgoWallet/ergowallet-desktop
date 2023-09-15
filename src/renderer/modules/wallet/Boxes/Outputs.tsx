import * as React from 'react';
import { shell } from 'electron';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Box, Checkbox, Collapse, IconButton, Link, Table } from "@mui/material";
import Hex from "../../../components/Hex";
import Send from "./Send";
import Chip from "@mui/material/Chip";
import AssetValue from "../../../components/AssetValue";
import Address from "../../../components/Address";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/root-reducer";
import { fetchUnspentBoxes, WalletState } from "../wallet-slice";
import TokensValues from "../TokensValues";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { WalletBox } from "../../../../main/application/services/wallet/Wallet";
import { explorerBaseUri } from "../../../config";

const useRowStyles = {
  '& > *': {
    borderBottom: 'unset',
  },
};

function Row(props: { box: WalletBox; selected: boolean; onSelect: any }): React.ReactElement {
  const { box, selected, onSelect } = props;
  const [open, setOpen] = React.useState(false);
  const handleBoxIdClick = () => {
    shell.openExternal(`${explorerBaseUri}/box/${box.boxId}`);
  };
  return (
    <React.Fragment>
      <TableRow sx={useRowStyles}>
        <TableCell padding="checkbox">
          <Checkbox
            disabled={box.spentTransactionId !== null}
            onClick={onSelect}
            checked={selected}
          />
        </TableCell>
        <TableCell>
          <Address shortened={true} value={box.address} />
        </TableCell>
        <TableCell style={{ textTransform: "uppercase" }}>
          <Chip
            label={(<AssetValue amount={box.value.toString()} decimals={9} symbol="ERG" />)}
            variant="outlined"
          />
        </TableCell>
        <TableCell align="right">
          <Box display="flex">
            {/* <Chip
              label={(<AssetValue amount={box.value.toString()} decimals={9} symbol="ERG"/>)}
              variant="outlined"
            /> */}
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
            <Box sx={{ mt: 1 }}>
              Box ID <Link sx={{ textTransform: "uppercase" }} onClick={handleBoxIdClick} href="#" variant="body2" title="Open in explorer">
                <Hex>{box.boxId}</Hex>
              </Link>
            </Box>
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
            <TableCell>ERG</TableCell>
            <TableCell align="left">Assets</TableCell>
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
