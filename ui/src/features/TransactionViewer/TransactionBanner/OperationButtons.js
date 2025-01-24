import { GetOperationProperties } from 'functions/OperationFunctions';
import OperationButton from '../OperationButton';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsAtom';
import { useRecoilValue } from 'recoil';

function OperationButtons({ onClick }) {

    const selectedTransactions = useRecoilValue(selectedTransactionsState);

    let deleteOperation;
    let addOperation;
    let editOperation;
    let moveWagesOperation;

    addOperation = GetOperationProperties("add", selectedTransactions);
    editOperation = GetOperationProperties("edit", selectedTransactions);
    deleteOperation = GetOperationProperties("delete", selectedTransactions);
    moveWagesOperation = GetOperationProperties("move-wages", selectedTransactions);

    return (
        <>
            <span style={{ marginLeft: "20px" }}>
                <OperationButton
                    operation={addOperation}
                    onClick={onClick}
                />
            </span>

            <span style={{ marginLeft: "1px" }}>
                <OperationButton
                    operation={editOperation}
                    onClick={onClick}
                />
            </span >

            <span style={{ marginLeft: "1px" }}>
                <OperationButton
                    operation={deleteOperation}
                    onClick={onClick}
                />
            </span >

            <span style={{ marginLeft: "1px" }}>
                <OperationButton
                    operation={moveWagesOperation}
                    onClick={onClick}
                />
            </span >
        </ >
    );
}

export default OperationButtons;
