import Category from "./AddEdit/Category";
import Credit from "./AddEdit/Credit";
import Debit from "./AddEdit/Debit";
import Description from "./AddEdit/Description";
import EffDate from "./AddEdit/EffDate";
import IsWage from "./AddEdit/IsWage";
import Item from "./AddEdit/Item";
import SaveAndCancelButtons from "./SaveAndCancelButtons";
import axios from "axios";
import { stringToCurrency } from "functions/CurrencyFunctions";
import { getDateAsYYYYMMDD } from "functions/DateFunctions";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dateToLoadTransactionsState } from "recoil/atoms/DateToLoadTransactionsState";
import { selectedBankAccountState } from "recoil/atoms/SelectedBankAccountState";
import { selectedTransactionsState } from "recoil/atoms/SelectedTransactionsState";
import { userMessageState } from "recoil/atoms/UserMessageState";
import { isValid } from "utilities/TransactionValidator";

function AddEdit({ handleClose }) {
  const selectedBankAccount = useRecoilValue(selectedBankAccountState);
  const setSelectedTransactions = useSetRecoilState(selectedTransactionsState);

  const setDateToLoadTransactions = useSetRecoilState(
    dateToLoadTransactionsState,
  );
  const setUserMessage = useSetRecoilState(userMessageState);

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

    console.log(validationResult);

    if (!validationResult.IsValid) {
      setUserMessage({
        Message: validationResult.Errors[0],
        Variant: "danger",
      });
      return;
    }

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
        onSuccesfulRequest();
      })
      .catch(function (error) {
        setUserMessage({
          Message: error.response.data.validationErrors[0],
          Variant: "danger",
        });
      });
  }

  function onSuccesfulRequest() {
    setDateToLoadTransactions(new Date());
    setUserMessage({
      Message: "Transaction saved.",
      Variant: "success",
    });
  }
}

export default AddEdit;
