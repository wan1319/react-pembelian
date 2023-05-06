import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const PembelianSearchInlineWidget = ({
    attr,
    isShowFaktur,
    isShowKodePemasok,
    callbackPembelianSearchInlineWidget,
}) => {
    const [query, setQuery] = useState({ kodePemasok: "", faktur: "" });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery((values) => ({ ...values, [name]: value }));
    };

    return (
        <>
            <InputGroup>
                {isShowFaktur && (
                    <Form.Control
                        name="faktur"
                        type="text"
                        placeholder="No faktur..."
                        value={query.faktur || ""}
                        onChange={handleInput}
                    />
                )}
                {isShowKodePemasok && (
                    <Form.Control
                        name="kodePemasok"
                        type="text"
                        placeholder="Kode pemasok..."
                        value={query.kodePemasok || ""}
                        onChange={handleInput}
                    />
                )}

                <Button
                    {...attr}
                    onClick={() => callbackPembelianSearchInlineWidget(query)}>
                    <FaSearch /> Search
                </Button>
            </InputGroup>
        </>
    );
};

export default PembelianSearchInlineWidget;