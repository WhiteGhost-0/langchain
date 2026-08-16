"use client"

import Image from "next/image"
import { motion } from "motion/react"


function Card () {
    return (
            <motion.div
            

            className="flex flex-col items-center justify-center h-[28rem] w-80 rounded-lg bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 cursor-pointer"> 
                <div className="text-center mb-4">
                    <h1 className="font-heading text-3xl font-bold text-gray-900">You are unique</h1>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                        <Image src="https://i.pinimg.com/736x/77/1b/c3/771bc379840c54de5f936b7713da04da.jpg" alt="image" width={200} height={200} className="rounded-lg object-cover shadow-md"/>
                    <div className="mt-6 w-full">
                        <div className="border-t-2 border-gray-200 pt-4"></div>
                        <p className="text-sm text-gray-600 leading-relaxed text-center mt-2">You are unique and special in your own way. You don't need to compare yourself to others. You matter to your people</p>
                    </div>
                </div>
            </motion.div>
    )
}


export default Card