import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import BarangService from "../../Services/BarangService";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import Paginator from "../../widgets/commons/Paginator";
import BarangSearchInlineWidget from "../../widgets/barang/BarangSearchInlineWidget";
import { useNavigate } from "react-router-dom";

const BarangListPage = () => {
  const navigate = useNavigate();
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [paginateBarang, setPaginateBarang] = useState([]);
  const [queryBarang, setQueryBarang] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    BarangService.list(queryBarang)
      .then((response) => {
        setDaftarBarang(response.data);
        if (response.headers.pagination) {
          setPaginateBarang(JSON.parse(response.headers.pagination))
        }
      })
      .catch((error) => console.log(error));
  }, [queryBarang]);

  const callbackPaginator = (page) => {
    setQueryBarang((values) => ({ ...values, page }));
  };

  const callbackBarangSearchInlineWidget = (query) => {
    setQueryBarang((values) => ({ ...values, ...query }));
  };

  return (
    <NavigationWidget
      actionTop={
        <BarangSearchInlineWidget
          attr={{ variant: "secondary" }}
          isShowKodeBarang={true}
          isShowNamaBarang={true}
          callbackBarangSearchInlineWidget={callbackBarangSearchInlineWidget}
        />
      }
      buttonCreate={
          <Button className="w-100" onClick={() => navigate("/barang/add")}>
          <FaPlusCircle />Tambah
        </Button>
      }>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5>Daftar Barang</h5>
          <Paginator paginate={paginateBarang} callbackPaginator={callbackPaginator} />
        </Card.Header>
        <Table>
          <thead>
            <tr>
              <th>Kode Barang</th>
              <th>Nama Barang</th>
              <th>Harga Jual</th>
              <th>Harga Beli</th>
              <th>Jumlah Barang</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarBarang.map((barang, index) => (
              <tr key={index}>
                <td>{barang.kodeBarang}</td>
                <td>{barang.namaBarang}</td>
                <td>{barang.hargaJual}</td>
                <td>{barang.hargaBeli}</td>
                <td>{barang.jumlahBarang}</td>
                <td>
                  <Button onClick={() => 
                    navigate(`/barang/edit/${barang.kodeBarang}`)
                  }>
                    <FaEdit/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </NavigationWidget>
  );
};

export default BarangListPage;