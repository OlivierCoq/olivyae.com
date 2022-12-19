export const MusicLibrary = () => import('../../components/MusicLibrary.vue' /* webpackChunkName: "components/music-library" */).then(c => wrapFunctional(c.default || c))
export const MusicPlayer = () => import('../../components/MusicPlayer.vue' /* webpackChunkName: "components/music-player" */).then(c => wrapFunctional(c.default || c))
export const NavBar = () => import('../../components/NavBar.vue' /* webpackChunkName: "components/nav-bar" */).then(c => wrapFunctional(c.default || c))
export const AlbumsGrid = () => import('../../components/Albums/AlbumsGrid.vue' /* webpackChunkName: "components/albums-grid" */).then(c => wrapFunctional(c.default || c))
export const AlbumsManager = () => import('../../components/Albums/AlbumsManager.vue' /* webpackChunkName: "components/albums-manager" */).then(c => wrapFunctional(c.default || c))
export const AlbumsEditAlbumInterface = () => import('../../components/Albums/EditAlbumInterface.vue' /* webpackChunkName: "components/albums-edit-album-interface" */).then(c => wrapFunctional(c.default || c))
export const AlbumsEditTrackInterface = () => import('../../components/Albums/EditTrackInterface.vue' /* webpackChunkName: "components/albums-edit-track-interface" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
