import AddEdit from './AddEdit';
import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { transactionSearchAtom } from 'recoil/atoms/TransactionSearchAtom';
import { formatDateTimeAsDateDDMMYYYY } from 'functions/DateTime'
import { useSetError } from "hooks/useSetError";
import { useClearError } from "hooks/useClearError";

function Add() {

    const operation = "Add";

    const addEditTransaction = useRecoilValue(addEditTransactionAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);
    const transactionSearch = useRecoilValue(transactionSearchAtom);

    const [error, setError] = useState(null);

    const showForm = transactionOperation === operation

    useClearError(!showForm);
    useSetError(error?.Message, error?.Variant, showForm && error?.Message);

    if (!showForm) {
        return null
    }

    function Save() {
        axios.post(
            apiBaseUrl + "/transactions/add",
            {
                AccountId: transactionSearch.AccountId,
                CategoryId: addEditTransaction.CategoryId,
                Credit: addEditTransaction.Credit,
                Debit: addEditTransaction.Debit,
                Description: addEditTransaction.Description,
                EffDate: addEditTransaction.EffDate,
                Item: addEditTransaction.Item
            }
        )
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
        setError(null);
        setTransactionOperation(null)
    }

    return (
        <>
            <AddEdit />

            <div style={{ marginTop: "20px" }}>
                <Button size="sm" onClick={() => Save()}>Save</Button>
                <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
            </div>
        </>
    );
}

export default Add;