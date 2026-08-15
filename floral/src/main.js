import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/all'
import './style.css'
import { splitChars, splitWords } from './utils/splitTextAnimator'

gsap.registerPlugin(ScrollTrigger)

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill())
    SplitText.getAll().forEach((split) => split.revert())
  })
}

const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

splitChars('.landing-page-left h1', {
  y: 100,
  opacity: 0,
  ease: 'power2.out',
  stagger: 0.1,
  duration: 1,
})

splitWords('.landing-page-right .landing-para p', {
  y: 20,
  opacity: 0,
  ease: 'power2.out',
  stagger: 0.06,
  duration: 0.6,
})

intro
  .from('.landing-img', {
    clipPath: 'inset(0% 0% 100% 0%)',
    duration: 1.2,
    ease: 'power4.inOut',
  })
  .from('.landing-img img', { scale: 1.15, duration: 1.6, ease: 'power3.out' }, 0)

const scrollTl = gsap.timeline({
  defaults: { ease: 'none' },
  scrollTrigger: {
    trigger: '.animation-section',
    start: 'top top',
    end: '+=4000',
    pin: true,
    scrub: 1,
  },
})

scrollTl
  .to('.initial-image img', {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    ease: 'power2.inOut',
    duration: 1,
  })
  .to('.initial-image-content h1', { scale: 1, ease: 'power2.inOut', duration: 1 }, '<')
  .to('.strip', { clipPath: 'inset(0% 0% 0% 0%)', stagger: 0.09, duration: 1 })
  .to('.image-cards-section', { xPercent: -300, duration: 1.5 }, '-=0.2')
  .to('.final-text-reveal .imagereveal img', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, '<')
  .to('.final-text-reveal-content', { xPercent: -100, duration: 1 }, '<')

document.querySelectorAll('.bento-tile').forEach((tile) => {
  const img = tile.querySelector('img')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: tile,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  })

  tl.from(tile, {
    y: 70,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
  })

  if (img) {
    tl.from(
      tile,
      {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1,
        ease: 'power4.inOut',
      },
      '<'
    ).from(
      img,
      {
        scale: 1.2,
        duration: 1.3,
        ease: 'power3.out',
      },
      '<'
    )
  }
})


const video = document.querySelector('.video-sec video')
video.pause()

gsap.set('.video-sec', { borderRadius: 16 })

const videoTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.video',
    start: 'top top',
    end: '+=2000',
    pin: true,
    scrub: 1,
    onEnter: () => video.play(),
    onEnterBack: () => video.play(),
    onLeave: () => video.pause(),
    onLeaveBack: () => video.pause(),
  },
})

videoTl.to('.video-sec', {
  width: '100vw',
  height: '100vh',
  borderRadius: 0,
  ease: 'none',
})

gsap.from('.footer-col, .footer-top', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.site-footer',
    start: 'top 90%',
  },
})


