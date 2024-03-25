import AddEdit from './Shared/AddEdit';
import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { categoriesAtom } from 'recoil/atoms/CategoriesAtom';
import { doRefreshTransactionsAtom } from "recoil/atoms/DoRefreshTransactionsAtom";
import { formatDateTimeAsDateDDMMYYYY } from 'functions/DateTime'
import SaveAndCancelButtons from './Shared/SaveAndCancelButtons';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { transactionSearchAtom as transactionSearchFiltersAtom } from 'recoil/atoms/TransactionSearchAtom';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react'
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';

function Add() {

    const categories = useRecoilValue(categoriesAtom);
    const setAddEditTransaction = useSetRecoilState(addEditTransactionAtom);
    const setRefreshTransactions = useSetRecoilState(doRefreshTransactionsAtom);
    const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);
    const transactionToAdd = useRecoilValue(addEditTransactionAtom);
    const transactionOperation = useRecoilValue(transactionOperationAtom);
    const transactionSearchFilters = useRecoilValue(transactionSearchFiltersAtom);

    const showForm = transactionOperation === "Add"
    const hasValidSelection = true//!selectedTransactions || selectedTransactions?.length === 0

    useEffect(() => {
        if (showForm) {
            if (!hasValidSelection) {
                setUserMessage({ Message: `You must deselect all transactions.`, Variant: "warning" });
            }
            else {
                setUserMessage(null);
            }
        }
    })

    useEffect(() => {
        if (showForm) {
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
        }
    }, [categories, setAddEditTransaction, showForm])

    if (!showForm || !hasValidSelection) {
        return null
    }

    function Save() {
        axios.post(
            apiBaseUrl + "/transactions/add",
            {
                AccountId: transactionSearchFilters.AccountId,
                CategoryId: transactionToAdd.CategoryId,
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
                setRefreshTransactions(prevValue => !prevValue); // to await this we'd have to know when the load finished
                setSelectedTransactions([response.data.transaction]);
                setUserMessage({
                    Message: `Transaction saved: Account: (something)), Category: (something)), EffDate: ${formatDateTimeAsDateDDMMYYYY(response.data.transaction.EffDate)}`,
                    Variant: "success"
                })
                //CancelTransactionOperation()
            })
            .catch(function (error) {
                console.log(error)
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
        </>
    );
}

export default Add;