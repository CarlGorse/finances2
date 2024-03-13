import AddEdit from './AddEdit';
import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { transactionOperationErrorAtom } from 'recoil/atoms/TransactionOperationErrorAtom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { baseUrl as apiBaseUrl } from 'functions/api.js';
import { transactionSearchAtom } from 'recoil/atoms/TransactionSearchAtom';

function Add() {

    const operation = "Add";

    const addEditTransaction = useRecoilValue(addEditTransactionAtom);
    const setError = useSetRecoilState(transactionOperationErrorAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);
    const transactionSearch = useRecoilValue(transactionSearchAtom);

    const isValidForm = transactionOperation === operation

    useEffect(() => {
        if (isValidForm) {
            setError({
                Message: "",
                Variant: ""
            })
        }
    }, [isValidForm, setError]);

    if (!isValidForm) {
        return null
    }

    function Save() {
        axios.post(
            apiBaseUrl + "/transactions/add",
            {
                AccountId: transactionSearch.AccountId,
                CategoryId: addEditTransaction.CategoryId,
                Description: addEditTransaction.Description,
                EffDate: addEditTransaction.EffDate,
                Item: addEditTransaction.Item
            }
        )
            .then(function (response) { CancelTransactionOperation() })
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
            <AddEdit />

            <div style={{ marginTop: "20px" }}>
                <Button size="sm" onClick={() => Save()}>Save</Button>
                <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
            </div>
        </>
    );
}

export default Add;