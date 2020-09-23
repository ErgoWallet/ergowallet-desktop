import * as React from 'react';
import {Box, Button} from "@material-ui/core";
import Hex from "../../../components/Hex";

interface FinalProps {
  txId: string;
  onClose?: any;
}

function FinalStep(props: FinalProps): React.ReactElement {
  const {txId, onClose} = props;

  function handleCloseClick(): void {
    if (onClose) {
      onClose();
    }
  }

  return (
    <Box display="flex" flexDirection={"column"}>
      <Box>Transaction has been sent to network. If valid it will appears in history soon.</Box>
      <Box mt={2}>
        ID <Hex value={txId} />
      </Box>

      <Box mt={2}>
        <Button
          onClick={handleCloseClick}
          variant="contained"
          color={'secondary'}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default FinalStep;
