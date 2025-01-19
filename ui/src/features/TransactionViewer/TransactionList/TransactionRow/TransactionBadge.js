import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { transactionBadgeToShowState } from './TransactionBadgeToShowAtom';
import { useRecoilState } from 'recoil';

function TransactionBadge({ transaction, badgeType, badgeLabel, badgeColour, isBadgeApplicable, popoverBody }) {

    const [transactionBadgeToShow, setTransactionBadgeToShow] = useRecoilState(transactionBadgeToShowState);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                {popoverBody}
            </Popover.Body>
        </Popover>
    );

    let badge;

    if (isBadgeApplicable) {
        badge =
            <span style={{ paddingRight: "2px" }}>
                <OverlayTrigger trigger="click" placement="right"// overlay={popover}
                    show={
                        transactionBadgeToShow?.Type === badgeType &&
                        transactionBadgeToShow?.TransactionId === transaction.TransactionId
                    }
                >

                    <Badge pill bg={badgeColour}>{badgeLabel}</Badge>
                </OverlayTrigger>
            </span>
    }

    return (badge);
}

export default TransactionBadge;