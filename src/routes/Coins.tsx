import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: #fff;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // useEffect는 컴포넌트가 처음 시작될 때 한번 실행할 지, 마지막에 한번 실행할 지, 값이 변할 때마다 실행할지 선택해서 사용
    // 여기서는 처음 시작할 때 한번 사용
    // fetch("https://api.coinpaprika.com/v1/coins");
    // await, async 이용하는 방법
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      // console.log(json);
      setCoins(json.slice(0, 100));
      setLoading(false);
    })(); // 바로 실행
  });
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`/${coin.id}`}
                state={{ name: coin.name, rank: coin.rank }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>{" "}
              {/* a 태그는 새로고침 되므로 Link 사용!*/}
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
