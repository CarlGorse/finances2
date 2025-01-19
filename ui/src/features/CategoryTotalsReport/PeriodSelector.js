import { useRecoilValue } from 'recoil';
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchAtom';
import PeriodSelector from 'components/PeriodSelector'

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