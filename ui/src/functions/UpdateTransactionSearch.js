import { transactionSearchAtom } from 'recoil/atoms/TransactionSearchAtom';
import { useRecoilState } from "recoil";



function UpdateTransactionSearch({ propertyName, value }) {
    const [transactionSearch, setTransactionSearch] = useRecoilState(transactionSearchAtom);
    setTransactionSearch(prevState => ({ ...prevState, [propertyName]: value }))
    return transactionSearch;
}

export default UpdateTransactionSearch;
