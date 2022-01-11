export async function fetchCoins() {
  // return Promise json data
  return await fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
