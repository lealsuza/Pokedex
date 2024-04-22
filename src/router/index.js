import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalogo',
      component: () => import('../views/CatalogoView.vue')
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('../views/PokemonFavoritos.vue')
    },
    {
      path: '/pokemon/:id',
      component: () => import('../views/PokemonDetail.vue')
    }
  ]
})

export default router
