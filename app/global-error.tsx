'use client'

import Link from "next/link"
import { Header } from "./components/Header"
 
export default function GlobalError() {
  return (
    <div>
      <Header />
      <h2 className='text-4xl text-center text-gray-50'>Something went wrong!</h2>
      <div className='w-full text-center mt-2'>
        <Link className='underline text-xl text-gray-50' href="/">Return Home</Link>
      </div>
    </div>
  )
}