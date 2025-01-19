import { categoriesAtom } from 'common/recoil/atoms/CategoriesAtom';
import { Col, Form, Row } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

function AddEdit() {

    const categories = useRecoilValue(categoriesAtom);

    return (
        <Row style={{ paddingTop: "5px" }}>
            <Col xs={3}>
                <Form.Label>Category:</Form.Label>
            </Col>

            <Col xs={9}>
                <Form.Select
                    id="addEdit_CategoryId">
                    {
                        categories?.map(category => (
                            <option value={category.Id}>{`${category.Group.Name} | ${category.Name}`}</option>
                        ))
                    }
                </Form.Select>
            </Col>

        </Row>
    );
}

export default AddEdit;