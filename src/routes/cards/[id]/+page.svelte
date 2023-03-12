<script lang="ts">
  export let data;
  $: ({ cardData } = data );
  
  function goBack() {
    location.href = '/cards';
  }
</script>

<!-- <img src={cardData.card.imageUrl} alt='Card Image'/>
<p>{JSON.stringify(cardData)}</p> -->

<div class="page-wrapper">
  <button class="back-btn" on:click={goBack}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"/>
    </svg>
  </button>
  <div class="info-wrapper m-12">
    <div class="card-data m-5">
      <h1 class="card-name">{cardData.card.name}</h1>
      <div class="card-image-text card-image-text-in">
        <img src={cardData.card.imageUrl} alt={cardData.card.name + " Image"} class="card-image">
        {#if cardData.card.text}<div class="card-text font-semibold text-center mt-5">{cardData.card.text}</div>{/if}
      </div>
      <div class="card-specifics m-5">
        {#if cardData.card.manaCost}<div class="card-mana-cost">Cost: {cardData.card.manaCost}</div>{/if}
        {#if cardData.card.cmc}<div class="card-cmc">CMC: {cardData.card.cmc}</div>{/if}
        {#if cardData.card.colors}<div class="card-colors">Colors: {cardData.card.colors}</div>{/if}
        {#if cardData.card.type}<div class="card-type">Type: {cardData.card.type}</div>{/if}
        {#if cardData.card.types}<div class="card-type">Types: {cardData.card.types}</div>{/if}
        {#if cardData.card.rarity}<div class="card-rarity">Rarity: {cardData.card.rarity}</div>{/if}
        {#if cardData.card.setName}<div class="card-set-name">Set: {cardData.card.setName}</div>{/if}
        {#if cardData.card.artist}<div class="card-artist">Artist: {cardData.card.artist}</div>{/if}
        {#if cardData.card.number}<div class="card-number">Number: {cardData.card.number}</div>{/if}
      </div>
      {#if cardData.card.flavor}<div class="card-flavor font-medium italic text-center m-5">{cardData.card.flavor}</div>{/if}
    </div>
    <div class="card-image-text card-image-text-out m-10">
      <img src={cardData.card.imageUrl} alt={cardData.card.name + " Image"} class="card-image">
      {#if cardData.card.text}<div class="card-text font-semibold text-center mt-5">{cardData.card.text}</div>{/if}
    </div>
  </div>
</div>

<style>
  .page-wrapper {
    background-color: #ccc;
    min-height: 100vh;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
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

  .back-btn a {
    color: #fff;
    text-decoration: none;
  }
</style>