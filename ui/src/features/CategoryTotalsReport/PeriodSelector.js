import { periods } from 'common/consts/YearAndPeriodConsts'
import { useRecoilValue } from 'recoil';
import { yearAndPeriodSearchAtom } from 'common/recoil/atoms/YearAndPeriodSearchAtom';
import YearAndPeriodSelect from 'common/components/YearAndPeriodSelect'

function StartPeriodSelector({ onSelect }) {

  const selectedYearAndPeriod = useRecoilValue(yearAndPeriodSearchAtom);

  return (
    <YearAndPeriodSelect
      defaultValue={selectedYearAndPeriod.StartPeriod}
      onSelect={onSelect}
      values={periods} />
  );
}

export default StartPeriodSelector;