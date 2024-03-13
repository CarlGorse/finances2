import AddEdit from './AddEdit';
import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { errorAtom } from 'recoil/atoms/ErrorAtom';
import { formatDateTimeAsDateDDMMYYYY } from 'functions/DateTime'
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { transactionSearchAtom as transactionSearchFiltersAtom } from 'recoil/atoms/TransactionSearchAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react'

function Add() {

    const transactionToAdd = useRecoilValue(addEditTransactionAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);
    const transactionSearchFilters = useRecoilValue(transactionSearchFiltersAtom);

    const setError = useSetRecoilState(errorAtom);

    const showForm = transactionOperation === "Add"

    useEffect(() => {
        if (showForm) {
            setError(null);
        }
    })

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
                Exclude: false,
                IsWage: transactionToAdd.IsWage ?? false,
                Item: transactionToAdd.Item
            })
            .then(function (response) {
                setError({
                    Message: `Transaction saved: Account: ${response.data.Account.Name}, Category: ${response.data.Category.Name}, EffDate: ${formatDateTimeAsDateDDMMYYYY(response.data.EffDate)}`,
                    Variant: "success"
                })
                CancelTransactionOperation()
            })
            .catch(function (error) {
                setError({
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