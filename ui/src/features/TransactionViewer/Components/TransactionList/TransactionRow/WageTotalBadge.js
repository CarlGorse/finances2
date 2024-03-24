import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { transactionBadgeToShowAtom } from 'recoil/atoms/TransactionBadgeToShowAtom';
import { useRecoilState } from "recoil";

function WageTotalBadge({ transaction }) {

    const [transactionBadgeToShow, setTransactionBadgeToShow] = useRecoilState(transactionBadgeToShowAtom);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Info</Popover.Header>
            <Popover.Body>
                <p>Wage total: {transaction.WageTotal}</p>
            </Popover.Body>
        </Popover>
    );

    let badge;

    if (transaction.IsWage) {
        badge =
            <OverlayTrigger trigger="click" placement="right" overlay={popover}
                show={
                    transactionBadgeToShow?.Type === 'wageTotal' &&
                    transactionBadgeToShow?.TransactionId === transaction.TransactionId
                }
                onToggle={(nextShow) => {
                    if (nextShow) {
                        setTransactionBadgeToShow({
                            Type: 'wageTotal',
                            TransactionId: transaction.TransactionId
                        })
                    }
                    else {
                        setTransactionBadgeToShow(null)
                    }
                }
                }>

                <Badge pill bg="secondary">wt</Badge>
            </OverlayTrigger>
    }

    return (badge);
}

export default WageTotalBadge;