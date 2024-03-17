import AddEdit from './AddEdit';
import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { categoriesAtom } from 'recoil/atoms/CategoriesAtom';
import { formatDateTimeAsDateDDMMYYYY } from 'functions/DateTime'
import { refreshTransactionsAtom } from "recoil/atoms/RefreshTransactionsAtom";
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { systemErrorAtom } from 'recoil/atoms/SystemErrorAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react'

function Edit() {

    const categories = useRecoilValue(categoriesAtom);
    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const setAddEditTransaction = useSetRecoilState(addEditTransactionAtom);
    const setRefreshTransactions = useSetRecoilState(refreshTransactionsAtom);
    const transactionToEdit = useRecoilValue(addEditTransactionAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const showForm = transactionOperation === "Edit"
    const hasValidTransactionSelected = selectedTransactions?.length === 1
    const setSystemError = useSetRecoilState(systemErrorAtom);

    useEffect(() => {
        if (showForm) {
            if (!hasValidTransactionSelected) {
                setSystemError({ Message: `You must select a ${selectedTransactions?.length > 0 ? " single " : ""}transaction`, Variant: "warning" });
            }
            else {
                setSystemError(null);
            }
        }
    })

    useEffect(() => {
        if (showForm && hasValidTransactionSelected) {

            const selectedTransaction = selectedTransactions[0];
            console.log(99);
            console.log(selectedTransaction);
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
    }, [categories, setAddEditTransaction])

    if (!showForm || !hasValidTransactionSelected) {
        return null
    }

    function Edit() {
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
            .then(async function (response) {
                setRefreshTransactions(true);
                setSystemError({
                    Message: `Transaction saved: Account: ${response.data.Account.Name}, Category: ${response.data.Category.Name}, EffDate: ${formatDateTimeAsDateDDMMYYYY(response.data.EffDate)}`,
                    Variant: "success"
                })
                CancelTransactionOperation()

            })
            .catch(function (error) {
                setSystemError({
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
            <AddEdit transactionOperation={transactionOperation} />

            <div style={{ marginTop: "20px" }}>
                <Button size="sm" onClick={() => Edit()}>Save</Button>
                <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
            </div>
        </ >
    );
}

export default Edit;