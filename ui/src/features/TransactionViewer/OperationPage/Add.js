import AddEdit from './AddEdit';
import { addEditTransactionAtom } from 'common/recoil/atoms/AddEditTransactionAtom';
import { apiBaseUrl } from 'common/consts/ApiConsts';
import axios from 'axios';
import { lastTransactionsLoadDateAtom } from 'common/recoil/atoms/LastTransactionsLoadDateAtom';
import SaveAndCancelButtons from './SaveAndCancelButtons';
import { selectedTransactionsAtom } from 'common/recoil/atoms/SelectedTransactionsAtom';
import { selectedBankAccountAtom } from 'common/recoil/atoms/SelectedBankAccountAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userMessageAtom } from 'common/recoil/atoms/UserMessageAtom';

function Add({ handleClose }) {

    const setLastTransactionsLoadDate = useSetRecoilState(lastTransactionsLoadDateAtom);
    const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);
    const transactionToAdd = useRecoilValue(addEditTransactionAtom);
    const selectedBankAccount = useRecoilValue(selectedBankAccountAtom);

    function Save() {
        axios.post(
            apiBaseUrl + "/transactions/add",
            {
                AccountId: selectedBankAccount.AccountId,
                CategoryId: transactionToAdd.CategoryId,
                Credit: transactionToAdd.Credit ?? 0,
                Debit: transactionToAdd.Debit ?? 0,
                Description: transactionToAdd.Description,
                EffDate: transactionToAdd.EffDate,
                IsWage: transactionToAdd.IsWage ?? false,
                Item: transactionToAdd.Item
            }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                setLastTransactionsLoadDate(new Date());
                setSelectedTransactions([response.data.transaction]);
                setUserMessage({
                    Message: "Transaction saved.",
                    Variant: "success"
                })
                handleClose();
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
            <AddEdit />

            <SaveAndCancelButtons save={() => Save()} handleClose={handleClose} saveButtonEnabled={true} />
        </>
    );
}

export default Add;