import { useRecoilValue } from 'recoil';
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchAtom';
import YearSelector from 'components/YearSelector'

function StartPeriodSelector({ onSelect }) {

  const selectedYearAndPeriod = useRecoilValue(yearAndPeriodSearchState);

  return (
    <YearSelector
      defaultValue={selectedYearAndPeriod.StartYear}
      onSelect={onSelect}
    />
  );
}

export default StartPeriodSelector;