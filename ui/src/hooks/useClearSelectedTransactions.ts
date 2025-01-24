import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsState';
import Transaction from 'types/Transaction'
import { useSetRecoilState } from 'recoil';

const useClearSelectedTransactions = () => {

    const setSelectedTransactions = useSetRecoilState<Transaction[]>(selectedTransactionsState);

    const setClear = () => setSelectedTransactions(null);

    return (
        setClear
    );

}

export default useClearSelectedTransactions;