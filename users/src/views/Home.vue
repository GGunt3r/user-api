<template>
  <div class="home">
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="/">
        Inicial
      </a>

      <a class="navbar-item" href="/admin/users">
        Lista de usuários
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary" href="/register">
            <strong>Registre-se</strong>
          </a>
          <a class="button is-light" href="/login">
            Login
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
    <img alt="Vue logo" src="../assets/logo.png">
    <Index msg="Bem-vindo a minha aplicação Vue.js com API REST"/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Index from '@/components/Index.vue'

export default {
  name: 'Home',
  components: {
    Index
  }
}
</script>
