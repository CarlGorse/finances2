import AddEdit from './Components/AddEdit';
import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { categoriesAtom } from 'recoil/atoms/CategoriesAtom';
import { formatDateTimeAsDateDDMMYYYY } from 'functions/DateTime'
import { refreshTransactionsAtom } from "recoil/atoms/RefreshTransactionsAtom";
import SaveAndCancelButtons from './Components/SaveAndCancelButtons';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react'
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';

function Edit() {

    const categories = useRecoilValue(categoriesAtom);
    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const setAddEditTransaction = useSetRecoilState(addEditTransactionAtom);
    const setRefreshTransactions = useSetRecoilState(refreshTransactionsAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);
    const transactionToEdit = useRecoilValue(addEditTransactionAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const showForm = transactionOperation === "Edit"
    const hasValidSelection = selectedTransactions?.length === 1

    useEffect(() => {
        if (showForm) {
            if (!hasValidSelection) {
                setUserMessage({ Message: `You must select a ${selectedTransactions?.length > 0 ? " single " : ""}transaction`, Variant: "warning" });
            }
            else {
                setUserMessage(null);
            }
        }
    })

    useEffect(() => {
        if (showForm && hasValidSelection) {

            const selectedTransaction = selectedTransactions[0];

            setAddEditTransaction({
                AccountId: selectedTransaction.AccountId,
                CategoryId: selectedTransaction.CategoryId,
                Credit: selectedTransaction.Credit,
                Debit: selectedTransaction.Debit,
                Description: selectedTransaction.Description,
                EffDate: selectedTransaction.EffDate,
                Exclude: selectedTransaction.Exclude,
                IsWage: selectedTransaction.IsWage,
                Item: selectedTransaction.Item,
                TransactionId: selectedTransaction.TransactionId
            });
        }
    }, [categories, setAddEditTransaction, showForm, hasValidSelection, selectedTransactions])

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
                Exclude: transactionToEdit.Exclude,
                IsWage: transactionToEdit.IsWage,
                Item: transactionToEdit.Item,
                TransactionId: transactionToEdit.TransactionId
            }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                setRefreshTransactions(true); // to await this we'd have to know when the load finished
                setUserMessage({
                    Message: `Transaction saved: Account: ${response.data.Account.Name}, Category: ${response.data.Category.Name}, EffDate: ${formatDateTimeAsDateDDMMYYYY(response.data.EffDate)}`,
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

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <>
            <AddEdit transactionOperation={transactionOperation}
            />

            <SaveAndCancelButtons
                save={() => Save()}
                cancelTransactionOperation={() => CancelTransactionOperation()}
            />
        </ >
    );
}

export default Edit;