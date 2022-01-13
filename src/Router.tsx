import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId/*" element={<Coin />} />
        {/* v6부터 자식 라우터를 사용할려면 /*를 붙여야한다. */}
        {/*
            아니면 아래의 코드처럼 사용 가능하다. 
            <Route path="/:coinId" element={<Coin />}>
              <Route path="chart" element={<Chart />} /> 
              <Route path="price" element={<Price />} />
            <Route>
            
            * Chart, Price import 해줘야함
            자식 Route들이 어디에 render 될지 부모의 element 안에 Outlet을 이용해 표시
            https://reactrouter.com/docs/en/v6/getting-started/overview 참고
          */}
        {/* <Route path="/:coinId" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route> */}
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
