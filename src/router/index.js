import Vue from 'vue'
import Router from 'vue-router'
import HomePage from "../components/home";
import RegisterPage from "../components/register";
import LoginPage from "../components/login";
import UserInfoPage from "../components/userinfo";
import UsersPage from "../components/users";
import AccountPage from "../components/account";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'HomePage',
      component:HomePage,
      meta:{
        islogin:true
      },
      children:[
          {
            path:'/users',
            name:'UsersPage',
            component:UsersPage
          },
          {
            path:'/info',
            name:'UserInfoPage',
            component:UserInfoPage,
            children:[
              {
                path:'/account',
                name:'AccountPage',
                component:AccountPage
              }
            ]
          }
      ]
    },
    {
      path:'/reg',
      name:'RegisterPage',
      component:RegisterPage
    },
    {
      path:'/login',
      name:'LoginPage',
      component:LoginPage
    }
    // {
    //   path:'/account',
    //   name:'AccountPage',
    //   component:AccountPage
    // }
  ]
})



