import Popover from 'react-bootstrap/Popover';
import TransactionBadge from './TransactionBadge';

function DescriptionBadge({ transaction }) {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <p>Description: {transaction.Description}</p>
            </Popover.Body>
        </Popover>
    );

    return <TransactionBadge
        transaction={transaction}
        badgeType="description"
        badgeLabel="desc"
        badgeColour="info"
        isBadgeApplicable={transaction.Description}
        popoverBody={popover}
    />

}

export default DescriptionBadge;