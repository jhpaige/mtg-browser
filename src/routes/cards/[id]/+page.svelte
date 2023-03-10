<script lang="ts">
  export let data;
  $: ({ cardData } = data );
  
</script>

<img src={cardData.card.imageUrl} alt='Card Image'/>
<p>{JSON.stringify(cardData)}</p>