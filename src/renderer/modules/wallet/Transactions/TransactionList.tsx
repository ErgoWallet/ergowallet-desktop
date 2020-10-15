import * as React from 'react';
import {Box, Divider, IconButton, Typography} from "@material-ui/core";
import AssetValue from "../../../components/AssetValue";
import Hex from "../../../components/Hex";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import Tooltip from '@material-ui/core/Tooltip';

interface TxListProps {
  txs: Record<string, Array<any>>;
  onShowDetails?: any;
}

function extractTime(timestamp: number | string): string {
  const d = new Date(timestamp);
  return `${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}`;
}


function Row(props: { tx: any; onDetailsClick: (tx: any) => void }): React.ReactElement {
  const {tx, onDetailsClick} = props;

  const TxStatus = () => (tx.confirmationsCount >= 1) ?
    (
      <Tooltip title={`${tx.confirmationsCount} confirmations`}>
        <DoneIcon fontSize="small" color="primary"/>
      </Tooltip>
    ) : (
      <HourglassEmptyOutlinedIcon fontSize="small" color="secondary"/>
    );

  const handleRowClick = () => {
    console.log('Row Click');
  };

  return (
    <Box display="flex" alignItems="center" onClick={handleRowClick}>
      <Box flexBasis={0} flexGrow={1} maxWidth={"100px"} minWidth={"100px"}>
        {extractTime(Number(tx.timestamp || tx.creationTimestamp))}
      </Box>
      <Box flexBasis={0} flexGrow={1} minWidth="2em" maxWidth={"2em"}>
        <TxStatus />
      </Box>
      <Box flexBasis={0} pr={1} pl={1} flexGrow={2} display="flex" justifyContent="flex-end">
        <AssetValue amount={tx.value} decimals={9} symbol="ERG"/>
      </Box>
      <Box flexBasis={0} flexGrow={4}>
        <Hex>{tx.id}</Hex>
      </Box>
      <Box flexBasis={0} flexGrow={1} display="flex" alignItems="center" minWidth={"2em"} maxWidth={"2em"}>
        <IconButton size="small" onClick={() => onDetailsClick(tx)}>
          <MoreVertOutlinedIcon/>
        </IconButton>
      </Box>
    </Box>
  );
}


export default function TransactionList(props: TxListProps) {
  const {txs, onShowDetails} = props;

  // sort all dates
  const dates = Object.keys(txs).sort((a: string, b: string) => {
    return (new Date(b).getTime()) - (new Date(a).getTime());
  });

  function handleOnDetailsClick(tx: any): void {
    if (onShowDetails) {
      onShowDetails(tx);
    }
  }

  return (
    <Box display="flex" flexDirection="column">
      {
        dates.map((date) => (
          <React.Fragment key={date}>
            <Box display="flex" alignItems="center" mt={2}>
              <Box flexBasis={0} flexGrow={1}>
                <Typography component="div" variant="h6" color="primary" gutterBottom>
                  {date}
                </Typography>
              </Box>
            </Box>
            <Divider/>
            {txs[date]
              .slice()
              .sort((a, b) => Number(b.timestamp||b.creationTimestamp) - Number(a.timestamp||a.creationTimestamp))
              .map((tx: any) => (
              <Row
                key={tx.id}
                tx={tx}
                onDetailsClick={() => handleOnDetailsClick(tx)}
              />
            ))}
          </React.Fragment>
        ))
      }
    </Box>
  );
}
