<template>
  <nav>
    <ul class="container">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
  </nav>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
// reset
html,
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.flex-column {
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 800px;
  width: 100%;
}
nav {
  width: 100%;
  display: flex;
  justify-content: center;
  ul {
    width: 100%;
    padding: 0;
    list-style-type: none;

    display: flex;
    justify-content: space-around;
  }
}
</style>
