import { Button } from 'react-bootstrap'

function NavigationButtons() {

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