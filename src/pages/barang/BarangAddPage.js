import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarangService from "../../Services/BarangService";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import { Button, Card, Form } from "react-bootstrap";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const BarangAddPage = () => {
    const navigate = useNavigate();
    const [barang, setBarang] = useState({});

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setBarang((values) => ({ ...values, [name]: value }));
    };

    const handleBarangServiceCreate = () => {
        BarangService.create(barang).then((response) => {
            alert("Barang berhasil ditambahkan.");
            navigate("/barang");
        });
    };

    return (
        <NavigationWidget actionTop={
            <>
                <Button className="me-2" variant="secondary" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Kembali
                </Button>
                <Button onClick={handleBarangServiceCreate}>
                    <FaSave />Simpan
                </Button>
            </>
        }>
            <Card>
                <Card.Header>
                    <h5>Tambah Barang</h5>
                </Card.Header>
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Kode Barang</Form.Label>
                        <Form.Control
                            name="kodeBarang"
                            value={barang.kodeBarang || ""}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Nama Barang</Form.Label>
                        <Form.Control
                            name="namaBarang"
                            value={barang.namaBarang || ""}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Harga Beli</Form.Label>
                        <Form.Control
                            name="hargaBeli"
                            type="number"
                            isValid={parseInt(barang.hargaJual) > 0}
                            isInvalid={
                                !barang.hargaBeli ||
                                parseInt(barang.hargaBeli) >= parseInt(barang.hargaJual) ||
                                parseInt(barang.hargaBeli) === 0
                            }
                            value={barang.hargaBeli || ""}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Harga Jual</Form.Label>
                        <Form.Control
                            name="hargaJual"
                            type="number"
                            isInvalid={
                                !barang.hargaJual ||
                                parseInt(barang.hargaBeli) >= parseInt(barang.hargaJual) ||
                                parseInt(barang.hargaJual) === 0
                            }
                            value={barang.hargaJual || ""}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Jumlah Barang</Form.Label>
                        <Form.Control
                            name="jumlahBarang"
                            type="number"
                            value={barang.jumlahBarang || ""}
                            onChange={handleInput}
                        />
                    </Form.Group>
                </Card.Body>
            </Card>
        </NavigationWidget>
    );
};

export default BarangAddPage;