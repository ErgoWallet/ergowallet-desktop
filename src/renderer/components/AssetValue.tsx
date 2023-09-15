import * as React from 'react';
import {Box} from "@mui/material";
import {MoneyUnits} from "../../common/MoneyUnits";

interface AssetValueProps {
  amount: string;
  decimals: number;
  symbol?: string;
}

export default function AssetValue(props: AssetValueProps): React.ReactElement {
  const { amount, decimals, symbol } = props;
  const tokens = new MoneyUnits(amount, decimals).toMainUnits();
  return (
    <Box component="div">
      {tokens} {symbol}
    </Box>
  );
}
