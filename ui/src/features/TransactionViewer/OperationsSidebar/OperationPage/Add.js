import axios from "axios";
import { getValidOperations } from "features/TransactionViewer/Utilities";
import { stringToCurrency } from "functions/CurrencyFunctions";
import { getDateAsYYYYMMDD } from "functions/DateFunctions";
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { dateToLoadTransactionsState } from "recoil/atoms/DateToLoadTransactionsState";
import { selectedBankAccountState } from "recoil/atoms/SelectedBankAccountState";
import { selectedTransactionsState } from "recoil/atoms/SelectedTransactionsState";
import { transactionOperationState } from "recoil/atoms/TransactionOperationState";
import { userMessageState } from "recoil/atoms/UserMessageState";
import { isValid } from "utilities/TransactionValidator";
import Category from "./AddEdit/Category";
import Credit from "./AddEdit/Credit";
import Debit from "./AddEdit/Debit";
import Description from "./AddEdit/Description";
import EffDate from "./AddEdit/EffDate";
import IsWage from "./AddEdit/IsWage";
import Item from "./AddEdit/Item";
import SaveAndCancelButtons from "./SaveAndCancelButtons.tsx";

export default function Add({ handleClose }) {

  const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsState);
  const selectedBankAccount = useRecoilValue(selectedBankAccountState);
  const transactionOperation = useRecoilValue(transactionOperationState);
  const setDateToLoadTransactions = useSetRecoilState(dateToLoadTransactionsState);
  const setUserMessage = useSetRecoilState(userMessageState);
  const [isSaving, setIsSaving] = useState(false);

  let validOperations = getValidOperations(selectedTransactions);

  if (!validOperations.includes(transactionOperation)) {
    return;
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

      <SaveAndCancelButtons
        save={() => Save()}
        handleClose={handleClose}
        saveButtonEnabled={true}
        isSaving={isSaving}
      />
    </>
  );

  function Save() {
    let effDate = getDateAsYYYYMMDD(
      document.getElementById("addEdit_EffDate").value,
    );

    let transaction = {
      AccountId: selectedBankAccount.AccountId,
      CategoryId: document.getElementById("addEdit_CategoryId").value,
      Credit: stringToCurrency(document.getElementById("addEdit_Credit").value),
      Debit: stringToCurrency(document.getElementById("addEdit_Debit").value),
      Description: document.getElementById("addEdit_Description").value,
      EffDate: effDate,
      IsWage: document.getElementById("addEdit_IsWage").checked,
      Item: document.getElementById("addEdit_Item").value,
      TransactionId: 0,
    };

    var validationResult = isValid(transaction);

    if (!validationResult.IsValid) {
      setUserMessage({
        Message: validationResult.Errors[0],
        Variant: "danger",
      });
      return;
    }

    setIsSaving(true);

    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/transactions/Add",
        transaction,
        {
          "Content-Type": "application/json",
        },
      )
      .then((response) => {
        setSelectedTransactions([response.data.transaction]);
        setDateToLoadTransactions(new Date());
        setUserMessage({
          Message: "Transaction saved.",
          Variant: "success",
        });
        setIsSaving(false);
      })
      .catch(function (error) {
        setUserMessage({
          Message: error.response.data.validationErrors[0],
          Variant: "danger",
        });
        setIsSaving(false);
      });
  }
}