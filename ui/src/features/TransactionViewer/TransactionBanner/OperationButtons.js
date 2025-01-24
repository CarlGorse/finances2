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
                    isEnabled={true}
                />
            </span>

            <span style={{ marginLeft: "1px" }}>
                <OperationButton
                    description="Edit"
                    isEnabled={selectedTransactions?.length === 1}
                />
            </span >

            <span style={{ marginLeft: "1px" }}>
                <OperationButton
                    description="Delete"
                    isEnabled={selectedTransactions?.length >= 1}
                />
            </span >

            <span style={{ marginLeft: "1px" }}>
                <OperationButton
                    description="Move wages"
                    isEnabled={selectedTransactions?.length === 2
                        && selectedTransactions.filter(x => x.IsWage === true).length === 2
                        && selectedTransactions[0].EffDate === selectedTransactions[1].EffDate}
                />
            </span >
        </ >
    );
}

export default OperationButtons;
