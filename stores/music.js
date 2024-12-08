
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const api_url = 'https://strapi-potr.onrender.com'
// const api_url = 'http://localhost:1337'
import qs from "qs";

export const useMusicStore = defineStore({
  id: "musicStore",
  state: () => {
    return {
      search: {
        query: "",
        results: [],
        filters: [],
        loading: false,
        error: null
      },
      interface: null,
      filters: [],
      active_filters: [],
      filter_key: 0,
      filter_option_key: 0,
      albums: [],
      artists: [],
      tracks: [],
      player: {
        track: null,
        playing: false,
        paused: false,
        selecting: false,
        track_time: '',
        elapsed: '',
        duration:'',
        volume: 0.75,
        mute: false
      },
      comp_key: 0
    };
  },
  actions: {
    // API methods:
    async init_music() {
      await this.fetch_albums()
      await this.fetch_artists()
      await this.fetch_tracks()
      await this.fetch_interface()
    },
    async fetch_albums() {
      this.albums = await fetch(`${api_url}/api/albums?${qs.stringify(
        {
          populate: [
            "title",
            "release_date",
            "artwork",
            "music_artists",
            "tracks",
            "ratings",
            "ratings.one_star",
            "ratings.two_stars",
            "ratings.three_stars",
            "ratings.four_stars",
            "ratings.five_stars"
          ],
        },
        { arrayFormat: "comma" },
      )}`)
        .then(res => res.json())
      .catch(err => console.error(err))
    },
    async fetch_artists() {
      this.artists = await fetch(`${api_url}/api/music-artists?${qs.stringify(
        {
          populate: [
            "name",
            "bio",
            "profile_picture",
            "pictures",
            "socials",
            "socials.platform",
            "socials.link",
            "albums",
            "albums.title",
            "albums.artwork",
            "albums.release_date",
            "albums.music_artists",
            "albums.ratings",
            "tracks"
          ],
        },
        { arrayFormat: "comma" },
      )}`)
        .then(res => res.json())
      .catch(err => console.error(err))
    },
    async fetch_tracks() {
      console.log('fetching tracks...')
      this.tracks = await fetch(`${api_url}/api/tracks?${qs.stringify(
        {
          populate: [
            "title",
            "audio_file",
            "album",
            "albums",
            "single_cover",
            "music_artists",
            "genres",
            "ratings",
            "ratings.one_star",
            "ratings.two_stars",
            "ratings.three_stars",
            "ratings.four_stars",
            "ratings.five_stars"
          ],
        },
        { arrayFormat: "comma" },
      )}`)
        .then(res => res.json())
      .catch(err => console.error(err))
      nextTick(()=> {
        this.search.results = this.tracks.data
      })
    },
    async fetch_interface() {
      this.interface = await fetch(`${api_url}/api/music-interface?${qs.stringify({
        populate: [
          "genres",
          "artists"
        ]
      })}`)
        .then(res => res.json())
      .catch(err => console.error(err))
    },
    reset() {
      // this.results = this.tracks
    },
    // Interface methods:
    scrub(e) {
      const audio_player = document.getElementById('audio_player'),
            timeline = document.getElementById('timeline'),
            end_width = window.getComputedStyle(timeline).width,
            target_time = e.offsetX / parseInt(end_width) * audio_player.duration

      audio_player.currentTime = target_time
    },
    reset_scrubber() {
      const audio_player = document.getElementById('audio_player')
      nextTick(() => {
        audio_player.currentTime = 0
        this.player.track_time = 0
        this.player.elapsed = '00:00'
        this.player.duration = this.format_time(audio_player.duration)
      })
    },
    scrub_int() {
      setInterval(() => {
        this.player.track_time = audio_player.currentTime / audio_player.duration * 100
        this.player.duration = this.format_time(audio_player.duration)
        this.player.elapsed = this.format_time(audio_player.currentTime)
        if(this.player.track_time === 100) { clearInterval(scrub_int) }
      }, 1000);
    },
    update_tracktime() {
      const audio_player = document.getElementById('audio_player')
      const thisObj = this
      nextTick(() => {
        if(this.player.playing) {
          this.scrub_int()
        } else {
          this.player.track_time = 0
          this.player.elapsed = '00:00'
          this.player.duration = this.format_time(audio_player.duration)
          //
        }
      })
    },
    format_time(num) {
      let seconds = parseInt(num), minutes = parseInt(seconds / 60)

      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60)
      minutes -= hours * 60;

      if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`
      else return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`
    },
    // User methods:
    play(track, index) {
      const target_track = track

      if(this.player.track) {
        if(this.player.track.id === track.id){ this.fire_play() }
        else {
          this.player.track = false
          this.player.playing = false
          this.player.paused = true
          nextTick(() => {
            this.player.track = track
            nextTick(() => { this.fire_play() })
            // wait until track is finished, and then play next track:
            
          })
        }
      } else {
        this.player.track = track
        nextTick(() => { this.fire_play() })
      }
    },
    pause() {
      // const thisObj = this
      const audio_player = document.getElementById('audio_player')
      audio_player.pause()
      this.player.playing = false
      this.player.paused = true
    },
    select_previous() {
      const target = this.player.track, prev = this.search.results.indexOf(target) - 1
      this.player.track = false
      nextTick(()=> {
        // console.log('selecting previous track', prev)
        this.player.track = this.search.results[prev] ? this.search.results[prev] : target
        const audio_player = document.getElementById('audio_player')
        // reset_scrubber()
        nextTick(() => { this.fire_play() })
      })
    },
    select_next() {
      const target = this.player.track, next = this.search.results.indexOf(target) + 1
      this.player.track = false
      nextTick(()=> {
        // console.log('selecting next track', next)
        this.player.track = this.search.results[next] ? this.search.results[next] : target
        const audio_player = document.getElementById('audio_player')
        audio_player.volume = this.player.volume
        // reset_scrubber()
        nextTick(() => { this.fire_play() })
      })
    },
    mute_track() {
      const audio_player = document.getElementById('audio_player')
      this.player.mute = !this.player.mute
      audio_player.muted = !audio_player.muted
    },
    adjust_volume(e) {
      const audio_player = document.getElementById('audio_player')
      const volume_adjuster = document.getElementById('volume_adjuster')
      const volume = (e.offsetX / volume_adjuster.offsetWidth)
      audio_player.volume = volume
      this.player.volume = volume
    },
    doSearch(e) {
      if(e.keyCode === 17) { return }
      if(!this.search.query.length) { this.clearSearch() }
      else {
        this.search.results = this.tracks.data.filter((track) => {
          return track.title.toLowerCase().includes(this.search.query.toLowerCase())
        })
      }
    },
    clearSearch() {
      this.search.results = this.tracks.data
      this.search.query = ''
    },
    doFilter(filter) {
      console.log('filtering by', filter)
      this.search.filters.push(filter)

      if (filter.type === 'genre') {

        this.search.results = this.search.results.filter((track) => {
          this.search.filters.push(filter)
          filter.active = true
          return track.genres.some((genre) => genre.label.toLowerCase() === filter.label.toLowerCase())
        })
      }

      if (filter.type === 'music_artist') {
        this.search.results = this.search.results.filter((track) => {
          this.search.filters.push(filter)
          filter.active = true
          return track.music_artists.some((artist) => artist.name.toLowerCase() === filter.label.toLowerCase())
        })
      }

    },
    clearFilters() {
      console.log('clearing filters')
      this.search.results = this.tracks.data
      this.search.filters.forEach((filter) => { filter.active = false })
      nextTick(() => { this.search.filters = [] })
    },
    // Legacy methods:
    fire_play() {
      const audio_player = document.getElementById('audio_player')
        nextTick(() => {
          audio_player.volume = this.player.volume
          audio_player.play()
          this.player.playing = true
          this.update_tracktime()
        })
    }
  },
  getters: {},
  persist: {
    enabled: true,
  },
});
