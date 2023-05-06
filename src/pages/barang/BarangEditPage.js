import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BarangService from "../../Services/BarangService";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import { Button, Card, Form } from "react-bootstrap";
import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";

const BarangEditPage = () => {
    const navigate = useNavigate();
    const { kodeBarang } = useParams();
    const [barang, setBarang] = useState({});

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setBarang((values) => ({ ...values, [name]: value }));
    };

    useEffect(() => {
        BarangService.get(kodeBarang).then((response) => {
            setBarang(response.data);
        });
    }, [kodeBarang]);

    const handleBarangServiceEdit = () => {
        BarangService.edit(kodeBarang, barang).then((response) => {
            alert(`Berhasil mengubah data barang ${kodeBarang}`);
            navigate("/barang");
        });
    };

    const handleBarangServiceDelete = () => {
        let isDelete = window.confirm(`Delete barang ${kodeBarang}?`)
        if (isDelete) {
            BarangService.delete(kodeBarang, barang).then(() => {
                alert(`Berhasil mengubah data barang ${kodeBarang}`);
                navigate("/barang");
            });
        }

    };

    return (
        <NavigationWidget actionTop={
            <>
                <Button className="me-2" variant="secondary" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Kembali
                </Button>
                <Button className="me-2" variant="danger" onClick={handleBarangServiceDelete}>
                    <FaTrash />Hapus
                </Button>
                <Button onClick={handleBarangServiceEdit}>
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
                            disabled
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

export default BarangEditPage;