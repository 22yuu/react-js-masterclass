import { useParams } from "react-router";

function Coin() {
  const params = useParams();
  return <h1>Coin : {params.coinId}</h1>;
}
export default Coin;
