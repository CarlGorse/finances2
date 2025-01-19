import AddEdit from './AddEdit';
import { addEditTransactionAtom } from 'common/recoil/atoms/AddEditTransactionAtom';
import { apiBaseUrl } from 'common/consts/ApiConsts';
import axios from 'axios';
import { lastTransactionsLoadDateAtom } from 'common/recoil/atoms/LastTransactionsLoadDateAtom';
import { useSetRecoilState } from 'recoil';
import { useEffect, useRecoilState } from 'react'
import { userMessageAtom } from 'common/recoil/atoms/UserMessageAtom';

function Edit({ handleClose }) {

    const setLastTransactionsLoadDate = useSetRecoilState(lastTransactionsLoadDateAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);
    const [addEditTransaction, setAddEditTransaction] = useRecoilState(addEditTransactionAtom);

    useEffect(() => {

        if (!addEditTransaction) {
            return;
        }

        axios.post(
            apiBaseUrl + "/transactions/edit",
            addEditTransaction, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function () {
                setAddEditTransaction(null); // stops duplicate posts?
                setLastTransactionsLoadDate(new Date());
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
    }, [setAddEditTransaction])

    return (
        <AddEdit handleClose={() => handleClose} />
    );
}

export default Edit;