import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { Badge } from 'react-bootstrap';

function TransactionBadge({ badgeLabel, badgeColour, isBadgeApplicable, popoverBody }) {

    if (!isBadgeApplicable) {
        return;
    }

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