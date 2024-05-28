"use client"

import CategoryWidget from "../CategoryWidget"
import RoadmapWidget from "../RoadmapWidget"
import Image from "next/image"
import { useState } from "react"
import { NavSheet } from "./NavSheet"

function TitleWidget() {
  return (
    <nav className='w-full flex flex-1 lg:h-[138px] lg:flex-none'>
      <div className='lg:w-full flex-1 lg:flex-none lg:flex-0 w-full bg-radial-gradient flex justify-between items-center md:items-end md:justify-start p-6 md:rounded-btn'>
        <div className='flex flex-col'>
          <h1 className='font-bold text-[20px] tracking-[-0.33px] text-white'>
            Frontend Mentor
          </h1>
          <p className='text-white opacity-75 tracking-wider text-[15px]'>
            Feedback Board
          </p>
        </div>
        <div className='md:hidden'>
          <NavSheet />
        </div>
      </div>
    </nav>
  )
}

export default TitleWidget
