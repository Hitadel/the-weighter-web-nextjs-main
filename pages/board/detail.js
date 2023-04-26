import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DetailBoard from "../../components/board/DetailBoard";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CommonLayout from "../../components/layout/CommonLayout";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  useEffect(() => {
    if (id) {
      axios
        .get(`/board/show/${id}`, { withCredentials: true })
        .then((res) => {
          setData(res.data.board);
          setComment(res.data.comment);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);
  return (
    <CommonLayout>
      <DetailBoard data={data} comment={comment} setComment={setComment} />
    </CommonLayout>
  );
};

export default Detail;
