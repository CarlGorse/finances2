import OperationButton from './OperationButton';

import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsAtom';
import { useRecoilValue } from 'recoil';

function OperationButtons() {

    const selectedTransactions = useRecoilValue(selectedTransactionsState);

    return (
        <>
            <span style={{ marginLeft: "20px" }}>
                <OperationButton
                    description="Add"
                />
            </span>

            <span style={{ marginLeft: "1px" }}>
                <OperationButton
                    description="Edit"
                />
            </span >

            <span style={{ marginLeft: "1px" }}>
                <OperationButton
                    description="Delete"
                />
            </span >

            <span style={{ marginLeft: "1px" }}>
                <OperationButton
                    description="Move wages"
                />
            </span >
        </ >
    );
}

export default OperationButtons;
