import Link from 'next/link'
import { Header } from './components/Header'
 
export default function NotFound() {
  return (
    <div>
      <Header />
      <h1 className='text-6xl text-center text-gray-50'>404</h1>
      <p className='text-center text-gray-50'>Page Not Found</p>
      <div className='w-full text-center mt-2'>
        <Link className='underline text-xl text-gray-50' href="/">Return Home</Link>
      </div>
    </div>
  )
}