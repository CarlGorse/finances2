import AddEdit from './Shared/AddEdit';
import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { lastTransactionsLoadDateAtom } from "recoil/atoms/LastTransactionsLoadDateAtom";
import SaveAndCancelButtons from './Shared/SaveAndCancelButtons';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react'
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';

function Edit() {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const setAddEditTransaction = useSetRecoilState(addEditTransactionAtom);
    const setLastTransactionsLoadDate = useSetRecoilState(lastTransactionsLoadDateAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);
    const transactionToEdit = useRecoilValue(addEditTransactionAtom);
    const transactionOperation = useRecoilValue(transactionOperationAtom);

    const showForm = transactionOperation === "Edit"
    const hasValidSelection = selectedTransactions?.length === 1

    useEffect(() => {
        if (showForm) {
            if (!hasValidSelection) {
                setUserMessage({ Message: `You must select a ${selectedTransactions?.length > 0 ? " single " : ""}transaction`, Variant: "warning" });
            }
            else {
                setUserMessage(null);

                const selectedTransaction = selectedTransactions[0];

                setAddEditTransaction({
                    AccountId: selectedTransaction.AccountId,
                    CategoryId: selectedTransaction.CategoryId,
                    Credit: selectedTransaction.Credit,
                    Debit: selectedTransaction.Debit,
                    Description: selectedTransaction.Description,
                    EffDate: selectedTransaction.EffDate,
                    IsWage: selectedTransaction.IsWage,
                    Item: selectedTransaction.Item,
                    TransactionId: selectedTransaction.TransactionId
                });
            }
        }
    }, [hasValidSelection, selectedTransactions, setUserMessage, showForm, setAddEditTransaction])

    if (!showForm || !hasValidSelection) {
        return null
    }

    function Save() {
        axios.post(
            apiBaseUrl + "/transactions/edit",
            {
                AccountId: transactionToEdit.AccountId,
                CategoryId: transactionToEdit.CategoryId,
                Credit: transactionToEdit.Credit,
                Debit: transactionToEdit.Debit,
                Description: transactionToEdit.Description,
                EffDate: transactionToEdit.EffDate,
                IsWage: transactionToEdit.IsWage,
                Item: transactionToEdit.Item,
                TransactionId: transactionToEdit.TransactionId
            }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function () {
                setLastTransactionsLoadDate(new Date()); 
                setUserMessage({
                    Message: "Transaction saved.",
                    Variant: "success"
                })
                //CancelTransactionOperation()
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
            <AddEdit transactionOperation={transactionOperation} />

            <SaveAndCancelButtons save={() => Save()} />

        </ >
    );
}

export default Edit;