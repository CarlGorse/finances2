import TransactionBanner from "./TransactionBanner/TransactionBanner";
import TransactionList from "./TransactionList/TransactionList";
import { getValidOperations } from "./Utilities";
import axios from "axios";
import { sortCategories } from "functions/CategoryFunctions";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bankAccountsState } from "recoil/atoms/BankAccountsState";
import { categoriesState } from "recoil/atoms/CategoriesState";
import { selectedBankAccountState } from "recoil/atoms/SelectedBankAccountState";
import { selectedTransactionsState } from "recoil/atoms/SelectedTransactionsState";
import { transactionOperationState } from "recoil/atoms/TransactionOperationState";
import { userMessageState } from "recoil/atoms/UserMessageState";
import { validTransactionOperationsState } from "recoil/atoms/ValidTransactionOperationsState";
import BankAccount from "types/BankAccount";

export default function TransactionViewer() {
  const selectedTransactions = useRecoilValue(selectedTransactionsState);
  const transactionOperation = useRecoilValue(transactionOperationState);

  const setBankAccounts = useSetRecoilState<BankAccount[]>(bankAccountsState);
  const setCategories = useSetRecoilState(categoriesState);
  const setSelectedBankAccount = useSetRecoilState<BankAccount>(
    selectedBankAccountState,
  );
  const setUserMessage = useSetRecoilState(userMessageState);
  const setTransactionOperation = useSetRecoilState(transactionOperationState);
  const setValidTransactionOperations = useSetRecoilState(
    validTransactionOperationsState,
  );

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/categories/get")
      .then(function (response) {
        let sortedCategories = sortCategories([...response.data]);
        setCategories(sortedCategories);
      });
  }, []);

  useEffect(() => {
    let validOperations = getValidOperations(selectedTransactions);
    setValidTransactionOperations(validOperations);

    if (!validOperations.includes(transactionOperation)) {
      setTransactionOperation(null);
    }
  }, [selectedTransactions]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/bankAccounts/get")
      .then((response) => {
        let bankAccounts = response.data.Accounts;
        setBankAccounts(bankAccounts);

        const bankAccountId_Natwest = 7;
        let bankAccount = bankAccounts.find(
          (bankAccount) => bankAccount.AccountId === bankAccountId_Natwest,
        );
        setSelectedBankAccount(bankAccount);
      })
      .catch((response) => {
        setUserMessage({
          Message: "Unable to load bank accounts",
          Variant: "danger",
        });
      });
  }, []);

  return (
    <>
      <Container>
        <div
          style={{
            position: "sticky",
            top: "3em",
            backgroundColor: "white",
            zIndex: "1",
          }}
        >
          <TransactionBanner />
        </div>

        <div className="mt-3">
          <TransactionList />
        </div>
      </Container>
    </>
  );
}
