import { Button } from 'react-bootstrap'

function NavigationButtons({ pageNo, pageCount, onClick }) {

  function onClickFirst() {
    onClick(1)
  }

  function onClickPrev() {
    onClick(prevValue => Math.max(prevValue - 1, 0))
  }

  function onClickNext() {
    onClick(prevValue => {
      return Math.min(prevValue + 1, pageCount)
    })
  }

  function onClickLast() {
    onClick(pageCount)
  }

  return (
    <>
      <Button
        disabled={pageCount <= 1 || pageNo === 1} onClick={() => onClickFirst()} size="sm">{"<<"}
      </Button>

      <Button
        disabled={pageCount <= 1 || pageNo === 1}
        onClick={() => onClickPrev()}
        size="sm"
        style={{ marginLeft: "1px" }}>{"<"}
      </Button>

      <span
        style={{ marginLeft: "10px" }}>
        Page {pageNo} of {pageCount}
      </span>

      <Button
        disabled={pageCount <= 1 || pageNo === pageCount}
        onClick={() => onClickNext()}
        size="sm"
        style={{ marginLeft: "10px" }}>{">"}
      </Button>

      <Button
        disabled={pageCount <= 1 || pageNo === pageCount}
        onClick={() => onClickLast()}
        size="sm"
        style={{ marginLeft: "1px" }}>{">>"}
      </Button>
    </>
  )
}

export default NavigationButtons;