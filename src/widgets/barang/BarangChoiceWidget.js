import { useEffect, useState } from "react";
import BarangService from "../../Services/BarangService";
import { Button, Form, InputGroup, Modal, ModalBody, Table } from "react-bootstrap";
import { helperReadableCurrency } from "../../utils/helpers";
import { FaArrowDown } from "react-icons/fa";
import BarangSearchInlineWidget from "./BarangSearchInlineWidget";

const initQuery = { page: 1, limit: 7 };

const initBarang = {
    kodeBarang: null,
    namaBarang: null,
    hargaBeli: 0,
    hargaJual: 0,
    jumlahBarang: 0,
};

const BarangChoiceWidget = ({
    callbackBarangChoiceWidget,
    onlyButton = true
}) => {
    const [show, setShow] = useState(false);
    const [daftarBarang, setDaftarBarang] = useState([]);
    const [query, setQuery] = useState(initQuery);
    const [barangReview, setBarangReview] = useState(initBarang);

    const handleBarangServiceList = () => {
        BarangService.list(query)
            .then((response) => {
                setDaftarBarang(response.data);
            }).catch((error) => { });
    };

    const handleChoice = (barang) => {
        setBarangReview(barang);
        callbackBarangChoiceWidget(barang);
        setShow(false);
    };

    const callbackBarangSearchInlineWidget = (q) => {
        setQuery((values) => ({ ...values, ...q }));
    };

    useEffect(() => {
        handleBarangServiceList();
    }, [query]);

    return (
        <>
            {!onlyButton && (
                <InputGroup>
                    <Form.Control
                        type="text"
                        disabled
                        value={barangReview.namaBarang || ""}
                    />
                    <Button onClick={() => setShow(true)}>Pilih Barang</Button>
                </InputGroup>
            )}

            {onlyButton && (
                <Button onClick={() => setShow(true)}>Pilih Barang</Button>
            )}

            <Modal show={show} onHide={() => setShow(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Pilih Barang</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BarangSearchInlineWidget
                        isShowKodeBarang={true}
                        isShowNamaBarang={true}
                        q={query}
                        callbackBarangSearchInlineWidget={callbackBarangSearchInlineWidget}
                    />
                </Modal.Body>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Kode Barang</th>
                            <th>Nama Barang</th>
                            <th>Harga Beli</th>
                            <th>Harga Jual</th>
                            <th>Jumlah Barang</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {daftarBarang.map((barang, index) => (
                            <tr key={index}>
                                <td>{barang.kodeBarang}</td>
                                <td>{barang.namaBarang}</td>
                                <td>{helperReadableCurrency(barang.hargaBeli)}</td>
                                <td>{helperReadableCurrency(barang.hargaJual)}</td>
                                <td>{barang.jumlahBarang}</td>
                                <td>
                                    <Button onClick={() => handleChoice(barang)}>
                                        <FaArrowDown />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal>
        </>
    );
};

export default BarangChoiceWidget;