import { QrCodePix } from "qrcode-pix";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";

export const App = () => {
  const [fields, setFields] = useState({
    key: "",
    name: "",
    city: "",
    message: "",
    cep: "",
    value: "0",
  });
  const [qrCode, setQrCode] = useState<string | null>(null);

  const onChange = (key: any) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields({ ...fields, [key]: e.target.value });

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs="8">
            <FormGroup>
              <FormLabel>Key</FormLabel>
              <FormControl value={fields.key} onChange={onChange("key")} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Nome</FormLabel>
              <FormControl value={fields.name} onChange={onChange("name")} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Cep</FormLabel>
              <FormControl value={fields.cep} onChange={onChange("cep")} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Cidade</FormLabel>
              <FormControl value={fields.city} onChange={onChange("city")} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Mensagem</FormLabel>
              <FormControl
                value={fields.message}
                onChange={onChange("message")}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Valor</FormLabel>
              <FormControl
                type="number"
                value={fields.value}
                onChange={onChange("value")}
              />
            </FormGroup>
            <Button
              type="button"
              onClick={async () => {
                const response = QrCodePix({
                  version: "01",
                  key: fields.key,
                  name: fields.name,
                  city: fields.city,
                  message: fields.message,
                  cep: fields.cep,
                  value: +fields.value,
                });

                const qrCode = await response.base64();

                setQrCode(qrCode);
              }}
            >
              Criar QRCode
            </Button>
          </Col>
          <Col xs="4">{qrCode && <img src={qrCode} alt="qrcode" />}</Col>
        </Row>
      </Container>
    </div>
  );
};
