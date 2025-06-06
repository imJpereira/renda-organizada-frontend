import { createRouter, createWebHistory } from 'vue-router'
import ExpensesView from '../views/ExpensesView.vue'
import PlansView from '@/views/PlansView.vue'
import PlanDetailsView from '@/views/PlanDetailsView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import { useLoginStore } from '@/stores/loginStore'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/signin',
    },
    {
      path: '/despesas',
      name: 'Expenses',
      component: ExpensesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/planos',
      name: 'Plan',
      component: PlansView,
      meta: { requiresAuth: true }
    },
    {
      path: '/planos/:id',
      name: 'PlanDetail',
      component: PlanDetailsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignInView,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUpView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
})

function getToken() {
  const loginStore = useLoginStore(); 
  return loginStore.jsonWebToken; 
}

// Middleware executado antes de mudar a rota (nativo do Vue Router)
//to -> rota direcionada / from -> de onde vem / next -> necessário para passar o middleware
router.beforeEach((to, from, next) => {
  const token = getToken();

  if (to.meta.requiresAuth && !token) {
    next({ name: 'SignIn' });
  } else {
    next();
  }
});

export default router;
