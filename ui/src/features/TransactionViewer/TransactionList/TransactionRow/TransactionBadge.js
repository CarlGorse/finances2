import { Badge, Button, Tooltip } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { transactionBadgeToShowState } from './TransactionBadgeToShowAtom';
import { useRecoilState } from 'recoil';

function TransactionBadge({ transaction, badgeType, badgeLabel, badgeColour, isBadgeApplicable, popoverBody }) {

    const [transactionBadgeToShow, setTransactionBadgeToShow] = useRecoilState(transactionBadgeToShowState);



    if (!isBadgeApplicable) {
        return;
    }

    //
    //transactionBadgeToShow?.Type === badgeType &&
    //transactionBadgeToShow?.TransactionId === transaction.TransactionId
    return (
        <span style={{ paddingRight: "2px" }}>
            <OverlayTrigger
                delay={{ show: 0, hide: 0 }}
                placement="right"
                overlay={popoverBody}
            >
                <Badge pill bg={badgeColour}>{badgeLabel}</Badge>

            </OverlayTrigger>
        </span>
    )
}

export default TransactionBadge;