// import { error } from '@sveltejs/kit';
import { page } from '$app/stores';
import { card } from 'mtgsdk';

// Fetches data from API when page form submitted
export const actions = {
  default: async ({ request }) => {

    // Saves form data to variables
    const searchInfo = await request.formData();

    console.log(searchInfo);

    const searchType = searchInfo.get('search-type');
    const textInput = searchInfo.get('text-input');
    const changePage = searchInfo.get('change-page');
    const pageNumber = searchInfo.get('page-number');
    console.log('changepage', changePage == 'true');

    // Variable to store the cards' api data
    let cardsApiData;
    // Assigns API url based on form request
    if (changePage == 'true') {
      cardsApiData = await card.where({ name: `${textInput}`, page: Number(pageNumber),  pageSize: 100 });
      console.log(cardsApiData)
    } else if (searchType === 'name') {
      cardsApiData = await card.where({ name: `${textInput}`, page: 1,  pageSize: 100 });
    } else if (searchType === 'artist') {
      cardsApiData = await card.where({ artist: `${textInput}`, page: 1,  pageSize: 100 });
    }
    // console.log(cardsApiData);

    // Returns cardsApiData as cards to page
    return {
      cardsApiData: cardsApiData,
      searchType: searchType,
      textInput: textInput,
      pageNumber: pageNumber
    }
  }
}