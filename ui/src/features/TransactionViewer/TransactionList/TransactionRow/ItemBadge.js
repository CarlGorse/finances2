import Popover from 'react-bootstrap/Popover';
import TransactionBadge from './TransactionBadge';

function ItemBadge({ transaction }) {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <p>Item: {transaction.Item}</p>
            </Popover.Body>
        </Popover>
    );

    return <TransactionBadge
        transaction={transaction}
        badgeType="item"
        badgeLabel="item"
        badgeColour="info"
        isBadgeApplicable={transaction.Item}
        popoverBody={popover}
    />

}

export default ItemBadge;