import NumberSelector from 'components/NumberSelector';
import { yearStart } from 'consts/SystemConsts';
import { range } from 'functions/ArrayFunctions';

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