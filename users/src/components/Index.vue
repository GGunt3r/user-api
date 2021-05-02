<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Essa página está sendo desenvolvida com base no conteudo do curso Formação Node.js<br>
      Você pode fuchicar no código dessa aplicação
      <a href="https://github.com/GGunt3r/user-api" target="_blank" rel="noopener">aqui</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
