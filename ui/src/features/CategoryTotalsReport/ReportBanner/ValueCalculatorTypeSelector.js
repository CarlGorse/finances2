import { Form } from "react-bootstrap";

export default function ValueCalculatorTypeSelector({ onSelect }) {
  let options = [
    { value: 0, label: "Total" },
    { value: 1, label: "Credit" },
    { value: 2, label: "Debit" },
  ];

  return (
    <div className="d-flex col-5">
      <div className="d-flex col-3">Value type:</div>
      <div className="d-flex col-2">
        <Form.Select
          defaultValue={0}
          onChange={(e) => onSelect(e.target.value)}
        >
          {options?.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
}
