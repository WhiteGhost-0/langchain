"use client"

import React, { useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(SplitText)

const NAV_ITEMS = [
  { item: "Home" },
  { item: "Reflect" },
  { item: "Journal" },
  { item: "Explore" },
]

function Navbar() {
  const navRef = useRef(null)

  useGSAP(
    () => {
      const links = navRef.current.querySelectorAll(".nav-link")

      links.forEach((link) => {
        const current = link.querySelector(".nav-current")
        const next = link.querySelector(".nav-next")

        const currentSplit = new SplitText(current, {
          type: "chars",
        })

        const nextSplit = new SplitText(next, {
          type: "chars",
        })

        gsap.set(nextSplit.chars, {
          yPercent: 100,
        })

        const enter = () => {
          gsap.to(currentSplit.chars, {
            yPercent: -100,
            stagger: 0.025,
            duration: 0.45,
            ease: "power3.inOut",
          })

          gsap.to(nextSplit.chars, {
            yPercent: 0,
            stagger: 0.025,
            duration: 0.45,
            ease: "power3.inOut",
          })
        }

        const leave = () => {
          gsap.to(currentSplit.chars, {
            yPercent: 0,
            stagger: 0.025,
            duration: 0.45,
            ease: "power3.inOut",
          })

          gsap.to(nextSplit.chars, {
            yPercent: 100,
            stagger: 0.025,
            duration: 0.45,
            ease: "power3.inOut",
          })
        }

        link.addEventListener("mouseenter", enter)
        link.addEventListener("mouseleave", leave)

        return () => {
          link.removeEventListener("mouseenter", enter)
          link.removeEventListener("mouseleave", leave)

          currentSplit.revert()
          nextSplit.revert()
        }
      })
    },
    {
      scope: navRef,
    }
  )

  return (
    <nav
      ref={navRef}
      className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between px-6"
    >
      {/* Logo */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-800">
          unfold.
        </h2>
      </div>

      {/* Navigation */}
      <ul className="flex items-center gap-8 text-sm text-neutral-800">
        {NAV_ITEMS.map((item, idx) => (
          <li key={idx}>
            <div className="nav-link group relative cursor-pointer">
              
              {/* Brackets */}
              <span className="flex items-center gap-1">
                <span className="text-neutral-400">[</span>

                {/* Text viewport */}
                <span className="relative block overflow-hidden">
                  
                  {/* Current text */}
                  <span className="nav-current block">
                    {item.item}
                  </span>

                  {/* Incoming text */}
                  <span className="nav-next absolute left-0 top-0 block">
                    {item.item}
                  </span>

                </span>

                <span className="text-neutral-400">]</span>
              </span>

            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar