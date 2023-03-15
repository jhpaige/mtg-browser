<script lang="ts">

  import { enhance } from '$app/forms';

  // Allows us to use form and data properties
  export let form;
  export let data;

  // Assigns initial card data to cardsData and isLoading/selectedItem to initial values
  
  let isLoading = false;
  let isChangingPage = false;
  let selectedItem = null;

  let cardsData = data.cardsData.cards;
  let currPage: number = 1;

  let textInput = '';
  let resInput = textInput;
  let currType: string = 'name';
  let resType = currType;

  // Adds spaces after commas in subtypes
  function formatCommas(stringVal: string) {
    return stringVal.replace(/,/g, ', ');
  }

  function handleCardClick(item) {
    isLoading = true;
    selectedItem = item;
  }

  function handleSearch() {
    if (resType != currType || resInput != textInput) {
      currPage = 1;
    }
    isChangingPage = true;
    cardsData = [];
  }

  function handleBackPress() {
    if (resType != currType || resInput != textInput) {
      currPage = 1;
    } else if (!isChangingPage) {
      currPage--;
    }
    cardsData = [];
    isChangingPage = true;
  }

  function handleNextPress() {
    if (resType != currType || resInput != textInput) {
      currPage = 1;
    } else if (!isChangingPage) {
      currPage++;
    }
    cardsData = [];
    isChangingPage = true;
  }

</script>

<!-- <p>{JSON.stringify(cardsData)}</p> -->

<div class="wrapper bg-gray-300">

  <h1 class="text-5xl m-10 font-black font-serif text-center">MTG Browser</h1>
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
    <div class="flex items-center border-b border-gray-500 py-2 w-80">
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

  {#if isLoading}
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  {/if}

</div>

<style>
  .wrapper {
    align-items: center;
    justify-content: top;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  img {
    border: 2px solid #ccc;
    border-radius: 13px;
  }

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

  .grid-item:hover {
    opacity: 0.5;
  }

  .grid-item img {
    width: 226px;
    height: auto;
    margin-bottom: 10px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ul li {
    margin-bottom: 10px;
  }
  
  .grid-item.selected {
    opacity: 0.2;
    transition: opacity 0.3s ease-out;
  }
  
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
  
  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin: auto;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>