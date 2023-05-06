import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import PembelianService from "../../Services/PembelianService";
import { FaDownload, FaEdit, FaPlusCircle, FaSearch } from "react-icons/fa";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import Paginator from "../../widgets/commons/Paginator";
import { useNavigate } from "react-router-dom";
import PembelianSearchInlineWidget from "../../widgets/pembelian/PembelianSearchInlineWidget";
import PembelianReviewWidget from "../../widgets/pembelian/PembelianReviewWidget";
import { helperReadableCurrency, helperReadableDate } from "../../utils/helpers";

const PembelianListPage = () => {
  const navigate = useNavigate();
  const [daftarPembelian, setDaftarPembelian] = useState([]);
  const [paginatePembelian, setPaginatePembelian] = useState([]);
  const [queryPembelian, setQueryPembelian] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    PembelianService.list(queryPembelian)
      .then((response) => {
        setDaftarPembelian(response.data);
        if (response.headers.pagination) {
          setPaginatePembelian(JSON.parse(response.headers.pagination))
        }
      })
  }, [queryPembelian]);

  const callbackPaginator = (page) => {
    setQueryPembelian((values) => ({ ...values, page }));
  };

  const callbackPembelianSearchInlineWidget = (query) => {
    setQueryPembelian((values) => ({ ...values, ...query }));
  };

  const handlePembelianServiceFakturPrint = (faktur) => {
    PembelianService.fakturPrint(faktur).then((status) => {
      // TODO: add something
    });
  };

  return (
    <NavigationWidget
      actionTop={
        <PembelianSearchInlineWidget
          attr={{ variant: "secondary" }}
          isShowKodePemasok={true}
          isShowFaktur={true}
          callbackPembelianSearchInlineWidget={callbackPembelianSearchInlineWidget}
        />
      }
      buttonCreate={
        <Button className="w-100" onClick={() => navigate("/pembelian/add")}>
          <FaPlusCircle />Tambah
        </Button>
      }>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5>Daftar Pembelian</h5>
          <Paginator paginate={paginatePembelian} callbackPaginator={callbackPaginator} />
        </Card.Header>
        <Table>
          <thead>
            <tr>
              <th>Faktur</th>
              <th>Tanggal</th>
              <th>Total</th>
              <th>Kode Pemasok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarPembelian.map((pembelian, index) => (
              <tr key={index}>
                <td>{pembelian.faktur}</td>
                <td>{helperReadableDate(pembelian.tanggal)}</td>
                <td>{helperReadableCurrency(pembelian.total)}</td>
                <td>{pembelian.kodePemasok}</td>
                <td>
                  {/* <Button
                    onClick={() =>
                      handlePembelianServiceFakturPrint(pembelian.faktur)
                    }>
                    <FaDownload />
                  </Button> */}
                  <PembelianReviewWidget faktur={pembelian.faktur} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </NavigationWidget>
  );
};

export default PembelianListPage;