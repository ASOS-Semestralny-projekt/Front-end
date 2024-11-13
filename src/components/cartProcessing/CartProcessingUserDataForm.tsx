import { Col, Form, Row } from "react-bootstrap";
import { UserCartDataDTO } from "../../services/userDTOs/UserCartDataDTO.ts";

type CartProcessingUserDataFormProps = {
  userCartData: UserCartDataDTO;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CartProcessingUserDataForm({ userCartData, handleChange }: CartProcessingUserDataFormProps) {
  return (
    <>
      <Form>
          <Col>
            <Form.Label className="h5 fw-bold">Osobné údaje</Form.Label>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Label className="h6">Meno</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={userCartData.first_name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formGroupSurname">
                  <Form.Label className="h6">Priezvisko</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={userCartData.last_name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGroupPhone">
                  <Form.Label className="h6">Telefónne číslo</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={userCartData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
              <Form.Group className="mb-3" controlId="formGroupPhone">
                  <Form.Label className="h6">Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={userCartData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Label className="h5 fw-bold">Dodacie údaje</Form.Label>
            <Row>
              <Col xs={8} sm={9}>
                <Form.Group className="mb-3" controlId="formGroupStreet">
                  <Form.Label className="h6">Ulica</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    value={userCartData.street}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={4} sm={3}>
                <Form.Group className="mb-3" controlId="formGroupHouseNumber">
                  <Form.Label className="h6">Číslo domu</Form.Label>
                  <Form.Control
                    type="text"
                    name="house_number"
                    value={userCartData.house_number}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGroupZipCode">
                  <Form.Label className="h6">PSČ</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip_code"
                    value={userCartData.zip_code}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGroupCity">
                  <Form.Label className="h6">Mesto</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={userCartData.city}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGroupCountry">
                  <Form.Label className="h6">Krajina</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={userCartData.country}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Form>
    </>
  );
}

export default CartProcessingUserDataForm;