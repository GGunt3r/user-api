<template>
    <div>
        <h2>Registro de usuários</h2>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="error != undefined">
                    <div class="notification is-danger">
                        {{error}}
                    </div>
                </div>
                <p>Nome</p>
                <input type="text" placeholder="Nome do usuário" class="input" v-model="nome">
                <p>Email</p>
                <input type="email" placeholder="email@exemple.com" class="input" v-model="email">
                <p>Senha</p>
                <input type="password" placeholder="******" class="input" v-model="password">
                <hr>
                <button class="button is-black" @click="register">Cadastrar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return {
            nome: '',
            password: '0',
            email: '',
            error: undefined
        }
    },
    methods: {
        register(){
            axios.post('http://localhost:3000/user', {
                nome: this.nome,
                password: this.password,
                email: this.email
            }).then(res => {
                console.log(res);
                this.$router.push({name: 'Home'})
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        }
    }
}
</script>

<style scoped>

</style>