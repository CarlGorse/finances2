import PeriodSelector from 'components/PeriodSelector'

import { useRecoilValue } from 'recoil';
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchState';

function StartPeriodSelector({ onSelect }) {

  const selectedYearAndPeriod = useRecoilValue(yearAndPeriodSearchState);

  return (
    <PeriodSelector
      defaultValue={selectedYearAndPeriod.StartPeriod}
      onSelect={onSelect}
    />
  );
}

export default StartPeriodSelector;