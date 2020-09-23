import * as React from 'react';
import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MoneyUnits} from "../../../../common/MoneyUnits";
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import TransferDialog from "../transfer/TransferDialog";
import {WalletBox} from "../../../../main/application/services/wallet/Wallet";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '15px'
  },
  assetInput: {
    padding: '10.5px'
  }
}));


function Send (props: {fromBoxes: Array<WalletBox>}): React.ReactElement {
  const classes = useStyles();
  const [asset, setAsset] = React.useState('ERG');
  const [transferDlgOpen, setTransferDlgOpen ] = React.useState(false);

  const { fromBoxes } = props;

  const total: MoneyUnits = fromBoxes.reduce((total: MoneyUnits, box: any) => {
    return total.plus(new MoneyUnits(box.value, 9));
  }, new MoneyUnits(0, 9));

  function handleChange(event: React.ChangeEvent<{ value: string }>): void {
    setAsset(event.target.value);
  }

  const handleTransferClose = () => {
    setTransferDlgOpen(false);
  };

  const handleSendClick = () => {
    setTransferDlgOpen(true);
  };

  const canSend = fromBoxes.length > 0;
  return (
    <Container className={classes.container}>
      <Grid container spacing={1}>
        <Grid alignItems="center"  spacing={1} container item lg={12} md={12} sm={12} xs={12}>
          <Grid item lg={1} md={1} sm={1}>
            Amount
          </Grid>
          <Grid item>
            <TextField
              size="small"
              variant="outlined"
              value={total.toMainUnits()}
            />
          </Grid>
          <Grid item>
            <FormControl>
              <Select
                value={asset}
                input={<OutlinedInput classes={{ input: classes.assetInput }} />}
                onChange={handleChange}
              >
                <MenuItem value={"ERG"}>ERG</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              disabled={!canSend}
              onClick={handleSendClick}
              variant="contained"
              color={'secondary'}
              endIcon={<SendOutlinedIcon />}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {transferDlgOpen && (
        <TransferDialog
          fromBoxes={fromBoxes}
          open={transferDlgOpen}
          onClose={handleTransferClose}
        />)}
    </Container>
  );
}

export default Send;
