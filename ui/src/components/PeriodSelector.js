import { range } from 'functions/ArrayFunctions'
import NumberSelector from './NumberSelector';

function PeriodSelector({ defaultValue, onSelect }) {

  return (

    <NumberSelector
      defaultValue={defaultValue}
      onSelect={onSelect}
      values={range(1, 12)}
      startPadding={2}
    />

  );
}

export default PeriodSelector;