<script lang="ts">

  // Import the enhance function from $app/forms
  import { enhance } from '$app/forms';

  // Declare form and data properties
  export let form: any;
  export let data: any;

  // Initialize isLoading, isChangingPage, and selectedItem
  let isLoading: boolean = false;
  let isChangingPage: boolean = false;
  let selectedItem: any = null;

  // Set the initial value of cardsData to data.cardsData.cards and currPage to 1
  let cardsData: any[] = data.cardsData.cards;
  let currPage: number = 1;

  // Initialize textInput, resInput, currType, and resType
  let textInput: string = '';
  let resInput: string = textInput;
  let currType: string = 'name';
  let resType: string = currType;

  // Adds spaces after commas in subtypes
  function formatCommas(stringVal: string): string {
    return stringVal.replace(/,/g, ', ');
  }

  // Handle card click event
  function handleCardClick(item: any): void {
    isLoading = true;
    selectedItem = item;
  }

  // Handle search event
  function handleSearch(): void {
    if (resType != currType || resInput != textInput) {
      currPage = 1;
    }
    isChangingPage = true;
    cardsData = [];
  }

  // Handle back button press event
  function handleBackPress(): void {
    if (resType != currType || resInput != textInput) {
      currPage = 1;
    } else if (!isChangingPage) {
      currPage--;
    }
    cardsData = [];
    isChangingPage = true;
  }

  // Handle forward button press event
  function handleNextPress(): void {
    if (resType != currType || resInput != textInput) {
      currPage = 1;
    } else if (!isChangingPage) {
      currPage++;
    }
    cardsData = [];
    isChangingPage = true;
  }

</script>

<div class="wrapper bg-gray-300">

  <!-- Page header -->
  <h1 class="text-5xl m-10 font-black font-serif text-center">MTG Browser</h1>

  <!-- Form that handles all submission data -->
  <form class="relative m-10 flex w-screen justify-center" method="post" use:enhance={() => {
    return async ({ result, update }) => {
      await update({ reset: false });
      cardsData = result.data.cardsApiData;
      resInput = result.data.textInput;
      resType = result.data.searchType;
      isChangingPage = false;
      isLoading = false;
      console.log(cardsData);
    };
  }}>
    <button id="back-button" on:click={handleBackPress} hidden={isChangingPage == true} disabled={currPage == 1 && isChangingPage == false} type="submit" class="fixed left-0 text-3xl bottom-0 h-full w-16 enabled:hover:bg-gray-200 enabled:hover:cursor-pointer disabled:opacity-20">
      {'<'}
    </button>
    <div hidden={isChangingPage == true} class="flex items-center border-b border-gray-500 py-2 w-80">
      <input name='text-input' id="text-input" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:outline-none text-base" type="text" placeholder="Search By..." bind:value={textInput}/>
      <div class="relative block appearance-none w-fit bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <select id="search-type" name='search-type' bind:value={currType} class="hover:cursor-pointer">
          <option value="name">Name</option>
          <option value="artist">Artist</option>
        </select>
      </div>
      <input name="page-number" id="page-number" hidden bind:value={currPage}/>
      <input name="is-changing-page" id="is-changing-page" hidden bind:value={isChangingPage}/>
      <button id="search-button" class="flex-shrink-0 apprearance-none bg-white border-gray-400 hover:border-gray-500 text-sm border mx-2 text-white py-2 px-2 rounded shadow focus:outline-none focus:shadow-outline" type="submit" on:click={handleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
      </button>
    </div>
    <button id="forward-button" on:click={handleNextPress} hidden={isChangingPage == true} disabled={cardsData.length < 100 && isChangingPage == false} type="submit" class="fixed right-0 text-3xl bottom-0 h-full w-16 enabled:hover:bg-gray-200 enabled:hover:cursor-pointer disabled:opacity-20">
      {'>'}
    </button>
  </form>

  <!-- Shows no results if no cards appear in results, otherwise displays cards -->
  {#if cardsData.length == 0}
    {#if isChangingPage}
      <div class="loading-spinner"></div>
    {:else}
      <h2>No Results</h2>
    {/if}
  {:else}
    <div class="grid">
      <!-- Rerenders when cardsdata rerenders and loops through cards -->
      {#key cardsData}
        {#each cardsData as card}
          {#if card.imageUrl}
            <a href={"/cards/" + card.multiverseid} on:click={() => handleCardClick(card)}>
              <div class="grid-item" class:selected={selectedItem === card}>
                <img src={card.imageUrl} alt={card.name + " Card Photo"}>
                <ul>
                  {#if card.artist}<li>Name: {card.name}</li>{/if}
                  {#if card.colors}
                    <li>Colors: {formatCommas(String(card.colors))}</li>
                  {/if}
                  {#if card.artist}<li>Artist: {card.artist}</li>{/if}
                  {#if card.subtypes}
                    <li>Subtypes: {formatCommas(String(card.subtypes))}</li>
                  {/if}
                </ul>
              </div>
            </a>
          {/if}
        {/each}
      {/key}
    </div>
  {/if}
  
  <!-- Shows spinner if page data is loading -->
  {#if isLoading}
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  {/if}

</div>

<style>
  /* Wrapper styles */
  .wrapper {
    align-items: center;
    justify-content: top;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Card image styles */
  img {
    border: 2px solid #ccc;
    border-radius: 13px;
  }

  /* Card grid styles */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 266px);
    justify-content: center;
    justify-items: center;
    align-items: center;
    column-gap: 20px;
    row-gap: 20px;
    margin: 60px;
    margin-top: 20px;
    margin-bottom: 20px;
    width: calc(100vw - 128px);
  }

  /* Card styles */
  .grid-item {
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    width: 266px;
    border: 2px solid #ccc;
    border-radius: 25px;
    padding: 20px;
    padding-bottom: 10px;
    opacity: 1;
    transition: opacity 0.3s ease-out;
  }

  /* Card hover styles */
  .grid-item:hover {
    opacity: 0.5;
  }

  /* Card image styles */
  .grid-item img {
    width: 226px;
    height: auto;
    margin-bottom: 10px;
  }

  /* Card details list styles */
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Card detail item styles */
  ul li {
    margin-bottom: 10px;
  }

  /* Selected card styles */
  .grid-item.selected {
    opacity: 0.2;
    transition: opacity 0.3s ease-out;
  }

  /* Loading overlay styles */
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Loading spinner styles */
  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin: auto;
  }

  /* Spin animation styles */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

</style>