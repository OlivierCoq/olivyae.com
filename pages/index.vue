<template>
  <div id="ctr-main" class="container-fluid position-relative">
    <div class="row">
      <div id="hero" class="col d-flex flex-column justify-content-center align-items-center">
        <div class="ctr-logo text-center">
            <img src="~/assets/img/logo-white-1024x308.png" alt="Logo">
        </div>
        <div class="container">
          <div class="row">
            <div class="ctr-cta-btns d-flex">
              <a href="#music" class="music m-3">Music Library</a>
              <a href="#contact" class="contact m-3">Contact</a> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex flex-column justify-content-center align-items-center">
        <div id="music" class="ctr-main">

        </div>
      </div>
    </div>
    <div class="row social-btns position-fixed">
      <div class="col-sm-12 col-md-6 offset-md-6 d-flex flex-row justify-content-end">
        <ul>
          <li v-for="(social, i) in social" :key="i" class="mx-2">
            <a :href="social.link">
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
        ]
      }
    },
    mounted() {
      this.scrollImg()
    },
    methods: {
      scrollImg() {
        let lastScrollTop = 0;

        
        this.$nextTick(() => {
          document.addEventListener('scroll', () => {
            let st = window.pageYOffset || document.documentElement.scrollTop;
            if(st > lastScrollTop) { 
              document.body.classList.add('midnight')
              documnet.getElementById('ctr-main').classList.add('midnight')
              document.getElementById('hero').classList.add('midnight') 
            }
            else { 
              document.body.classList.remove('midnight') 
              documnet.getElementById('ctr-main').classList.remove('midnight')
              document.getElementById('hero').classList.remove('midnight') 
            }

            lastScrollTop = st <= 0 ? 0 : st; // Mobile
          }, false)
        })
      }
    }
  } 
</script>

<style lang="scss">
  #ctr-main {
    transition: .9s ease;
  }

  .ten-pm { background-image: url(~/assets/img/bg_light.jpg); transition: .9s ease;}
  .midnight{ background-image: url(~/assets/img/bg_dark.jpg); transition: .9s ease;}
  #hero {
    width: 100%;
    height: 100vh;
    transition: .9s ease;

    .ctr-logo {
      width: 100%;

      img {
        @media(max-width: 992px) {
          width: 100%;
        }
      }
    }
    a {
      color: white;
      text-decoration: none;
      font-size: 1.5em;
      // width: 100%;
    }
    .ctr-cta-btns {
      width: 100%;
      flex-direction: row;
      justify-content: center;
    }
  }
  .ctr-main {
    height: 100vh;
    width: 98%;
    background-color: #00000082;
  }
  .social-btns {
    top: auto;
    bottom: 0;
    right: 5%;
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