import { error } from '@sveltejs/kit';


// Fetches data from API when page form submitted
export const actions = {
  default: async ({ request, fetch }) => {
    // Saves form data to variables
    const submissionInfo = await request.formData();

    const state = submissionInfo.get('search-select');
    const personType = submissionInfo.get('text-input');

    // Assigns API url based on form request
    
    // WRITE CODE HERE

    // Fetches data from api and saves to cardApiData variable
    const cardsApiDataRes = await fetch(url);
    const cardsApiData = await cardsApiDataRes.json();
    console.log(cardsApiData);

    // Throws error if API data is not found
    if (cardsApiData.message) {
      throw error(404, {
        message: cardsApiData.message
      });
    }

    // Returns cardsApiData as cards to page
    return {
      cards: cardsApiData
    }
  }
}