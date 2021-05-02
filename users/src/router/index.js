import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import successRegister from '../views/successRegister.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import axios from 'axios'

function AdminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){
    
    var req = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    console.log(req);

    axios.post('http://localhost:3000/validate', {}, req).then(res => {
    console.log(res);
    next();
    }).catch(err => {
      console.log(err.response);
      next('/login');
    });
  }else{
    next('/login');
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
  path: '/complet',
  name: 'Complet',
  component: successRegister
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: AdminAuth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
