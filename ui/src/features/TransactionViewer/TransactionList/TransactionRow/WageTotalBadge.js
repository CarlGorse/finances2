import { Tooltip } from 'react-bootstrap';
import TransactionBadge from './TransactionBadge';

function WageTotalBadge({ transaction }) {

    let popoverBody = <Tooltip id="button-tooltip">
        Wage total: {transaction.WageTotal}
    </Tooltip>

    return <TransactionBadge
        transaction={transaction}
        badgeType="wageTotal"
        badgeLabel="waged"
        badgeColour="secondary"
        isBadgeApplicable={transaction.IsWage}
        popoverBody={popoverBody}
    />

}

export default WageTotalBadge;