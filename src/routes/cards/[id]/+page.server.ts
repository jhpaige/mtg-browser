import { card } from 'mtgsdk';

// Load function that loads initial card data from API
export async function load({ params }) {
  const cardData = await card.find(params.id);
  return {
    cardData: cardData.card,
  };
}

export const actions = {
  // Listens for button to be pressed
  default: async ({ request }) => {

    // Saves form data to variables and queries API
    const searchInfo = await request.formData();
    const cardSet = searchInfo.get('card-set');
    const relatedCards = await card.where({ set: cardSet, page: 1, pageSize: 10 });

    // Returns relatedCards to page
    return {
      relatedCards
    }
  }
}