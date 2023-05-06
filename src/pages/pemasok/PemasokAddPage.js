import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PemasokService from "../../Services/PemasokService";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import { Button, Card, Form } from "react-bootstrap";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const PemasokAddPage = () => {
    const navigate = useNavigate();
    const [pemasok, setPemasok] = useState({});

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setPemasok((values) => ({ ...values, [name]: value }));
    };

    const handlePemasokServiceCreate = () => {
        PemasokService.create(pemasok).then((response) => {
            alert("Pemasok berhasil ditambahkan.");
            navigate("/pemasok");
        });
    };

    return (
        <NavigationWidget actionTop={
            <>
                <Button className="me-2" variant="secondary" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Kembali
                </Button>
                <Button onClick={handlePemasokServiceCreate}>
                    <FaSave />Simpan
                </Button>
            </>
        }>
            <Card>
                <Card.Header>
                    <h5>Tambah Pemasok</h5>
                </Card.Header>
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Kode Pemasok</Form.Label>
                        <Form.Control
                            name="kodePemasok"
                            value={pemasok.kodePemasok || ""}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Nama Pemasok</Form.Label>
                        <Form.Control
                            name="namaPemasok"
                            value={pemasok.namaPemasok || ""}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Alamat Pemasok</Form.Label>
                        <Form.Control
                            name="alamatPemasok"
                            type="text"
                            value={pemasok.alamatPemasok || ""}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Telepon Pemasok</Form.Label>
                        <Form.Control
                            name="teleponPemasok"
                            type="text"
                            value={pemasok.teleponPemasok || ""}
                            onChange={handleInput}
                        />
                    </Form.Group>
                </Card.Body>
            </Card>
        </NavigationWidget>
    );
};

export default PemasokAddPage;