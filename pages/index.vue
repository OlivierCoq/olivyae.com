<template>
  <div id="ctr-main" class="container-fluid position-relative">
    <div class="row">
      <div id="hero" ref="hero" class="col d-flex flex-column justify-content-center align-items-center">
        <div class="ctr-logo text-center">
            <img src="~/assets/img/logo-white-1024x308.png" alt="Logo" />
        </div>
        <div class="container">
          <div class="row">
            <div class="d-flex w-100 flex-row justify-content-center">
              <a href="#music" class="music m-3 text-uppercase text-light text-decoration-none fs-3 lato">Listen Now <i class="fa fa-arrow-down"></i></a>
              <a href="/contact" class="contact m-3 text-uppercase text-light text-decoration-none fs-3 lato">Contact <i class="fa fa-arrow-right"></i></a> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-column justify-content-center align-items-center m-0 p-0 w-100">
        <div id="music" class="ctr-main p-3 p-md-5 w-100">
          <MusicLibrary />
        </div>
      </div>
    </div>
    <div class="row social-btns position-fixed">
      <div class="col-sm-12 col-md-6 offset-md-6 d-flex flex-row justify-content-end">
        <ul>
          <li v-for="(social, i) in social" :key="i" class="mx-2">
            <a :href="social.link" target="_blank">
              <i class="fa fa-2x" :class="`fa-${social.icon}`"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return {
        social: [
          { link: 'https://www.facebook.com/OliVyaeMusic', icon: 'facebook' },
          { link: 'https://www.instagram.com/oli.vyae/', icon: 'instagram' },
          { link: 'https://olivyae.bandcamp.com/', icon: 'bandcamp'},
          { link: 'https://soundcloud.com/oliolimusic', icon: 'soundcloud'},
          { link: 'https://www.youtube.com/@OliVyae', icon: 'youtube' }    
        ]
      }
    },
    created(){
    //  this.getFilters()
    },
    mounted() {
      this.scrollImg()
    },
    methods: {
      async getFilters(){
        this.filters = await [...this.$store.dispatch('loadFilters')]
      },
      scrollImg() {
        let lastScrollTop = 0;
        
        document.addEventListener('scroll', () => {
            let st = window.pageYOffset || document.documentElement.scrollTop;
            if(st > lastScrollTop) { 
              setTimeout(() => {
                document.body.classList.add('midnight')
                this.$refs.hero.classList.add('midnight') 
              }, 800);
            }
            else { 
              setTimeout(() => {
                document.body.classList.remove('midnight') 
                // documnet.getElementById('ctr-main').classList.remove('midnight')
                this.$refs.hero.classList.remove('midnight') 
              }, 800);
            }

            lastScrollTop = st <= 0 ? 0 : st; // Mobile
          }, false)
      }
    }
  } 
</script>

<style lang="scss">
  #ctr-main {
    transition: 2s ease;
    background-position:center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }

  .ten-pm { background-image: url(~/assets/img/tinified/bg_light.jpg); transition-delay: 2s ease;}
  .midnight{ background-image: url(~/assets/img/tinified/bg_dark.jpg); transition-delay: 2s ease;}
  #hero {
    width: 100%;
    height: 100vh;
    transition: 2s ease;
    background-position:center; 
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;

    .ctr-logo {
      width: 100%;

      img {
        @media(max-width: 992px) {
          width: 100%;
        }
      }
    }

  }
  .ctr-main {
    min-height: 900px;
    background-color: #00000082;
  }
  .social-btns {
    top: 15px;
    bottom: auto;
    right: 10px;
    z-index: 999;
    width: 100%;

    ul {
      list-style-type: none;
      li {
        display: inline-block;
        a {
          color: white;
          &:hover {color: #52BDF6;}
        }
      }
    }
  }
</style>