import Pagination from 'react-bootstrap/Pagination';

function MiddleRangeButton({ pageNo, isActive }) {
  return <Pagination.Item
    active={isActive}>
    {isActive ? pageNo : "..."}
  </Pagination.Item>
}

export default MiddleRangeButton;