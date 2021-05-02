<template>
<div>
    <div class="notification is-dark">
        <h4 class="subtitle is-4">Painel Administrativo</h4>
    </div>
    <div class="columns is-centered">
        <table class="table">
        <thead>
            <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Ações</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{user.nome}}</td>
                <td>{{user.email}}</td>
                <td>{{user.role | processRole}}</td>
                <td><button class="button is-dark">Editar</button> <button class="button is-black">Deletar</button></td>
            </tr>
        </tbody>
        </table>
    </div>
</div> 
</template>
<script>
import axios from 'axios'
export default {
    created(){

        var req = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }

        axios.get('http://localhost:3000/user', req).then(res => {
            console.log(res);
            this.users = res.data;
        }).catch(err => {
            console.log(err);
        })
    },
    date(){
        return{
            users: []
        }
    },
    filters: {
        processRole: function(value){
            if(value == 0){
                return 'Usuário'
            }else if(value == 1){
                return 'Administrador'
            }
        }
    }
}
</script>

<style scoped>

</style>