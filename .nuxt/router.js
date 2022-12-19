import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f1f3f792 = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _3bfc2088 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _1f3e5351 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _5596b03a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _f1f3f792,
    name: "admin"
  }, {
    path: "/contact",
    component: _3bfc2088,
    name: "contact"
  }, {
    path: "/login",
    component: _1f3e5351,
    name: "login"
  }, {
    path: "/",
    component: _5596b03a,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
