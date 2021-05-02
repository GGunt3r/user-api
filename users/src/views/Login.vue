<template>
    <div>
        <h4 class="subtitle is-4">Login</h4>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="error != undefined">
                    <div class="notification is-danger">
                        {{error}}
                    </div>
                </div>
                <p>Email</p>
                <input type="email" placeholder="email@exemple.com" class="input" v-model="email">
                <p>Senha</p>
                <input type="password" placeholder="******" class="input" v-model="password">
                <hr>
                <button class="button is-black" @click="login">Entrar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    data(){
        return {
            password: '0',
            email: '',
            error: undefined
        }
    },
    methods: {
        login(){
            axios.post('http://localhost:3000/login',{
                password: this.password,
                email: this.email
            }).then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token);
                this.$router.push({name: 'Home'});
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