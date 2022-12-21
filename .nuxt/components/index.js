export { default as MusicLibrary } from '../../components/MusicLibrary.vue'
export { default as MusicPlayer } from '../../components/MusicPlayer.vue'
export { default as NavBar } from '../../components/NavBar.vue'
export { default as AlbumsGrid } from '../../components/Albums/AlbumsGrid.vue'
export { default as AlbumsManager } from '../../components/Albums/AlbumsManager.vue'
export { default as AlbumsEditAlbumInterface } from '../../components/Albums/EditAlbumInterface.vue'
export { default as AlbumsEditTrackInterface } from '../../components/Albums/EditTrackInterface.vue'

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
