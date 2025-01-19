import { periods } from 'consts/YearAndPeriodConsts'
import { useRecoilValue } from 'recoil';
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchAtom';
import YearAndPeriodSelect from 'components/YearAndPeriodSelect'

function StartPeriodSelector({ onSelect }) {

  const selectedYearAndPeriod = useRecoilValue(yearAndPeriodSearchState);

  return (
    <YearAndPeriodSelect
      defaultValue={selectedYearAndPeriod.StartPeriod}
      onSelect={onSelect}
      values={periods} />
  );
}

export default StartPeriodSelector;