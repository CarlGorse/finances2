import AddEdit from './AddEdit';
import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { categoriesAtom } from 'recoil/atoms/CategoriesAtom';
import { formatDateTimeAsDateDDMMYYYY } from 'functions/DateTime'
import { refreshTransactionsAtom } from "recoil/atoms/RefreshTransactionsAtom";
import { systemErrorAtom } from 'recoil/atoms/SystemErrorAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { transactionSearchAtom as transactionSearchFiltersAtom } from 'recoil/atoms/TransactionSearchAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react'

function Add() {

    const categories = useRecoilValue(categoriesAtom);
    const setAddEditTransaction = useSetRecoilState(addEditTransactionAtom);
    const setRefreshTransactions = useSetRecoilState(refreshTransactionsAtom);
    const transactionToAdd = useRecoilValue(addEditTransactionAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);
    const transactionSearchFilters = useRecoilValue(transactionSearchFiltersAtom);

    const setSystemError = useSetRecoilState(systemErrorAtom);

    const showForm = transactionOperation === "Add"

    useEffect(() => {
        if (showForm) {
            setSystemError(null);
        }
    })

    useEffect(() => {
        setAddEditTransaction({
            TransactionId: null,
            EffDate: new Date(),
            AccountId: null,
            CategoryId: categories[0]?.CategoryId,
            Credit: null,
            Debit: null,
            IsWage: null,
            Exclude: null,
            Item: null,
            Description: null
        });
    }, [categories, setAddEditTransaction])

    if (!showForm) {
        return null
    }

    function Save() {
        axios.post(
            apiBaseUrl + "/transactions/add",
            {
                AccountId: transactionSearchFilters.AccountId,
                CategoryId: 1,
                Credit: transactionToAdd.Credit ?? 0,
                Debit: transactionToAdd.Debit ?? 0,
                Description: transactionToAdd.Description,
                EffDate: transactionToAdd.EffDate,
                Exclude: transactionToAdd.Exclude ?? false,
                IsWage: transactionToAdd.IsWage ?? false,
                Item: transactionToAdd.Item
            }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
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
                <Button size="sm" onClick={() => Save()}>Save</Button>
                <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
            </div>
        </>
    );
}

export default Add;