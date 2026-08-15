import gsap from 'gsap'
import { SplitText } from 'gsap/all'

gsap.registerPlugin(SplitText)

export function createSplitTextAnimation(selector, type = 'chars', animationConfig = {}) {
  const defaultConfig = {
    y: 100,
    opacity: 0,
    ease: 'power2.out',
    stagger: 0.05,
    duration: 1,
    method: 'from',
    scrollTrigger: null,
  }

  const finalConfig = { ...defaultConfig, ...animationConfig }
  const textProperty = type === 'lines' ? 'lines' : type === 'words' ? 'words' : 'chars'

  let tl

  const split = SplitText.create(selector, {
    type: type,
    autoSplit: true,
    onSplit: (self) => {
      const { method, scrollTrigger, ...vars } = finalConfig

      tl = gsap.timeline(scrollTrigger ? { scrollTrigger } : {})

      if (method === 'to') {
        tl.to(self[textProperty], vars)
      } else {
        tl.from(self[textProperty], vars)
      }

      return tl
    },
  })

  return { split, timeline: tl }
}

export function splitChars(selector, config = {}) {
  return createSplitTextAnimation(selector, 'chars', config)
}
export function splitWords(selector, config = {}) {
  return createSplitTextAnimation(selector, 'words', config)
}
export function splitLines(selector, config = {}) {
  return createSplitTextAnimation(selector, 'lines', config)
}