import { range } from 'functions/ArrayFunctions'
import NumberSelector from './NumberSelector';
import { yearStart } from 'consts/SystemConsts';

function YearSelector({ defaultValue, onSelect }) {

  return (

    <NumberSelector
      defaultValue={defaultValue}
      onSelect={onSelect}
      values={range(yearStart, new Date().getFullYear())}
      startPadding={4}
    />

  );
}

export default YearSelector;