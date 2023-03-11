<div class="wrapper">
  <p>Search</p>

  <div class="grid">
    <div class="grid-item">
      <img src="photo1.jpg" alt="Photo 1">
      <ul>
        <li>Descriptor 1</li>
        <li>Descriptor 2</li>
        <li>Descriptor 3</li>
        <li>Descriptor 4</li>
      </ul>
    </div>
    <div class="grid-item">
      <img src="photo2.jpg" alt="Photo 2">
      <ul>
        <li>Descriptor 1</li>
        <li>Descriptor 2</li>
        <li>Descriptor 3</li>
        <li>Descriptor 4</li>
      </ul>
    </div>
    <!-- add more grid items here as needed -->
  </div>
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