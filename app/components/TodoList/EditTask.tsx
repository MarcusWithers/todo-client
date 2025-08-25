"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useTaskStore } from "../../store/taskStore"
import { ColorName, Colors, Routes, Task } from '../../types/types'
import updateTask from '../../utilities/updateTask'

export const EditTask = () => {
    const currentTask = useTaskStore((state) => state.currentTask)
    const setCurrentTask = useTaskStore((state) => state.setCurrentTask)
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [color, setColor] = useState<ColorName>("BLUE")
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (!currentTask) {
            router.replace("/")
        } else {
            setTitle(currentTask.title)
            setColor(currentTask.color)
        }
    }, [currentTask, router])

   
    const handleBackClick = () => {
        setCurrentTask(null)
        router.push(Routes.HOME)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        const task: Task = {
            id: currentTask.id,
            title,
            color
        }
        const result = await updateTask(task)
        setIsSubmitting(false)
        if (result) {
            setCurrentTask(null)
            router.push('/')
        } else {
            alert('Failed to update task')
        }
    }

    return (
        <div className='max-w-[736px] m-auto'>
            <button 
                className='hover:cursor-pointer'
                onClick={handleBackClick}
            >
                <Image src='/ArrowLeft.svg' alt='Arrow Left' width={24} height={24} />
            </button>

            <form className='flex flex-col gap-4 mt-12' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='title' className='text-blue-500 font-bold'>Title</label>
                    <input
                        className='bg-[#262626] text-gray-100 p-3 rounded-lg border-[#333333] focus:outline-none focus:border-blue-500'
                        onChange={e => setTitle(e.target.value)}
                        type='text'
                        id='title'
                        value={title}
                        placeholder='Ex. Brush your teeth'
                    />
                </div>
                <div>
                    <label htmlFor='colors' className='text-blue-500 font-bold mb-2 block'>Color</label>
                    <div id='colors' className='flex items-center gap-3 flex-wrap'>
                        {(Object.keys(Colors) as ColorName[]).map((colorName) => (
                            <button
                                key={colorName}
                                type='button'
                                className={`w-[52px] h-[52px] rounded-full border-2 flex-shrink-0 focus:outline-none transition-all duration-150 hover:cursor-pointer ${color === colorName ? 'border-gray-300' : ''}`}
                                style={{ backgroundColor: Colors[colorName] }}
                                aria-label={colorName}
                                onClick={() => setColor(colorName)}
                            />
                        ))}
                    </div>
                </div>
                <button
                    className={`w-full bg-blue-500 text-gray-100 rounded-lg p-4 flex justify-center items-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
                    type='submit'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving Task...' : (
                        <>
                            Save
                            <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6.5L5.5 9L9 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}