<template>
    <div>
        <h2>Editando usuário</h2>
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
                <hr>
                <button class="button is-black" @click="update">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    created(){
        
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get('http://localhost:3000/user/'+ this.$route.params.id, req).then(res => {
            console.log(res);

            this.nome = res.data.nome;
            this.email = res.data.email;
            this.id = res.data.id;
        }).catch(err => {
            console.log(err.response);
            this.$router.push({name: 'Users'});
        })
    },
    data(){
        return {
            nome: '',
            email: '',
            id: -1,
            error: undefined
        }
    },
    methods: {
        update(){

            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }

            axios.put('http://localhost:3000/user', {
                nome: this.nome,
                email: this.email,
                id: this.id
            }, req).then(res => {
                console.log(res);
                this.$router.push({name: 'Users'})
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