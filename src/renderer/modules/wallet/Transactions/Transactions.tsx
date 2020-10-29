import * as React from 'react';
import TxDetailsDialog from './TxDetailsDialog';
import TransactionList from "./TransactionList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/root-reducer";
import {fetchTransactions} from "../wallet-slice";

function Transactions(): React.ReactElement {
  const dispatch = useDispatch();
  const wallet = useSelector((state: RootState) => state.wallet);
  const [detailsTx, setDetailsTx] = React.useState(null);
  const txs = wallet.transactions;

  React.useEffect(() => {
    dispatch(fetchTransactions());
  }, []);


  function handleDetailsClose(): void {
    setDetailsTx(null);
  }

  return (
    <React.Fragment>
      <TransactionList txs={txs} onShowDetails={setDetailsTx}/>
      {/* Details dialog for selected transaction */}
      {
        detailsTx && (
          <TxDetailsDialog
            open={true}
            tx={detailsTx}
            onClose={handleDetailsClose}
          />
        )
      }
    </React.Fragment>
  );
}

export default Transactions;
