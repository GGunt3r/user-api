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
            console.log('login')
        }
    }
}
</script>

<style scoped>

</style>