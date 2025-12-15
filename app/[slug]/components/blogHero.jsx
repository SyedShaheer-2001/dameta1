import Navbar2 from '@/components/ui/Navbar2'
import Image from 'next/image'
import React from 'react'
import titleIcon from '../../../assets/titleIcon.png'
import Link from 'next/link'

const BlogHero = ({ heading, cat = false }) => {
  return (
    <div className='w-full'>
      <div className="w-full bg-[#ebf0f4] flex flex-col justify-center items-center rounded-bl-3xl rounded-br-3xl">
        <Navbar2 />
        <div className="w-[95%] flex flex-col items-center gap-4 sm:gap-6 mb-6 sm:mb-10 mt-2">

          {/* Heading */}
          <h1 className="exo text-3xl sm:text-4xl md:text-[60px] lg:text-[80px] font-medium leading-tight md:leading-[90px] text-black">
            {cat ? `Category : ${heading}` : heading}
          </h1>

          {/* Meta Line */}
          <p className="exo text-sm sm:text-base text-zinc-600 flex items-center gap-2 flex-wrap">
            Posted by

            {/* Avatar Image */}
            <Image
              src="/gallery/avatar.png"
              alt="Site Admin"
              width={32}
              height={32}
              className="object-cover"
            />

            <span className="font-medium text-zinc-800">Site Admin</span>
            on August 23, 2025
          </p>


          {/* Banner Image */}
          <div className="rounded-3xl relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">

            <Image
              // src="https://dameta1.com/wp-content/uploads/2024/07/page-title-bg-min-2.jpg"
              src='/gallery/doc-img.png'
              alt="Blog banner"
              fill
              priority
              className="object-cover object-top object-right"
            />

            {/* Breadcrumb */}
            <div className="bottom-0 h-[50px] sm:h-[60px] px-4 sm:px-8 right-4 sm:right-10 md:right-28 absolute rounded-tl-2xl rounded-tr-2xl bg-[#ebf0f4] flex flex-wrap justify-center items-center gap-1 z-10">
              <Link
                href="#"
                className="exo font-medium text-xs sm:text-sm border-b-[1.5px] border-[#317b00]"
              >
                Home
              </Link>
              <span className="text-zinc-400 exo font-medium text-xs sm:text-sm"> / </span>
              <p className="exo font-medium text-xs sm:text-sm">
                {cat ? `Archive by Category "${heading}"` : heading}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default BlogHero
