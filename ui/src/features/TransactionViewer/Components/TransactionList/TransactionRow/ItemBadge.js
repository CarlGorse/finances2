import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { transactionBadgeToShowAtom } from 'recoil/atoms/TransactionBadgeToShowAtom';
import { useRecoilState } from "recoil";

function ItemBadge({ transaction }) {

    const [transactionBadgeToShow, setTransactionBadgeToShow] = useRecoilState(transactionBadgeToShowAtom);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <p>Item: {transaction.Item}</p>
            </Popover.Body>
        </Popover>
    );

    let badge;

    if (transaction.Item) {
        badge =
            <OverlayTrigger trigger="click" placement="right" overlay={popover}
                show={
                    transactionBadgeToShow?.Type === 'item' &&
                    transactionBadgeToShow?.TransactionId === transaction.TransactionId
                }
                onToggle={(nextShow) => {
                    if (nextShow) {
                        setTransactionBadgeToShow({
                            Type: 'item',
                            TransactionId: transaction.TransactionId
                        })
                    }
                    else {
                        setTransactionBadgeToShow(null)
                    }
                }
                }>

                <Badge pill bg="info">i</Badge>
            </OverlayTrigger>
    }

    return (badge);
}

export default ItemBadge;