import AddEdit from './Shared/AddEdit';
import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { lastTransactionsLoadDateAtom } from "recoil/atoms/LastTransactionsLoadDateAtom";
import SaveAndCancelButtons from './Shared/SaveAndCancelButtons';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { selectedBankAccountAtom } from 'recoil/atoms/SelectedBankAccountAtom';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';

function Add({ handleClose }) {

    const setLastTransactionsLoadDate = useSetRecoilState(lastTransactionsLoadDateAtom);
    const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);
    const transactionToAdd = useRecoilValue(addEditTransactionAtom);
    const selectedBankAccount = useRecoilValue(selectedBankAccountAtom);

    function Save() {
        axios.post(
            apiBaseUrl + "/transactions/add",
            {
                AccountId: selectedBankAccount.AccountId,
                CategoryId: transactionToAdd.CategoryId,
                Credit: transactionToAdd.Credit ?? 0,
                Debit: transactionToAdd.Debit ?? 0,
                Description: transactionToAdd.Description,
                EffDate: transactionToAdd.EffDate,
                IsWage: transactionToAdd.IsWage ?? false,
                Item: transactionToAdd.Item
            }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                setLastTransactionsLoadDate(new Date());
                setSelectedTransactions([response.data.transaction]);
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
            <AddEdit />

            <SaveAndCancelButtons save={() => Save()} handleClose={handleClose} saveButtonEnabled={true} />
        </>
    );
}

export default Add;