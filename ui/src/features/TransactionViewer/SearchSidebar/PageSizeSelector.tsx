import Dropdown from 'react-bootstrap/Dropdown';
import LoadedTransactions from 'types/LoadedTransactions'
import TransactionsPageData from 'types/TransactionsPageData';

import { Col, Form, Row } from 'react-bootstrap';
import { loadedTransactionsState } from 'recoil/atoms/LoadedTransactionsState';
import { transactionsPageDataState } from 'recoil/atoms/TransactionsPageDataState';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function PageSizeSelector() {

    const pageData = useRecoilValue<TransactionsPageData>(transactionsPageDataState);
    const loadedTransactions = useRecoilValue<LoadedTransactions>(loadedTransactionsState);

    const setPageData = useSetRecoilState<TransactionsPageData>(transactionsPageDataState);

    return <Row>

        <Col xs={3}>
            <Form.Label>Page size:</Form.Label>
        </Col>

        <Col xs={3}>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {pageData.PageSize}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        [pageData.PageSize, 50, 100].filter(x => x < loadedTransactions.totalTransactions).map(pageSize => (

                            <Dropdown.Item key={pageSize.toString()} as="button" >
                                <div onClick={() => {
                                    setPageData(prevState => ({ ...prevState, PageSize: pageSize }));
                                }}>
                                    {pageSize.toString()}
                                </div>
                            </Dropdown.Item>
                        ))

                    }
                    {
                        <Dropdown.Item key={loadedTransactions.totalTransactions} as="button" >
                            <div onClick={() => {
                                setPageData(prevState => ({ ...prevState, PageSize: loadedTransactions.totalTransactions }));
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