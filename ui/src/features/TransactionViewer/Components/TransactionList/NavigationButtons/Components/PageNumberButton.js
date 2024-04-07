import Pagination from 'react-bootstrap/Pagination';

function PageNumberButton({ label, pageNo, onClick }) {
  return <Pagination.Item
    active={label === pageNo}
    onClick={() => onClick(label)}
  >
    {label}
  </Pagination.Item>
}

export default PageNumberButton;