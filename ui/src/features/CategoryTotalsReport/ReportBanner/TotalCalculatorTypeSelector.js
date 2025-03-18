import { Form } from "react-bootstrap";

export default function TotalCalculatorTypeSelector({ onSelect }) {
  let options = [
    { value: 0, label: "Year and period" },
    { value: 1, label: "YTD" },
  ];

  return (
    <div className="d-flex col-5">
      <div className="d-flex col-3">Total type:</div>
      <div className="d-flex col-3">
        <Form.Select
          defaultValue={1}
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
