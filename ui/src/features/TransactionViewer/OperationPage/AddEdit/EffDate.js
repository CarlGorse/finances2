import { addEditTransactionAtom } from 'common/recoil/atoms/AddEditTransactionAtom';
import { Col, Form, Row } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { getDateAsYYYYMMDD } from 'common/functions/DateFunctions'

function AddEdit() {

    const addEditTransaction = useRecoilValue(addEditTransactionAtom);

    let defaultValue = (getDateAsYYYYMMDD(addEditTransaction.EffDate));

    return (
        <Row style={{ paddingTop: "20px" }}>

            <Col xs={3}>
                <Form.Label>Date:</Form.Label>
            </Col>

            <Col xs={6}>
                <Form.Control
                    id="addEdit_EffDate"
                    type="date"
                    //value="2013-01-08"
                    defaultValue={defaultValue}
                />
            </Col>
        </Row>
    );
}

export default AddEdit;