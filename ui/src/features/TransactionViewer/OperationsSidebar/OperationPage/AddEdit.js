import { addEditTransactionState } from 'recoil/atoms/AddEditTransactionAtom';
import { apiBaseUrl } from 'consts/ApiConsts';
import { getDateAsYYYYMMDD } from 'functions/DateFunctions'
import { reloadTransactionsState } from 'recoil/atoms/ReloadTransactionsAtom';
import { selectedBankAccountState } from 'recoil/atoms/SelectedBankAccountAtom';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsAtom';
import { stringToCurrency } from 'functions/CurrencyFunctions';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationState';
import { userMessageState } from 'recoil/atoms/UserMessageAtom';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import axios from 'axios'
import Category from './AddEdit/Category'
import EffDate from './AddEdit/EffDate'
import Credit from './AddEdit/Credit'
import Debit from './AddEdit/Debit'
import Description from './AddEdit/Description'
import IsWage from './AddEdit/IsWage'
import Item from './AddEdit/Item'
import SaveAndCancelButtons from './SaveAndCancelButtons';

function AddEdit({ apiMethod, handleClose }) {

    const selectedBankAccount = useRecoilValue(selectedBankAccountState);
    const setReloadTransactions = useSetRecoilState(reloadTransactionsState);
    const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsState);
    const setUserMessage = useSetRecoilState(userMessageState);
    const transactionOperation = useRecoilValue(transactionOperationState);

    if (transactionOperation == null) {
        return null;
    }

    if (selectedTransactions == null || selectedTransactions.length === 0) {
        return null;
    }

    const markup = () => {
        switch (transactionOperation) {
            case "Add":
                return <>
                    <EffDate />
                    <Category />
                    <Debit />
                    <Credit />
                    <Description />
                    <Item />
                    <IsWage />
                </>
            case "Edit":

                let transaction = selectedTransactions[0];

                return <>
                    <EffDate defaultValue={transaction.EffDate} />
                    <Category defaultValue={transaction.CategoryId} />
                    <Debit defaultValue={transaction.Debit} />
                    <Credit defaultValue={transaction.Credit} />
                    <Description defaultValue={transaction.Description} />
                    <Item defaultValue={transaction.Item} />
                    <IsWage defaultValue={transaction.IsWage} />
                </>;
            default:
                return null
        }
    }

    return (
        <>
            {markup()}

            <SaveAndCancelButtons save={() => Save()} handleClose={handleClose} saveButtonEnabled={true} />
        </>
    );

    function Save() {

        let effDate = getDateAsYYYYMMDD(document.getElementById("addEdit_EffDate").value);

        let transaction = {
            AccountId: selectedBankAccount.AccountId,
            CategoryId: document.getElementById("addEdit_CategoryId").value,
            Credit: stringToCurrency(document.getElementById("addEdit_Credit").value),
            Debit: stringToCurrency(document.getElementById("addEdit_Debit").value),
            Description: document.getElementById("addEdit_Description").value,
            EffDate: effDate,
            IsWage: document.getElementById("addEdit_IsWage").checked,
            Item: document.getElementById("addEdit_Item").value,
            TransactionId: 0
        };

        if (apiMethod === "edit") {
            transaction.TransactionId = selectedTransactions[0].Id;
        }

        axios.post(
            apiBaseUrl + "/transactions/" + apiMethod,
            transaction,
            {
                "Content-Type": "application/json"
            }
        )
            .then(function (response) {
                onSuccesfulRequest(response);
            })
            .catch(function (error) {
                setUserMessage({
                    Message: error.response.data.validationErrors[0],
                    Variant: "danger"
                })
            })
    }

    function onSuccesfulRequest(response) {
        //setAddEditTransaction(response.data.transaction);
        setReloadTransactions(new Date());
        setSelectedTransactions([response.data.transaction]);
        setUserMessage({
            Message: "Transaction saved.",
            Variant: "success"
        })
        //handleClose();
    }
}

export default AddEdit;