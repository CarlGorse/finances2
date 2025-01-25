import Pagination from 'react-bootstrap/Pagination';

function NextPageButton({ pageNo, pageCount, onClick }) {
  return <Pagination.Next
    disabled={pageCount <= 1 || pageNo === pageCount}
    onClick={() => onClick(pageNo)}
  />
};

export default NextPageButton;