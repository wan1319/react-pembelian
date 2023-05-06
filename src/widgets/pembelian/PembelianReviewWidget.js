import { useState } from "react";
import PembelianService from "../../Services/PembelianService";
import { Button, Modal, Table } from "react-bootstrap";
import { FaFileExcel, FaSearchPlus } from "react-icons/fa";
import { helperReadableCurrency, helperReadableDate } from "../../utils/helpers";

const PembelianReviewWidget = ({ attr, faktur }) => {
    const [pembelian, setPembelian] = useState();
    const [show, setShow] = useState(false);

    const handlePembelianWidget = () => {
        PembelianService.get(faktur)
            .then((response) => {
                setShow(true);
                setPembelian(response.data);
            })
    };

    const handleFakturPrint = async () => {
        await PembelianService.fakturPrint(faktur);
    };

    return (
        <>
            <Button {...attr} onClick={handlePembelianWidget}>
                <FaSearchPlus />
            </Button>

            {pembelian && (
                <Modal show={show} onHide={() => setShow(false)} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Faktur No. {pembelian.faktur || "Nomor faktur..."}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{helperReadableDate(pembelian.tanggal)}</Modal.Body>
                    <Table>
                        <tbody>
                            <tr>
                                <th>Kode Pemasok</th>
                                <td>{pembelian.pemasok.kodePemasok}</td>
                            </tr>
                            <tr>
                                <th>Nama Pemasok</th>
                                <td>{pembelian.pemasok.namaPemasok}</td>
                            </tr>
                            <tr>
                                <th>Alamat Pemasok</th>
                                <td>{pembelian.pemasok.alamatPemasok}</td>
                            </tr>
                            <tr>
                                <th>Telepon Pemasok</th>
                                <td>{pembelian.pemasok.teleponPemasok}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Table>
                        <thead>
                            <tr>
                                <th>Kode Barang</th>
                                <th>Nama Barang</th>
                                <th>Harga Beli</th>
                                <th>Jumlah Beli</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pembelian.item.map((item, index) => (
                                <tr>
                                    <td>{item.kodeBarang}</td>
                                    <td>{item.namaBarang}</td>
                                    <td>{helperReadableCurrency(item.hargaBeli)}</td>
                                    <td>{item.jumlahBeli} Unit</td>
                                    <td>{helperReadableCurrency(item.subtotal)}</td>
                                </tr>
                            ))}
                            <tr>
                                <th colSpan={4}>Total</th>
                                <td>{helperReadableCurrency(pembelian.total)}</td>
                            </tr>
                            <tr>
                                <th colSpan={4}>Dibayar</th>
                                <td>{helperReadableCurrency(pembelian.dibayar)}</td>
                            </tr>
                            <tr>
                                <th colSpan={4}>Kembalian</th>
                                <td>{helperReadableCurrency(pembelian.kembali)}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Modal.Footer>
                        <Button onClick={handleFakturPrint}>
                                <FaFileExcel />Export to Excel
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default PembelianReviewWidget;