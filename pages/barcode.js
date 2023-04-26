import { useEffect, useState } from "react";
import { infoRequest } from "../utils/request";
import CommonLayout from "../components/layout/CommonLayout";
import LeftSide from "../components/barcode/left-side";
import RightSide from "../components/barcode/right-side";
import Background from "../components/barcode/background";
import { onChangeData, onClickResetButton, decode } from "../utils/function/barcode";
import { saveBarcodeData } from "../utils/query";

const Barcode = () => {
  const [src, setSrc] = useState("");
  const [barcode, setBarcode] = useState(null);
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const [showData, setShowData] = useState({});

  const onClickSaveButton = () => {
    if (showData["제품명"] && confirm("저장하시겠습니까?")) {
      saveBarcodeData(data).then(() => onClickResetButton(setSrc, setBarcode, setName, setData));
    }
  };

  useEffect(() => {
    if (name) {
      infoRequest
        .get("getFoodNtrItdntList1?serviceKey=" + process.env.NEXT_PUBLIC_PRODUCT_KEY + "&desc_kor=" + name + "&type=json")
        .then((res) => {
          console.log(res.data.body);
          setData(res.data.body.items[0]);
        })
        .catch((err) => console.error(err));
    }
  }, [name]);

  useEffect(() => {
    if (data) {
      onChangeData(data, setData, setShowData);
    }
  }, [data]);

  return (
    <CommonLayout>
      <Background>
        <LeftSide src={src} setSrc={setSrc} decode={decode} barcode={barcode} setBarcode={setBarcode} setName={setName} onClickSaveButton={onClickSaveButton} />
        <RightSide showData={showData} />
      </Background>
    </CommonLayout>
  );
};

export default Barcode;
