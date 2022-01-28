import { useQuery } from "react-query";
import { useOutletContext, useParams } from "react-router";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { BeatLoader } from "react-spinners";
import styled from "styled-components";

const Loader = styled.span`
  text-align: center;
  display: block;
`;

type TypeParmas = {
  coinId: string;
};

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {}

function Chart({}: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useParams() as TypeParmas;
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        <Loader>
          <BeatLoader color="#9c88ff" />
        </Loader>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            //보내고 싶은 모든 데이터가 들어있음
            {
              name: "price",
              data: data?.map((price) => ({
                x: price.time_close,
                y: [
                  price.open.toFixed(2),
                  price.high.toFixed(2),
                  price.low.toFixed(2),
                  price.close.toFixed(2),
                ],
              })),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              width: 1,
            },
            xaxis: {
              type: "datetime",
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
