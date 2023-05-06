import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarangListPage from "./pages/barang/BarangListPage";
import AuthLoginPage from "./pages/auth/AuthLoginPage";
import BarangAddPage from "./pages/barang/BarangAddPage";
import BarangEditPage from "./pages/barang/BarangEditPage";
import PemasokListPage from "./pages/pemasok/PemasokListPage";
import PemasokAddPage from "./pages/pemasok/PemasokAddPage";
import PemasokEditPage from "./pages/pemasok/PemasokEditPage";
import PembelianListPage from "./pages/pembelian/PembelianListPage";
import PembelianAddPage from "./pages/pembelian/PembelianAddPage";
import ReportingPembelianPage from "./pages/reporting/ReportingPembelianPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLoginPage />} />
        <Route path="/barang" element={<BarangListPage />} />
        <Route path="/barang/add" element={<BarangAddPage />} />
        <Route path="/barang/edit/:kodeBarang" element={<BarangEditPage />} />
        <Route path="/pemasok" element={<PemasokListPage />} />
        <Route path="/pemasok/add" element={<PemasokAddPage />} />
        <Route path="/pemasok/edit/:kodePemasok" element={<PemasokEditPage />} />
        <Route path="/pembelian" element={<PembelianListPage />} />
        <Route path="/pembelian/add" element={<PembelianAddPage />} />
        <Route path="/reporting/pembelian" element={<ReportingPembelianPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;