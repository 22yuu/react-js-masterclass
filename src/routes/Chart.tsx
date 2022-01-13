import { useQuery } from "react-query";
import { useOutletContext, useParams } from "react-router";
import { fetchCoinHistory } from "../api";

type TypeParmas = {
  coinId: string;
};

function Chart() {
  const { coinId } = useParams() as TypeParmas;
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return <h1>Chart</h1>;
}

export default Chart;
