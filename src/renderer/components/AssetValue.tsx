import * as React from 'react';
import {MoneyUnits} from "../../common/MoneyUnits";
import {Box} from "@material-ui/core";

interface AssetValueProps {
  amount: string;
  decimals: number;
  symbol?: string;
}

export default function AssetValue(props: AssetValueProps): React.ReactElement {
  const { amount, decimals, symbol } = props;
  const tokens = new MoneyUnits(amount, decimals).toMainUnits();
  return (
    <Box component={'div'}>
      {tokens} {symbol}
    </Box>
  );
}
