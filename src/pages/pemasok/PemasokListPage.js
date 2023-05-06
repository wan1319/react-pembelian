import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import PemasokService from "../../Services/PemasokService";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import Paginator from "../../widgets/commons/Paginator";
import { useNavigate } from "react-router-dom";
import PemasokSearchInlineWidget from "../../widgets/pemasok/PemasokSearchInlineWidget";

const PemasokListPage = () => {
    const navigate = useNavigate();
    const [daftarPemasok, setDaftarPemasok] = useState([]);
    const [paginatePemasok, setPaginatePemasok] = useState([]);
    const [queryPemasok, setQueryPemasok] = useState({ page: 1, limit: 10 });

    useEffect(() => {
        PemasokService.list(queryPemasok)
          .then((response) => {
            setDaftarPemasok(response.data);
            if (response.headers.pagination) {
              setPaginatePemasok(JSON.parse(response.headers.pagination))
            }
          })
      }, [queryPemasok]);
    
      const callbackPaginator = (page) => {
        setQueryPemasok((values) => ({ ...values, page }));
      };
    
      const callbackPemasokSearchInlineWidget = (query) => {
        setQueryPemasok((values) => ({ ...values, ...query }));
      };

      return (
        <NavigationWidget
          actionTop={
            <PemasokSearchInlineWidget
              attr={{ variant: "secondary" }}
              isShowKodePemasok={true}
              isShowNamaPemasok={true}
              callbackPemasokSearchInlineWidget={callbackPemasokSearchInlineWidget}
            />
          }
          buttonCreate={
              <Button className="w-100" onClick={() => navigate("/pemasok/add")}>
              <FaPlusCircle />Tambah
            </Button>
          }>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Daftar Pemasok</h5>
              <Paginator paginate={paginatePemasok} callbackPaginator={callbackPaginator} />
            </Card.Header>
            <Table>
              <thead>
                <tr>
                  <th>Kode Pemasok</th>
                  <th>Nama Pemasok</th>
                  <th>Alamat Pemasok</th>
                  <th>Telepon Pemasok</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {daftarPemasok.map((pemasok, index) => (
                  <tr key={index}>
                    <td>{pemasok.kodePemasok}</td>
                    <td>{pemasok.namaPemasok}</td>
                    <td>{pemasok.alamatPemasok}</td>
                    <td>{pemasok.teleponPemasok}</td>
                    <td>
                      <Button onClick={() => 
                        navigate(`/pemasok/edit/${pemasok.kodePemasok}`)
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

export default PemasokListPage;