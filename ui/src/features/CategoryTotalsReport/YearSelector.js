import { useRecoilValue } from 'recoil';
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchAtom';
import YearAndPeriodSelect from 'components/YearAndPeriodSelect'
import { years } from 'consts/YearAndPeriodConsts'

function StartPeriodSelector({ onSelect }) {

  const selectedYearAndPeriod = useRecoilValue(yearAndPeriodSearchState);

  return (
    <YearAndPeriodSelect
      defaultValue={selectedYearAndPeriod.StartYear}
      onSelect={onSelect}
      values={years}
    />
  );
}

export default StartPeriodSelector;