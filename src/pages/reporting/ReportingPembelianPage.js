import { useState } from "react";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import { Button, Card, Form } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import ReportingService from "../../Services/ReportingService";
import BarangChoiceWidget from "../../widgets/barang/BarangChoiceWidget";

export default () => {
    const [reportingPembelian, setReportingPembelian] = useState({
        kodeBarang: "",
        fromTanggal: new Date(),
        toTanggal: new Date(),
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setReportingPembelian((values) => ({ ...values, [name]: value }));
    };

    const handleReportPeriodExcel = async () => {
        await ReportingService.reportPembelianPeriodExcel(reportingPembelian);
    };

    const callbackBarangChoiceWidget = ({ kodeBarang }) => {
        setReportingPembelian((values) => ({ ...values, kodeBarang }));
    };

    return (
        <NavigationWidget
            actionTop={
                <>
                    <Button onClick={handleReportPeriodExcel}>
                        <FaDownload /> Export
                    </Button>
                </>
            }>

            <Card>
                <Card.Header>
                    <h5>Laporan Pembelian</h5>
                </Card.Header>
                <Card.Body>
                    <BarangChoiceWidget
                        onlyButton={false}
                        callbackBarangChoiceWidget={callbackBarangChoiceWidget}
                    />
                    <Form.Group className="mt-3">
                        <Form.Label>From Tanggal</Form.Label>
                        <Form.Control
                            name="fromTanggal"
                            type="date"
                            value={reportingPembelian.fromTanggal || ""}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>To Tanggal</Form.Label>
                        <Form.Control
                            name="toTanggal"
                            type="date"
                            value={reportingPembelian.toTanggal || ""}
                            onChange={handleInput}
                        />
                    </Form.Group>
                </Card.Body>
            </Card>
        </NavigationWidget>
    );
};