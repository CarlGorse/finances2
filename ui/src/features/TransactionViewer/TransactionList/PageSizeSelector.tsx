import { Col, Form, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { loadedTransactionsAtom } from 'common/recoil/atoms/LoadedTransactionsAtom';
import { transactionsPageSizeAtom } from 'common/recoil/atoms/TransactionsPageSizeAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import LoadedTransactions from 'types/LoadedTransactions'

function PageSizeSelector() {

    const [transactionsPageSize, setTransactionsPageSize] = useRecoilState<number>(transactionsPageSizeAtom);
    const loadedTransactions = useRecoilValue<LoadedTransactions>(loadedTransactionsAtom);

    console.log(loadedTransactions.totalTransactions);

    return <Row>

        <Col xs={3}>
            <Form.Label>Page size:</Form.Label>
        </Col>

        <Col xs={3}>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {transactionsPageSize}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        [15, 50, 100].filter(x => x < loadedTransactions.totalTransactions).map(pageSize => (

                            <Dropdown.Item key={pageSize} as="button" >
                                <div onClick={() => {
                                    setTransactionsPageSize(pageSize);
                                }}>
                                    {pageSize}
                                </div>
                            </Dropdown.Item>
                        ))

                    }
                    {
                        <Dropdown.Item key={loadedTransactions.totalTransactions} as="button" >
                            <div onClick={() => {
                                setTransactionsPageSize(loadedTransactions.totalTransactions);
                            }}>
                                {loadedTransactions.totalTransactions} (all)
                            </div>
                        </Dropdown.Item>

                    }
                </Dropdown.Menu>
            </Dropdown >
        </Col>

    </Row >
}

export default PageSizeSelector;