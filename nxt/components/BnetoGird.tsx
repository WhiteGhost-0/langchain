"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const REVEAL_DIRECTIONS = [
  {
    from: "inset(100% 0% 0% 0%)",
    to: "inset(0% 0% 0% 0%)",
  },
  {
    from: "inset(0% 0% 100% 0%)",
    to: "inset(0% 0% 0% 0%)",
  },
  {
    from: "inset(100% 0% 0% 0%)",
    to: "inset(0% 0% 0% 0%)",
  },
  {
    from: "inset(0% 100% 0% 0%)",
    to: "inset(0% 0% 0% 0%)",
  },
  {
    from: "inset(0% 0% 100% 0%)",
    to: "inset(0% 0% 0% 0%)",
  },
  {
    from: "inset(100% 0% 0% 0%)",
    to: "inset(0% 0% 0% 0%)",
  },
  {
    from: "inset(0% 100% 0% 0%)",
    to: "inset(0% 0% 0% 0%)",
  },
]

function Bento() {
  const container = useRef(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".bento-card")

      const listeners = []

      cards.forEach((card, index) => {
        const image = card.querySelector(".bento-image")
        const content = card.querySelector(".bento-content")
        const direction =
          REVEAL_DIRECTIONS[index % REVEAL_DIRECTIONS.length]

        gsap.fromTo(
          card,
          {
            clipPath: direction.from,
          },
          {
            clipPath: direction.to,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        )

        if (image) {
          gsap.fromTo(
            image,
            {
              scale: 1.2,
            },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 35%",
                scrub: 1,
              },
            }
          )
        }

        if (content) {
          gsap.fromTo(
            content,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 40%",
                scrub: 1,
              },
            }
          )
        }

        const enter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          })
        }

        const move = (e) => {
          const rect = card.getBoundingClientRect()

          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5

          gsap.to(card, {
            rotationX: y * -5,
            rotationY: x * 5,
            transformPerspective: 1000,
            transformOrigin: "center",
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          })

          if (image) {
            gsap.to(image, {
              xPercent: x * -5,
              yPercent: y * -5,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            })
          }
        }

        const leave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          })

          if (image) {
            gsap.to(image, {
              xPercent: 0,
              yPercent: 0,
              duration: 0.6,
              ease: "power3.out",
              overwrite: "auto",
            })
          }
        }

        card.addEventListener("mouseenter", enter)
        card.addEventListener("mousemove", move)
        card.addEventListener("mouseleave", leave)

        listeners.push({ card, enter, move, leave })
      })

      ScrollTrigger.refresh()

      return () => {
        listeners.forEach(({ card, enter, move, leave }) => {
          card.removeEventListener("mouseenter", enter)
          card.removeEventListener("mousemove", move)
          card.removeEventListener("mouseleave", leave)
        })
      }
    },
    {
      scope: container,
    }
  )

  return (
    <section
      ref={container}
      className="h-dvh w-full overflow-hidden p-4"
    >
      <div className="grid h-full w-full grid-cols-12 grid-rows-12 gap-3">

        <div className="bento-card bento-hero col-span-7 row-span-8 overflow-hidden rounded-[2rem]">
          <img
            src="https://i.pinimg.com/736x/bd/2c/5c/bd2c5cd3e70f280972e8105227116e0b.jpg"
            alt=""
            className="bento-image h-full w-full object-cover"
          />
        </div>

        <div className="bento-card col-span-5 row-span-5 flex flex-col justify-between rounded-[2rem] bg-neutral-100 p-7 md:p-10">
          <div className="bento-content flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              01 — Remember
            </span>

            <span className="text-sm text-neutral-400">
              ↗
            </span>
          </div>

          <h2 className="bento-content max-w-md text-3xl font-medium leading-[1.05] tracking-tight text-neutral-900 md:text-5xl">
            You don't have to become someone else to be enough.
          </h2>
        </div>

        <div className="bento-card col-span-3 row-span-3 overflow-hidden rounded-[2rem]">
          <img
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85"
            alt=""
            className="bento-image h-full w-full object-cover"
          />
        </div>

        <div className="bento-card col-span-2 row-span-3 flex flex-col justify-between rounded-[2rem] bg-neutral-900 p-5 text-white">
          <span className="bento-content text-xs text-neutral-400">
            02
          </span>

          <p className="bento-content text-base leading-snug md:text-lg">
            Take your time.
            <br />
            Nothing is chasing you.
          </p>
        </div>

        <div className="bento-card col-span-7 row-span-4 flex items-end justify-between rounded-[2rem] border border-neutral-200 p-7 md:p-10">
          <div className="bento-content">
            <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-neutral-400">
              A different perspective
            </span>

            <h3 className="max-w-lg text-2xl font-medium leading-tight tracking-tight md:text-4xl">
              Your path doesn't need to look like theirs.
            </h3>
          </div>

          <span className="bento-content hidden text-3xl md:block">
            →
          </span>
        </div>

        <div className="bento-card col-span-2 row-span-4 overflow-hidden rounded-[2rem]">
          <img
            src="https://i.pinimg.com/736x/eb/89/d8/eb89d876d9fe8782a4fabf1c618ed367.jpg"
            alt=""
            className="bento-image h-full w-full object-cover"
          />
        </div>

        <div className="bento-card col-span-3 row-span-4 flex flex-col justify-between rounded-[2rem] bg-neutral-200 p-6">
          <span className="bento-content text-3xl">
            ✦
          </span>

          <p className="bento-content text-sm leading-relaxed text-neutral-700">
            There is no perfect version of you waiting somewhere.
            There is only the one you're becoming.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Bento