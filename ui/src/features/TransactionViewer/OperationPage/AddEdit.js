import { addEditTransactionState } from 'recoil/atoms/AddEditTransactionAtom';
import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios'
import { reloadTransactionsState } from 'recoil/atoms/ReloadTransactionsAtom';
import SaveAndCancelButtons from './SaveAndCancelButtons';
import { selectedBankAccountState } from 'recoil/atoms/SelectedBankAccountAtom';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsAtom';
import { stringToCurrency } from 'functions/CurrencyFunctions';
import { userMessageState } from 'recoil/atoms/UserMessageAtom';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import EffDate from './AddEdit/EffDate'
import Item from './AddEdit/Item'
import Credit from './AddEdit/Credit'
import Debit from './AddEdit/Debit'
import IsWage from './AddEdit/IsWage'
import Description from './AddEdit/Description'
import Category from './AddEdit/Category'
import { getDateAsYYYYMMDD } from 'functions/DateFunctions'

function AddEdit({ apiMethod, handleClose }) {

    const selectedBankAccount = useRecoilValue(selectedBankAccountState);
    const setAddEditTransaction = useSetRecoilState(addEditTransactionState);
    const setReloadTransactions = useSetRecoilState(reloadTransactionsState);
    const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsState);
    const setUserMessage = useSetRecoilState(userMessageState);

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
            transaction, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                setAddEditTransaction(transaction);
                setReloadTransactions(new Date());
                setSelectedTransactions([response.data.transaction]);
                setUserMessage({
                    Message: "Transaction saved.",
                    Variant: "success"
                })
                //handleClose();
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
            <EffDate />
            <Category />
            <Debit />
            <Credit />
            <Description />
            <Item />
            <IsWage />

            <SaveAndCancelButtons save={() => Save()} handleClose={handleClose} saveButtonEnabled={true} />
        </>
    );
}

export default AddEdit;