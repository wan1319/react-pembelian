import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PemasokService from "../../Services/PemasokService";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import { Button, Card, Form } from "react-bootstrap";
import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";

const PemasokEditPage = () => {
    const navigate = useNavigate();
    const { kodePemasok } = useParams();
    const [pemasok, setPemasok] = useState({});

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setPemasok((values) => ({ ...values, [name]: value }));
    };

    useEffect(() => {
        PemasokService.get(kodePemasok).then((response) => {
            setPemasok(response.data);
        });
    }, [kodePemasok]);

    const handlePemasokServiceEdit = () => {
        PemasokService.edit(kodePemasok, pemasok).then(() => {
            alert(`Berhasil mengubah data pemasok ${kodePemasok}`);
            navigate("/pemasok");
        });
    };

    const handlePemasokServiceDelete = () => {
        let isDelete = window.confirm(`Delete pemasok ${kodePemasok}?`)
        if (isDelete) {
            PemasokService.delete(kodePemasok, pemasok).then(() => {
                alert(`Berhasil mengubah data pemasok ${kodePemasok}`);
                navigate("/pemasok");
            });
        }

    };

    return (
        <NavigationWidget actionTop={
            <>
                <Button className="me-2" variant="secondary" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Kembali
                </Button>
                <Button className="me-2" variant="danger" onClick={handlePemasokServiceDelete}>
                    <FaTrash />Hapus
                </Button>
                <Button onClick={handlePemasokServiceEdit}>
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
                            disabled
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

export default PemasokEditPage;