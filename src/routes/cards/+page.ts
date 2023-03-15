// Loads first batch of card data from API
export async function load({ fetch }) {
  const cardsRes = await fetch(`https://api.magicthegathering.io/v1/cards?page=1`);
  const cardsData = await cardsRes.json();
  return {
    cardsData: cardsData
  }
}