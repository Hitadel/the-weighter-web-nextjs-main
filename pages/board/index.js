import axios from "axios";
import BoardTable from "../../components/board/BoardTable";
import CommonLayout from "../../components/layout/CommonLayout";
import { useState, useEffect } from "react";
import ButtonBar from "../../components/board/ButtonBar";
import { useRouter } from "next/router";

const Index = () => {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/board/index/${page}/${limit}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.rows);
        setCount(res.data.count);
      });
  }, [page]);

  const onClickTitle = (id) => {
    router.push({ pathname: "/board/detail", query: { id } });
  };

  const handlePage = (e) => {
    setPage(parseInt(e.target.outerText));
  };

  return (
    <CommonLayout>
      <ButtonBar />
      <BoardTable data={data} onClickTitle={onClickTitle} count={count} handlePage={handlePage} />
    </CommonLayout>
  );
};

export default Index;
