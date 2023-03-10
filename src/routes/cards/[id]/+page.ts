export async function load({ fetch, params }) {
  const cardRes = await fetch(`https://api.magicthegathering.io/v1/cards/${params.id}`);
  const cardData = await cardRes.json();
  return {
    cardData: cardData
  }
}