import { useEffect, useState } from "react";
import PembelianService from "../../Services/PembelianService";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { FaArrowLeft, FaSave, FaSearch, FaTrash } from "react-icons/fa";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import PemasokChoiceWidget from "../../widgets/pemasok/PemasokChoiceWidget";
import BarangChoiceWidget from "../../widgets/barang/BarangChoiceWidget";
import { helperDuplicatedInArrayObject, helperHandleZero, helperReadableCurrency } from "../../utils/helpers";

const initPembelian = {
  faktur: null,
  tanggal: null,
  total: 0,
  dibayar: 0,
  kembali: 0,
  kodePemasok: null,
};

const initPemasok = {
  kodePemasok: null,
  namaPemasok: null,
  alamatPemasok: null,
  teleponPemasok: null,
}

const PembelianAddPage = () => {
  const navigate = useNavigate();
  const [pembelian, setPembelian] = useState(initPembelian);
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [pemasok, setPemasok] = useState(initPemasok);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (["dibayar", "jumlahBeli", "kembali"].includes(name)) {
      value = parseInt(value);
    }

    setPembelian((values) => ({ ...values, [name]: value }));
  };

  const handleInputDaftarBarang = (e, index) => {
    const { name, value } = e.target;
    // setDaftarBarang((values) => {
    //   const result = [...values];
    //   result[index][name] = value;
    //   return result;
    // });
    setDaftarBarang((values) =>
      helperHandleZero(name, value, index, values, "hargaBeli")
    );
  };

  const handleRemoveDaftarBarang = (index) => {
    setDaftarBarang((values) => {
      const result = [...values];
      result.splice(index, 1);
      return result;
    });
  };

  const handlePembelianServiceCreate = () => {
    PembelianService.create(pembelian)
      .then((response) => {
        const printFaktur = window.confirm("Cetak Faktur?");
        if (printFaktur) {
          PembelianService.fakturPrint(response.data.faktur);
        }
        navigate("/pembelian");
      }).catch((error) => { });
  };

  const callbackPemasokChoiceWidget = (data) => {
    setPemasok(data);
  };

  const callbackBarangChoiceWidget = (data) => {
    data.subtotal = 0;
    data.jumlahBeli = 1;
    if (helperDuplicatedInArrayObject(data, "kodeBarang", daftarBarang)) {
      alert("Item tersebut sudah ada")
    } else {
      setDaftarBarang((values) => {
        const result = [...values];
        data.subtotal = data.jumlahBeli * data.hargaBeli;
        result.push(data);
        return result;
      });
    }

  };

  useEffect(() => {
    let sum = 0;
    if (daftarBarang.length > 0) {
      for (let itemBeli of daftarBarang) {
        sum += itemBeli.hargaBeli * parseInt(itemBeli.jumlahBeli);
      }
    }
    setPembelian((values) => ({ ...values, item: daftarBarang, total: sum }));
  }, [daftarBarang]);

  useEffect(() => {
    if (pembelian.dibayar > 0) {
      setPembelian((values) => ({ ...values, kembali: values.dibayar - values.total }))
    }
  }, [pembelian.dibayar, daftarBarang]);

  useEffect(() => {
    setPembelian((values) => ({ ...values, pemasok }));
  }, [pemasok]);

  return (
    <>
      <NavigationWidget
        actionTop={
          <>
            <Button onClick={() => navigate("/pembelian")} variant={"secondary me-2"}>
              <FaArrowLeft /> Kembali
            </Button>
            <Button onClick={handlePembelianServiceCreate}>
              <FaSave /> Simpan
            </Button>
          </>
        }>
        <Row className="mb-5">
          <Col md={7}>
            <Card>
              <Card.Header>Pembelian</Card.Header>
              <Card.Body>
                <Form.Group className="mt-2">
                  <Form.Label>Faktur</Form.Label>
                  <Form.Control
                    name="faktur"
                    type="text"
                    isInvalid={!pembelian.faktur}
                    value={pembelian.faktur || ""}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Control
                    name="tanggal"
                    type="date"
                    isInvalid={!pembelian.tanggal}
                    value={pembelian.tanggal || ""}
                    onChange={handleInput}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card className="mt-4">
              <Card.Header>Pemasok</Card.Header>
              <Card.Body>
                <PemasokChoiceWidget
                  onlyButton={false}
                  callbackPemasokChoiceWidget={callbackPemasokChoiceWidget}
                />
              </Card.Body>
            </Card>
            <Card className="mt-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                Daftar Item
                <BarangChoiceWidget
                  onlyButton={true}
                  callbackBarangChoiceWidget={callbackBarangChoiceWidget}
                />
              </Card.Header>
              <Table>
                <thead>
                  <tr>
                    <th>Nama Barang</th>
                    <th>Harga Beli</th>
                    <th>Stok</th>
                    <th>Subtotal</th>
                    <th>Qty</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {daftarBarang.map((barang, index) => (
                    <tr key={index}>
                      <td title={barang.kodeBarang}>{barang.namaBarang}</td>
                      <td>{helperReadableCurrency(barang.hargaJual)}</td>
                      <td>{barang.jumlahBarang}</td>
                      <td>{helperReadableCurrency(barang.subtotal)}</td>
                      <td>
                        <Form.Control
                          name="jumlahBeli"
                          type="number"
                          value={barang.jumlahBeli}
                          onChange={(e) => handleInputDaftarBarang(e, index)}
                        />
                      </td>
                      <td>
                        <Button
                          title={`Hapus ${barang.kodeBarang}`}
                          onClick={() => handleRemoveDaftarBarang(index)}
                          variant="outline-danger"
                          size="sm">
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Body>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card>
              <Card.Header>Pembayaran</Card.Header>
              <Table>
                <thead>
                  <tr>
                    <th>Total</th>
                    <th>{pembelian.total}</th>
                  </tr>
                  <tr>
                    <th>Kembali</th>
                    <th
                      className={
                        pembelian.kembali < 0 ? "text-danger" : "text-success"}>
                      {pembelian.kembali}
                    </th>
                  </tr>
                  <tr>
                    <th>Dibayar</th>
                    <th>
                      <Form.Control
                        name="dibayar"
                        type="number"
                        value={pembelian.dibayar || 0}
                        onChange={handleInput} />
                    </th>
                  </tr>
                </thead>
              </Table>
            </Card>
          </Col>
        </Row>
      </NavigationWidget>
    </>

  );
};

export default PembelianAddPage;