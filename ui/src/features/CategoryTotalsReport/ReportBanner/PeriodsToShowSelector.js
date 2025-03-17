import { range } from "functions/ArrayFunctions";

import NumberSelector from "components/NumberSelector";

export default function PeriodsToShowSelector({ onSelect }) {
  return (
    <div className="d-flex col-5">
      <div className="d-flex col-3">Periods to show:</div>
      <div className="d-flex col-1">
        <NumberSelector
          defaultValue={6}
          onSelect={(selectedValue) => onSelect(selectedValue)}
          values={range(1, 6)}
          startPadding={1}
        />
      </div>
    </div>
  );
}
