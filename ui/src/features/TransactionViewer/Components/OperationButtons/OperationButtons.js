import { Form } from 'react-bootstrap';
import OperationButton from "./OperationButton";
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { useRecoilValue } from "recoil";

function TransactionOperationButtons() {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);

    let deleteIsEnabled = false;
    let addIsEnabled = true;
    let editIsEnabled = false;
    let moveWagesIsEnabled = false;

    if (selectedTransactions) {

        if (selectedTransactions.length === 1) {
            editIsEnabled = true;
        }

        if (selectedTransactions.length >= 1) {
            deleteIsEnabled = true;
        }

        if (selectedTransactions?.length === 2
            && selectedTransactions.filter(x => x.IsWage === true).length === 2
            && selectedTransactions[0].EffDate === selectedTransactions[1].EffDate
        ) {
            moveWagesIsEnabled = true;
        }
    }

    return (
        <Form>
            <span style={{ marginLeft: "20px" }}>
                <OperationButton operation="Add" enabled={addIsEnabled} />
            </span>
            <span style={{ marginLeft: "1px" }}>
                <OperationButton operation="Edit" enabled={editIsEnabled} />
            </span >
            <span style={{ marginLeft: "1px" }}>
                <OperationButton operation="Delete" enabled={deleteIsEnabled} />
            </span >
            <span style={{ marginLeft: "1px" }}>
                <OperationButton operation="Move wages" enabled={moveWagesIsEnabled} />
            </span >
        </Form >
    );
}

export default TransactionOperationButtons;
