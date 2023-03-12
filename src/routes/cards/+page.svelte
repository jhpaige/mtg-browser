<script lang="ts">

  import { onMount } from 'svelte';

  export let data;
  $: ({ cardsData } = data );

  onMount(() => {
    searchInput = document.querySelector('input');
    searchSelect = document.getElementById('search-select');
    searchButton = document.getElementById('search-button');
  });

  let isLoading = false;
  let selectedItem = null;

  // Adds spaces after commas in subtypes
  function formatSubtypes(subtypes: string) {
    return subtypes.replace(/,/g, ', ');
  }

  function handleClick(item) {
    isLoading = true;
    selectedItem = item;
  }
  
  function handleLoad() {
    isLoading = false;
  }

  let searchInput, searchSelect, searchButton;

  function handleSearch() {
    const inputValue = searchInput.value.trim();
    const selectValue = searchSelect.value;

    if (inputValue && selectValue) {
      // Perform search
      console.log(`Search for ${inputValue} by ${selectValue}`);

      // Remove event listener to prevent further clicks
      searchButton.removeEventListener('click', handleSearch);
    } else {

    }
  }

  $: {
    if (searchButton) {
      searchButton.addEventListener('click', handleSearch);
    }
  }

</script>

<!-- <p>{JSON.stringify(cardsData.cards[0])}</p>
<br>
<p>{JSON.stringify(cardsData.cards[1])}</p> -->

<div class="wrapper">

  <form class="relative m-6">
    <div class="flex items-center border-b border-b-2 border-gray-500 py-2 w-80">
      <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:outline-none text-base" type="text" placeholder="Search By...">
      <div class="relative block appearance-none w-fit bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <select id="search-select" class="">
          <option value="name">Name</option>
          <option value="artist">Artist</option>
        </select>
      </div>
      <button id="search-button" class="flex-shrink-0 apprearance-none bg-white border-gray-400 hover:border-gray-500 text-sm border mx-2 text-white py-2 px-2 rounded shadow focus:outline-none focus:shadow-outline" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
      </button>
    </div>
  </form>

  <div class="grid">
    {#each cardsData.cards as card}
      {#if card.imageUrl}
        <a href={"/cards/" + card.multiverseid} on:click={() => handleClick(card)}>
          <div class="grid-item" class:selected={selectedItem === card}>
            <img src={card.imageUrl} alt={card.name + " Card Photo"} on:load={handleLoad}>
            <ul>
              {#if card.artist}<li>Name: {card.name}</li>{/if}
              {#if card.color}<li>Color: {card.color}</li>{/if}
              {#if card.artist}<li>Artist: {card.artist}</li>{/if}
              {#if card.subtypes}
                <li>Subtypes: {formatSubtypes(String(card.subtypes))}</li>
              {/if}
            </ul>
          </div>
        </a>
      {/if}
    {/each}
  </div>

  {#if isLoading}
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  {/if}

  <div>Pagination</div>
</div>

<style>
  .wrapper {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    background-color: #ccc;
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
    margin: auto;
    width: 100%;
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
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
    margin: auto;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>