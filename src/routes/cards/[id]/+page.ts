export async function load({ fetch, params }) {
  const res = await fetch(`https://api.magicthegathering.io/v1/cards/${params.id}`)
  const data = await res.json();
  return { cardData: data }
}