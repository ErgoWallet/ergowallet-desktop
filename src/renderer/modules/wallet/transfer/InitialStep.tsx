import * as React from 'react';
import {Box, Button, Grid} from "@mui/material";
import Input from "../../../components/Input";
import AssetValueInput, {AssetValueInputState} from "./AssetValueInput";
import AssetValue from "../../../components/AssetValue";
import Address from "../../../components/Address";
import {MoneyUnits} from "../../../../common/MoneyUnits";
import {fromErg} from "../../../../common/utils";
import TokensValues from "../TokensValues";
import {minBoxValue} from "../../../../common/constants";
import {ErgoBoxSet} from "../../../../common/ErgoBoxSet";
import {WalletBox} from "../../../../main/application/services/wallet/Wallet";

interface InitialStepProps {
  fromBoxes: Array<WalletBox>;
  assetId: string;
  onContinue?: any;
  backendApi?: any;
}

const initialFee = '0.001';

function InitialStep(props: InitialStepProps): React.ReactElement {
  const {fromBoxes, assetId, backendApi} = props;
  const amountRef = React.createRef<any>();

  // Total nanoERG available
  const boxes = new ErgoBoxSet(fromBoxes);
  const decimals = assetId === 'ERG' ? 9 : 0;
  const totalTokenAmount = new MoneyUnits(boxes.balance(assetId), decimals);

  const [recipient, setRecipient] = React.useState('');
  const [recipientError, setRecipientError] = React.useState('');
  const [error, setError] = React.useState(null);

  const [feeInputState, setFeeInputState] = React.useState<AssetValueInputState>({
    value: initialFee,
    isValid: true
  });
  const [amountInputState, setAmountInputState] = React.useState<AssetValueInputState>({
    value: '0',
    isValid: true
  });

  const amountStr = amountInputState.value.length > 0 ? amountInputState.value : '0';
  const feeStr = feeInputState.value.length > 0 ? feeInputState.value : '0';

  // This is amount of ERG need for outputs which holds tokens
  const ergNeedsForTokens = fromBoxes.reduce((total: MoneyUnits, box: any) => {
    if (box.assets.length > 0) {
      return total.plus(new MoneyUnits(minBoxValue, 9));
    }
    return total;
  }, new MoneyUnits(0, 9));

  const fee = fromErg(feeStr);

  let ergChange = new MoneyUnits(boxes.balance('ERG'), 9)
    .minus(fee)
    .minus(ergNeedsForTokens);

  if (assetId === 'ERG') {
    ergChange = ergChange
      .minus(fromErg(amountStr));
  }

  async function handleRecipientChange(event: React.ChangeEvent<{ value: string }>): Promise<void> {
    const address = event.target.value;
    setRecipient(address);
    if (address.length > 0) {
      const result = await backendApi.validateAddress(address);
      setRecipientError(result);
    } else {
      setRecipientError('');
    }
  }

  function handleFeeChange(state: AssetValueInputState): void {
    setFeeInputState(state);
  }

  function handleAmountChange(state: AssetValueInputState): void {
    setAmountInputState(state);
  }

  async function createTxAndContinue() {
    try {
      setError(null);

      const inputs = fromBoxes.map((b) => b.boxId);
      const tx = await backendApi.createTransaction(inputs, recipient, amountInputState.value, feeInputState.value, assetId);

      if (props.onContinue) {
        props.onContinue(tx);
      }

    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }

  const invalidForm = (recipientError != '') ||
    (recipient === '') ||
    (!feeInputState.isValid) ||
    (!amountInputState.isValid) ||
    ergChange.isNegative();

  function setMax(): void {
    // Minus tx fee
    let maximum = totalTokenAmount;
    if (assetId === 'ERG') {
      maximum = maximum
        .minus(fee)
        .minus(ergNeedsForTokens);
    }

    if (maximum.isNegative()) {
      maximum = new MoneyUnits('0', decimals);
    }
    amountRef.current.setValue(maximum.toMainUnits());
  }

  return (
    <>
      <Box mb={1}>Spend boxes</Box>
      <Grid container direction="column">
        {fromBoxes.map((box) => {
          return (
            <Box display="flex" alignItems="center" key={box.boxId}>
              <Box flexBasis={0} flexGrow={3}>
                <Address value={box.address} shortened/>
              </Box>
              <Box flexBasis={0} flexGrow={2} display="flex" alignItems="center">
                <TokensValues assets={box.assets} />
                <AssetValue amount={box.value.toString()} decimals={9} symbol="ERG"/>
              </Box>
            </Box>
          );
        })}
      </Grid>
      <Box component="div" mt={2}>
        Amount
      </Box>
      <Box component="div" mt={1}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={3}>
            <AssetValueInput
              ref={amountRef}
              onChange={handleAmountChange}
              assetDecimals={decimals}
              assetSymbol={assetId.substr(0, 4)}
              initialValue={amountInputState.value}
            />
          </Box>
          <Box flexGrow={1}>
            <Button
              color="secondary"
              onClick={setMax}
              variant="outlined"
            >
              MAX
            </Button>
          </Box>
        </Box>
      </Box>
      <Box component="div" mt={2}>
        Recipient
      </Box>
      <Box width={450}>
        <Input
          error={recipientError.length > 0}
          errorText={recipientError}
          value={recipient}
          fullWidth={true}
          onChange={handleRecipientChange}
        />
      </Box>
      <Box component="div" mt={2}>
        Fee
      </Box>
      <Box mt={1}>
        <AssetValueInput
          onChange={handleFeeChange}
          assetDecimals={9}
          assetSymbol="ERG"
          initialValue={feeInputState.value}
        />
      </Box>
      <Box component="div" mt={2}>
        Change <AssetValue amount={ergChange.amount} decimals={ergChange.decimals} symbol="ERG"/>
      </Box>
      {/* Error while creation ergo tx */}
      {error && (<Box>{JSON.stringify(error)}</Box>)}

      <Box mt={3}>
        <Button
          disabled={invalidForm}
          variant="contained"
          color="secondary"
          onClick={createTxAndContinue}
        >
          Continue
        </Button>
      </Box>
    </>
  );
}

export default InitialStep;
