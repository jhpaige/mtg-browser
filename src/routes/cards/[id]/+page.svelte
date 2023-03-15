<script lang="ts">

  import { enhance } from '$app/forms';
	import { afterNavigate } from '$app/navigation';

  export let form;
  export let data;
  $: ({ cardData } = data);
  let relatedCards = [];
  let isLoading = false;
  let isLoadingRelated = false;
  let selectedItem = null;
  
  function goBack() {
    location.href = '/cards';
    isLoading = true;
  }

  function handleCardClick(item) {
    isLoading = true;
    selectedItem = item;
  }

  function formatCommas(stringVal: string) {
    return stringVal.replace(/,/g, ', ');
  }

  afterNavigate(async () => {
    isLoading = false;
    selectedItem = null;
  })

</script>

<!-- <img src={cardData.imageUrl} alt='Card Image'/>
<p>{JSON.stringify(cardData)}</p> -->

<div class="page-wrapper">
  <button class="back-btn" on:click={goBack}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"/>
    </svg>
  </button>
  <div class="info-wrapper m-12 mb-0">
    <div class="card-data m-5">
      <h1 class="card-name text-center">{cardData.name}</h1>
      <div class="card-image-text card-image-text-in">
        <img src={cardData.imageUrl} alt={cardData.name + " Image"} class="card-image">
        {#if cardData.text}<div class="card-text font-semibold text-center mt-5">{cardData.text}</div>{/if}
      </div>
      <div class="card-specifics m-5">
        {#if cardData.manaCost}<div class="card-mana-cost">Cost: {cardData.manaCost}</div>{/if}
        {#if cardData.cmc}<div class="card-cmc">CMC: {cardData.cmc}</div>{/if}
        {#if cardData.colors}<div class="card-colors">Colors: {cardData.colors}</div>{/if}
        {#if cardData.type}<div class="card-type">Type: {cardData.type}</div>{/if}
        {#if cardData.types}<div class="card-type">Types: {cardData.types}</div>{/if}
        {#if cardData.rarity}<div class="card-rarity">Rarity: {cardData.rarity}</div>{/if}
        {#if cardData.setName}<div class="card-set-name">Set: {cardData.setName}</div>{/if}
        {#if cardData.artist}<div class="card-artist">Artist: {cardData.artist}</div>{/if}
        {#if cardData.number}<div class="card-number">Number: {cardData.number}</div>{/if}
      </div>
      {#if cardData.flavor}<div class="card-flavor font-medium italic text-center m-5">{cardData.flavor}</div>{/if}
    </div>
    <div class="card-image-text card-image-text-out m-10">
      <img src={cardData.imageUrl} alt={cardData.name + " Image"} class="card-image">
      {#if cardData.text}<div class="card-text font-semibold text-center mt-5">{cardData.text}</div>{/if}
    </div>
  </div>
  <form method="post" use:enhance={() => {
    return async ({ result, update }) => {
      await update();
      relatedCards = result.data.relatedCards;
      isLoadingRelated = false;
    };
  }}>
    <input name="card-set" id="card-set" hidden bind:value={cardData.set}/>
    <button type="submit" class="m-5 flex-shrink-0 apprearance-none bg-white border-gray-400 hover:border-gray-500 text-sm border mx-2 text-black py-2 px-2 rounded shadow focus:outline-none focus:shadow-outline" hidden={ isLoadingRelated || relatedCards.length > 0 } on:click={() => {isLoadingRelated = true}}>
      Load Related Cards
    </button>
  </form>
  {#if relatedCards.length == 0}
    {#if isLoadingRelated}
      <div class="loading-spinner"></div>
    {/if}
  {:else}
    <h2 class="text-xl m-5">Related Cards</h2>
    <div class="grid">
      {#key relatedCards}
        {#each relatedCards as card}
          {#if card.imageUrl && card.multiverseid != cardData.multiverseid}
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

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 266px);
    justify-content: center;
    justify-items: center;
    align-items: center;
    column-gap: 20px;
    row-gap: 20px;
    margin: 60px;
    margin-top: 0px;
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
  
  .page-wrapper {
    background-color: #ccc;
    min-height: 100vh;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  
  .info-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 900px;
    background-color: #f2f2f2;
    border: 2px solid #ccc;
    border-radius: 50px;
  }

  .card-data {
    min-width: 200px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .card-image-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: 20px;
    min-width: 250px;
  }

  .card-image-text-out {
    display: flex;
  }

  .card-image-text-in {
    display: none;
  }

  @media (max-width: 715px) {
    .card-image-text-in {
      display: flex;
    }
    .card-image-text-out {
      display: none;
    }
  }

  .card-name {
    font-size: 24px;
    font-weight: bold;
    margin: 20px;
    align-self: center;
  }

  .card-image {
    width: 226px;
    height: 311px;
    border: 2px solid #ccc;
    border-radius: 13px;
  }

  .card-specifics > div {
    margin-bottom: 10px;
  }

  .back-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 10px;
    font-size: 16px;
    line-height: 1;
    background-color: #ccc;
    border-radius: 10px;
    transition: background-color 0.3s ease-in-out;
  }

  .back-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>