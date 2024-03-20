import { Button } from 'react-bootstrap'

function NavigationButtons() {

  return (
    <>
      <Button size="sm">{"<<"}</Button>

      <Button size="sm" style={{ marginLeft: "1px" }}>{"<"}</Button>

      <span style={{ marginLeft: "10px" }}>Page 1 of 10</span>

      <Button size="sm" style={{ marginLeft: "10px" }}>{">"}</Button>

      <Button size="sm" style={{ marginLeft: "1px" }}>{">>"}</Button>
    </>
  )
}

export default NavigationButtons;