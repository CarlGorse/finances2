
import OperationButtons from './OperationButtons';
import PagingButtons from './PagingButtons'
import SearchCriteria from './SearchCriteria'
import UserMessage from 'components/UserMessage'
import YearAndPeriodSearch from 'types/YearAndPeriodSearch'

import { Button, Col, Container, Row } from 'react-bootstrap';
import { showSearchSidebarState } from 'recoil/atoms/ShowSearchSidebarState';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react'
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchAtom';

export default function TransactionBanner() {

  const setShowSearchSidebar = useSetRecoilState(showSearchSidebarState);
  const setYearAndPeriodSearch = useSetRecoilState<YearAndPeriodSearch>(yearAndPeriodSearchState);

  useEffect(() => {

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    setYearAndPeriodSearch({
      StartPeriod: currentMonth,
      StartYear: currentYear,
      EndPeriod: currentMonth,
      EndYear: currentYear
    });

  }, [setYearAndPeriodSearch])

  return (
    <Container>
      <Row>

        <div className="mt-3">
          <UserMessage />
        </div>

        <SearchCriteria />

        <PagingButtons />

        <Col xs="4">

          <Button size="sm" onClick={() => setShowSearchSidebar(true)}>search</Button>

          <OperationButtons />

        </Col>

      </Row>
    </Container >
  );
}