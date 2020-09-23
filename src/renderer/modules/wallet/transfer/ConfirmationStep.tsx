import * as React from 'react';
import {Box, Button, Link} from "@material-ui/core";
import Address from "../../../components/Address";
import AssetValue from '../../../components/AssetValue';
import TokensValues from "../TokensValues";

interface ConfirmProps {
  tx: any;
  error?: any;
  onSend?: () => void;
}

function ConfirmationStep(props: ConfirmProps): React.ReactElement {
  const {tx, onSend, error} = props;
  const [showJson, setShowJson] = React.useState(false);

  function handleJsonClick(): void {
    setShowJson(!showJson);
  }

  function handleSendClick(): void {
    if (onSend) {
      onSend();
    }
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box>You are about to send out a transaction. Please carefully review the details.</Box>
      <Box mt={2}>
        {tx.outputs.map((output: any) => (
          <Box key={output.address} display="flex" alignItems="baseline">
            <Box flexBasis={0} flexGrow={1}>
              <Address value={output.address}/>
            </Box>
            <Box flexBasis={0} flexGrow={1} display="flex" justifyContent="flex-end" ml={1}>
              <TokensValues assets={output.assets}/>
              <AssetValue amount={output.value} decimals={9} symbol={"ERG"}/>
            </Box>
          </Box>
        ))}
      </Box>
      <Box mt={2} display="flex">
        <Box flexBasis={0} flexGrow={1}>Fee</Box>
        <Box flexBasis={0} flexGrow={1} display="flex" justifyContent="flex-end">
          <AssetValue amount={tx.fee} decimals={9}/>
        </Box>
      </Box>
      <Box mt={2}>
        <Link
          component="button"
          variant="body2"
          onClick={handleJsonClick}
        >
          View JSON
        </Link>
      </Box>
      {showJson && (
          <Box component={"pre"} overflow={"auto"} border={1} borderColor={"grey.200"}>
            {JSON.stringify(tx.ergoTx, null, 2)}
          </Box>
      )}
      {error && (
        <Box m={1}>{error}</Box>
      )}
      <Box mt={2}>
        <Button
          variant="contained"
          color={'secondary'}
          onClick={handleSendClick}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ConfirmationStep;
