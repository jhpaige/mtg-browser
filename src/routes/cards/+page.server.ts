import { card } from 'mtgsdk';

// Type declaration for actions default function
export const actions = {
  default: async ({ request }) => {

    // Saves form data to variables
    const searchInfo = await request.formData();
    const searchType = searchInfo.get('search-type');
    const textInput = searchInfo.get('text-input');
    const pageNumber = searchInfo.get('page-number');

    // Variable to store the cards' api data
    let cardsApiData = [];
    // Assigns API url based on form request
    if (searchType === 'name') {
      cardsApiData = await card.where({ name: `${textInput}`, page: Number(pageNumber), pageSize: 100 });
    } else if (searchType === 'artist') {
      cardsApiData = await card.where({ artist: `${textInput}`, page: Number(pageNumber), pageSize: 100 });
    }

    // Returns cardsApiData as cards to page
    return {
      cardsApiData: cardsApiData,
      searchType: searchType,
      textInput: textInput,
      pageNumber: pageNumber
    }
  }
}
