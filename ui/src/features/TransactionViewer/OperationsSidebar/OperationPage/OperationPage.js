import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import MoveWages from "./MoveWages";
import { Form } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { transactionOperationState } from "recoil/atoms/TransactionOperationState";

export default function OperationPage() {
  const transactionOperation = useRecoilValue(transactionOperationState);

  let markup;

  switch (transactionOperation) {
    case "Add":
      markup = <Add />;
      break;
    case "Edit":
      markup = <Edit />;
      break;
    case "Delete":
      markup = <Delete />;
      break;
    case "Move wages":
      markup = <MoveWages />;
      break;
    default:
  }

  return <Form>{markup}</Form>;
}
