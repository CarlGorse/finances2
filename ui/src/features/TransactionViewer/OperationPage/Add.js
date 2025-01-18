import AddEdit from './AddEdit';
import { addEditTransactionAtom } from 'common/recoil/atoms/AddEditTransactionAtom';
import { apiBaseUrl } from 'common/consts/ApiConsts';
import axios from 'axios';
import { lastTransactionsLoadDateAtom } from 'common/recoil/atoms/LastTransactionsLoadDateAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userMessageAtom } from 'common/recoil/atoms/UserMessageAtom';

function Add({ handleClose }) {

    const setLastTransactionsLoadDate = useSetRecoilState(lastTransactionsLoadDateAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);
    const addEditTransaction = useRecoilValue(addEditTransactionAtom);

    function Save() {
        axios.post(
            apiBaseUrl + "/transactions/add",
            addEditTransaction, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                setLastTransactionsLoadDate(new Date());
                //setSelectedTransactions([response.data.transaction]);
                setUserMessage({
                    Message: "Transaction saved.",
                    Variant: "success"
                })
                handleClose();
            })
            .catch(function (error) {
                setUserMessage({
                    Message: error.response.data.validationErrors[0],
                    Variant: "danger"
                })
            })
    }

    return (
        <>
            <AddEdit save={() => Save()} handleClose={() => handleClose} />
        </>
    );
}

export default Add;