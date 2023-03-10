<script>
  export let data;
  $: ({ cardData } = data );
</script>

<h1>{JSON.stringify(cardData)}</h1>