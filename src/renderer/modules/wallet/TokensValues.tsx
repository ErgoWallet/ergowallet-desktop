import {Box, Chip} from "@mui/material";
import AssetValue from "../../components/AssetValue";
import * as React from "react";

/**
 * Displays values of tokens in a Box
 */
const TokensValues = (props: {assets: any}) => {
  const {assets} = props;
  if (!assets)
    return null;
  if (assets.length <= 0)
    return null;
  return (
    <Box marginRight={1}>
      {
        assets.map((token: {tokenId: string; amount: any}) => (
          <Chip
            key={token.tokenId}
            label={(
              <AssetValue amount={token.amount} decimals={0} symbol={token.tokenId.substring(0, 3) + '...'}/>)}
            variant="outlined"
          />))
      }
    </Box>
  );
};

export default TokensValues;