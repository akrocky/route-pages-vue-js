import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import TeamList from './components/teams/TeamsList.vue';
import UserFooter from './components/users/UsersFooter.vue';
import UsersList from './components/users/UsersList.vue';
const router=createRouter({
    history:createWebHashHistory() ,    
    routes:[
        {path:'/',redirect:'/teams'},
        {
            name:'teams',
    path:'/teams',
    meta:{needsAuth:true},
    components  :{default:TeamList,footer:TeamsFooter },
    children:[ {
        name:'team-members',
        path:':teamId',
        component:TeamMembers,
        props:true
    },]
    },
        {
    path:'/users',
    components  :{default:UsersList ,footer:UserFooter},
    beforeEnter(to,from,next){
console.log(to,from);
next();
    },

    },
   
    {
        path:'/:notFound(.*)',
        component:NotFound
    }

],
linkActiveClass:'active',
scrollBehavior(_,_2,savedPosition){
    if (savedPosition) {
       return savedPosition; 
    }
  
    return{
        left:0,top:0
    };
}
});
router.beforeEach(function (to,from,next) {
    console.log('global each')
    console.log(to,from);
    if (to.meta.needsAuth) {
       next() 
    }else{
        next();
    }
    
    // if (to.name==='team-members') {
    //     next()
    // }else{
    //
         next({name:'team-members',params:{teamId:'t2'}})
    // }
})
router.afterEach((to,from)=>{
   // sending analytics data
   console.log(to,from) 
})
const app = createApp(App)
app.use(router);
app.mount('#app');
