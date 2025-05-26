import { Form } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { transactionOperationState } from "recoil/atoms/TransactionOperationState";
import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import MoveWages from "./MoveWages";

export default function OperationPage({ handleClose }) {
  const transactionOperation = useRecoilValue(transactionOperationState);

  let markup;

  switch (transactionOperation) {
    case "Add":
      markup = <Add handleClose={handleClose} />;
      break;
    case "Edit":
      markup = <Edit handleClose={handleClose} />;
      break;
    case "Delete":
      markup = <Delete handleClose={handleClose} />;
      break;
    case "Move wages":
      markup = <MoveWages handleClose={handleClose} />;
      break;
    default:
  }

  return <Form>{markup}</Form>;
}
