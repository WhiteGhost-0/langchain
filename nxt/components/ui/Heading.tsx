"use client"

import React, { useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Heading() {
  const container = useRef(null)

  const headingOne = useRef(null)
  const headingTwo = useRef(null)
  const headingThree = useRef(null)
  const image = useRef(null)
  const newText = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  useGSAP(
    () => {
     
      const GAP = 65

      const headingRect = headingOne.current.getBoundingClientRect()
      const containerRect = container.current.getBoundingClientRect()

      const centerX = containerRect.width / 2
      const centerY = containerRect.height / 2

      const startLeft = headingRect.right - containerRect.left + GAP
      const startTop = headingRect.top - containerRect.top + headingRect.height / 2

      const startX = startLeft - centerX
      const startY = startTop - centerY
      // ---------------------------------------------------------------------------------------------

      gsap.set(image.current, { xPercent: -50, yPercent: -50, x: startX, y: startY })
      gsap.set(newText.current, { y: 40, autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=500vh",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(
        [headingOne.current, headingTwo.current, headingThree.current],
        {
          x: (i) => ["-70vw", "70vw", "-60vw"][i],
          y: (i) => ["-10vh", "-8vh", "15vh"][i],
          autoAlpha: 0,
          ease: "power2.out",
          duration: 2,
        },
        0
      )
      .to(
        image.current,
        {
          x: 0,
          y: 0,
          ease: "power2.inOut",
          duration: 2,
        },
        0
      )
      .to(
        image.current,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          ease: "power2.inOut",
          duration: 2.5,
        },
        2
      )
      .to(
        newText.current,
        {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          duration: 2.5,
        },
        2
      )
      .to({}, { duration: 1.5, ease: "none" })

    },
    { scope: container, dependencies: [imgLoaded] }
  )

  const handleImageLoad = () => setImgLoaded(true)

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden ">
      <div ref={headingOne} className="absolute left-4 top-[25%] z-10">
        <h1 className="whitespace-nowrap text-6xl font-semibold leading-none tracking-tighter text-neutral-900">
          You Are Not Like Everyone Else.
        </h1>
      </div>

      <div ref={image} className="absolute left-1/2 top-1/2 z-20 h-24 w-24 overflow-hidden rounded-lg shadow-lg">
        <img
          src="https://i.pinimg.com/1200x/cb/e1/a3/cbe1a359990b9a071dedb0bc1a92e103.jpg"
          alt=""
          className="h-full w-full object-cover"
          onLoad={handleImageLoad}
        />
      </div>

      <div ref={headingTwo} className="absolute right-4 top-[40%] z-10">
        <h1 className="whitespace-nowrap text-6xl font-semibold leading-none tracking-tighter text-neutral-900">
          And That&apos;s Your Strength.
        </h1>
      </div>

      <div ref={headingThree} className="absolute left-[30%] top-[55%] z-10">
        <h1 className="whitespace-nowrap text-6xl font-semibold leading-none tracking-tighter text-neutral-900">
          So Stop Trying to Be.
        </h1>
      </div>

      <div
        ref={newText}
        className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
      >
        <h2 className="text-7xl font-semibold tracking-tighter text-white mix-blend-difference">Be yourself.</h2>
      </div>
    </section>
  )
}