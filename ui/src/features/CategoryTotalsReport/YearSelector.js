import { useRecoilValue } from 'recoil';
import { yearAndPeriodSearchAtom } from 'common/recoil/atoms/YearAndPeriodSearchAtom';
import YearAndPeriodSelect from 'common/components/YearAndPeriodSelect'
import { years } from 'common/consts/YearAndPeriodConsts'

function StartPeriodSelector({ onSelect }) {

  const selectedYearAndPeriod = useRecoilValue(yearAndPeriodSearchAtom);

  return (
    <YearAndPeriodSelect
      defaultValue={selectedYearAndPeriod.StartYear}
      onSelect={onSelect}
      values={years}
    />
  );
}

export default StartPeriodSelector;