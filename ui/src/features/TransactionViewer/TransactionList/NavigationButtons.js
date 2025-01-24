import MiddleRangeButton from './NavigationButtons/MiddleRangeButton';
import NextPageButton from './NavigationButtons/NextPageButton';
import Pagination from 'react-bootstrap/Pagination';
import PageNumberButton from './NavigationButtons/PageNumberButton';
import PrevPageButton from './NavigationButtons/PrevPageButton';

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
        onClick={() => onClick(prevPageNo => Math.max(prevPageNo - 1, 0))}
      />);
  }

  const showMiddleRangeButton = pageCount > maxPageNoButtons;

  if (!showMiddleRangeButton) {

    for (let ctr = 1; ctr <= Math.min(pageCount, maxPageNoButtons); ctr++) {
      buttons.push(<PageNumberButton label={ctr} pageNo={pageNo} onClick={onClick} />);
    }

  }
  else {

    let lastPageNoButtonPreMiddleRange = Math.min(pageCount, maxPageNoButtonsPreMiddleRangeButton);

    for (let ctr = 1; ctr <= lastPageNoButtonPreMiddleRange; ctr++) {
      buttons.push(<PageNumberButton label={ctr} pageNo={pageNo} onClick={onClick} />);
    }

    const firstPageNoAfterMiddleRange = pageCount - maxPageNoButtonsPostMiddleRangeButton + 1;
    const isMiddleRangeButtonActive = pageNo > lastPageNoButtonPreMiddleRange && pageNo < firstPageNoAfterMiddleRange;

    buttons.push(
      <MiddleRangeButton pageNo={pageNo} isActive={isMiddleRangeButtonActive} />
    );

    for (let ctr = firstPageNoAfterMiddleRange; ctr <= pageCount; ctr++) {
      buttons.push(<PageNumberButton label={ctr} pageNo={pageNo} onClick={onClick} />);
    }
  }

  if (pageCount > 1) {
    buttons.push(<NextPageButton
      pageNo={pageNo}
      pageCount={pageCount}
      onClick={() => onClick(prevValue => {
        return Math.min(prevValue + 1, pageCount)
      })}
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