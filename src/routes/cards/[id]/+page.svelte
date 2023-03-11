<script lang="ts">
  export let data;
  $: ({ cardData } = data );
  
</script>

<!-- <img src={cardData.card.imageUrl} alt='Card Image'/>
<p>{JSON.stringify(cardData)}</p> -->

<div class="wrapper">
  <div class="card-data">
    <h1 class="card-name">{cardData.card.name}</h1>
    <div class="card-specifics">
      <div class="card-mana-cost">Cost: {cardData.card.manaCost}</div>
      <div class="card-cmc">CMC: {cardData.card.cmc}</div>
      <div class="card-colors">Colors: {cardData.card.colors}</div>
      <div class="card-type">Type: {cardData.card.type}</div>
      <div class="card-type">Types: {cardData.card.types}</div>
      <div class="card-rarity">Rarity: {cardData.card.rarity}</div>
      <div class="card-set-name">Set: {cardData.card.setName}</div>
      <div class="card-artist">Artist: {cardData.card.artist}</div>
      <div class="card-number">Number: {cardData.card.number}</div>
    </div>
    <div class="card-flavor font-medium italic text-center">{cardData.card.flavor}</div>
  </div>
  <div class="card-image-text">
    <img src={cardData.card.imageUrl} alt={cardData.card.name + " Image"} class="card-image">
    <div class="card-text font-semibold text-center mt-5">{cardData.card.text}</div>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 900px;
    margin: 0 auto;
    background-color: #f2f2f2;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .card-data {
    min-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .card-data > div {
    margin: 20px;
  }

  .card-image-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: 20px;
    min-width: 250px;
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
  }

  .card-specifics > div {
    margin-bottom: 10px;
  }

</style>