import { QrCodePix } from "qrcode-pix";
import React, { useEffect, useState } from "react";
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setQrCode(null);
    setError(null);
  }, [fields]);

  const onChange = (key: any) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields({ ...fields, [key]: e.target.value });

  return (
    <div className="App">
      <Container>
        <Row className="mb-2">
          <Col xs="8">
            <div className="mb-3">
              <FormGroup className="mb-2">
                <FormLabel>Key</FormLabel>
                <FormControl value={fields.key} onChange={onChange("key")} />
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel>Nome</FormLabel>
                <FormControl value={fields.name} onChange={onChange("name")} />
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel>Cep</FormLabel>
                <FormControl value={fields.cep} onChange={onChange("cep")} />
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel>Cidade</FormLabel>
                <FormControl value={fields.city} onChange={onChange("city")} />
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel>Mensagem</FormLabel>
                <FormControl
                  value={fields.message}
                  onChange={onChange("message")}
                />
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel>Valor</FormLabel>
                <FormControl
                  type="number"
                  value={fields.value}
                  onChange={onChange("value")}
                />
              </FormGroup>
            </div>
            <Button
              type="button"
              onClick={async () => {
                try {
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
                } catch (err: any) {
                  setError(err.message);
                }
              }}
            >
              Criar QRCode
            </Button>
          </Col>
          <Col xs="4">{qrCode && <img src={qrCode} alt="qrcode" />}</Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <div className="py-3">
              {error && (
                <div>
                  <h1 className="h6">Erro ao gerar QR Code</h1>
                  <pre className="text-danger">{error}</pre>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
