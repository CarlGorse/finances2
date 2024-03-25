import Popover from 'react-bootstrap/Popover';
import TransactionBadge from './TransactionBadge';

function WageTotalBadge({ transaction }) {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <p>Wage total: {transaction.WageTotal}</p>
            </Popover.Body>
        </Popover>
    );

    return <TransactionBadge
        transaction={transaction}
        badgeType="wageTotal"
        badgeLabel="wage total"
        badgeColour="secondary"
        isBadgeApplicable={transaction.IsWage}
        popoverBody={popover}
    />

}

export default WageTotalBadge;