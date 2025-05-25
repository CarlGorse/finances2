import { Col, Form, Row } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { categoriesState } from 'recoil/atoms/CategoriesState';

export default function Category({ defaultValue }) {

    const categories = useRecoilValue(categoriesState);

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
                            <option selected={category.Id == defaultValue} value={category.Id}>{`${category.Group.Name} | ${category.Name}`}</option>
                        ))
                    }
                </Form.Select>
            </Col>

        </Row >
    );
}