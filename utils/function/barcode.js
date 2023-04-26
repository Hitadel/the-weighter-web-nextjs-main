import Quagga from "quagga";
import { barcodeRequest, infoRequest } from "../request";

export const onChangeData = (data, setData, setShowData) => {
  if (!data || data.DESC_KOR === "고량미,알곡") {
    setData([]);
  } else {
    const newObj = [];
    newObj["제품명"] = data["DESC_KOR"];
    newObj["제조업체"] = data["ANIMAL_PLANT"];
    newObj["1회제공량 (g)"] = data["SERVING_WT"];
    newObj["열량 (kcal)"] = data["NUTR_CONT1"];
    newObj["탄수화물 (g)"] = data["NUTR_CONT2"];
    newObj["단백질 (g)"] = data["NUTR_CONT3"];
    newObj["지방 (g)"] = data["NUTR_CONT4"];
    newObj["당류 (g)"] = data["NUTR_CONT5"];
    newObj["나트륨 (mg)"] = data["NUTR_CONT6"];
    newObj["콜레스테롤 (g)"] = data["NUTR_CONT7"];
    newObj["포화지방산 (g)"] = data["NUTR_CONT8"];
    newObj["트랜스지방산 (g)"] = data["NUTR_CONT9"];
    setShowData(newObj);
  }
};

export const onClickResetButton = (setSrc, setBarcode, setName, setData) => {
  setSrc("");
  setBarcode("");
  setName("");
  setData([]);
};

export const encodeFileToBase64 = (fileBlob, setSrc) => {
  const reader = new FileReader();
  reader.readAsDataURL(fileBlob);
  return new Promise((resolve) => {
    reader.onload = () => {
      setSrc(reader.result);
      resolve();
    };
  });
};

export const decode = (e, setBarcode, setSrc) => {
  const src = URL.createObjectURL(e.target.files[0]);
  Quagga.decodeSingle(
    {
      decoder: { readers: ["ean_reader"] },
      size: 640,
      locator: { patchSize: "small", halfsample: false },
      src,
    },
    function (result) {
      if (result.codeResult) {
        setBarcode(result.codeResult.code);
      } else {
        alert("바코드가 인식되지 않았습니다. 다시 시도해주세요.");
      }
    }
  );
  encodeFileToBase64(e.target.files[0], setSrc);
};

export const getName = (barcode, setName) => {
  if (barcode) {
    barcodeRequest
      .get("BAR_CD=" + barcode)
      .then((res) => {
        // console.log(res.data);
        setName(res.data.C005.row[0].PRDLST_NM);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    alert("바코드를 먼저 입력해주세요");
  }
};
