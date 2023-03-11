<script lang="ts">

  export let data;
  $: ({ cardsData } = data );
  
</script>

<!-- <p>{JSON.stringify(cardsData.cards)}</p> -->

<div class="wrapper">
  <p>Search</p>
  <div class="grid">
    {#each cardsData.cards as card}
      {#if card.imageUrl}
          <div class="grid-item">
            <img src={card.imageUrl} alt={card.name + " Card Photo"}>
            <ul>
              <li>Name: {card.name}</li>
              <li>Color: {card.color}</li>
              <li>Artist: {card.artist}</li>
              <li>Subtypes: {card.subtypes}</li>
            </ul>
          </div>
      {/if}
    {/each}
  </div>

  <div>Pagination</div>
</div>

<style>
  .wrapper {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 311px);
    justify-content: center;
    grid-gap: 20px;
    margin: auto;
    width: 100%;
  }

  .grid-item {
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    width: 311px;
    padding: 20px;
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
</style>