import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/usuario'
import MinhasReceitas from '@/views/MinhasReceitas.vue'
import MinhaConta from '@/views/MeuCadastro.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Page Inicial',
      meta: {
        allowAnonymous: true,
        auth: false
      },
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        allowAnonymous: true,
        auth: false
      },
      component: Login
    },
    {
      path: '/minhas-receitas',
      name: 'minhas-receitas',
      meta: {
        allowAnonymous: false,
        auth: true
      },
      component: MinhasReceitas
    },
    {
      path: '/meu-cadastro',
      name: 'MinhaConta',
      meta: {
        allowAnonymous: false,
        auth: true
      },
      component: MinhaConta
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.auth && !authStore.isAuthenticated) {
    return next({
      path: '/',
    })
  }
  return next()
})

export default router
