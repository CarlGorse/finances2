import Pagination from 'react-bootstrap/Pagination';

function PrevPageButton({ pageNo, pageCount, onClick }) {
    return <Pagination.Prev
        disabled={pageCount <= 1 || pageNo === 1}
        onClick={() => onClick()}
    />
};

export default PrevPageButton;