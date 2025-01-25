import MiddleRangeButton from './MiddleRangeButton';
import NextPageButton from './NextPageButton';
import Pagination from 'react-bootstrap/Pagination';
import PageNumberButton from './PageNumberButton';
import PrevPageButton from './PrevPageButton';

function NavigationButtons({ pageNo, pageCount, onClick }) {

  // doesn't seem to work for other totals, e.g. 8
  const maxPageNoButtonsPreMiddleRangeButton = 3;
  const maxPageNoButtonsPostMiddleRangeButton = 3;
  const maxPageNoButtons = maxPageNoButtonsPreMiddleRangeButton + maxPageNoButtonsPostMiddleRangeButton;

  let buttons = [];

  if (pageCount > 1) {
    buttons.push(
      <PrevPageButton
        pageNo={pageNo}
        pageCount={pageCount}
        onClick={() => onClick(Math.max(pageNo - 1, 0))}
      />);
  }

  const showMiddleRangeButton = pageCount > maxPageNoButtons;

  if (!showMiddleRangeButton) {

    for (let ctr = 1; ctr <= Math.min(pageCount, maxPageNoButtons); ctr++) {
      buttons.push(<PageNumberButton label={ctr} pageNo={pageNo} onClick={() => onClick(ctr)} />);
    }

  }
  else {

    let lastPageNoButtonPreMiddleRange = Math.min(pageCount, maxPageNoButtonsPreMiddleRangeButton);

    for (let ctr = 1; ctr <= lastPageNoButtonPreMiddleRange; ctr++) {
      buttons.push(<PageNumberButton label={ctr} pageNo={pageNo} onClick={() => onClick(ctr)} />);
    }

    const firstPageNoAfterMiddleRange = pageCount - maxPageNoButtonsPostMiddleRangeButton + 1;
    const isMiddleRangeButtonActive = pageNo > lastPageNoButtonPreMiddleRange && pageNo < firstPageNoAfterMiddleRange;

    buttons.push(
      <MiddleRangeButton pageNo={pageNo} isActive={isMiddleRangeButtonActive} />
    );

    for (let ctr = firstPageNoAfterMiddleRange; ctr <= pageCount; ctr++) {
      buttons.push(<PageNumberButton label={ctr} pageNo={pageNo} onClick={() => onClick(ctr)} />);
    }
  }

  if (pageCount > 1) {
    buttons.push(<NextPageButton
      pageNo={pageNo}
      pageCount={pageCount}
      onClick={() => onClick(Math.min(pageNo + 1, pageCount)
      )}
    />)
  };

  return (
    <Pagination size="md" >
      <span className='me-3'>Select page:</span>
      {buttons}
    </Pagination>
  )

}

export default NavigationButtons;