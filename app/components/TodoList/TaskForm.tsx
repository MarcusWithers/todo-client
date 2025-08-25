'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useTaskStore } from "../../store/taskStore"
import { ColorName, Colors, Routes, Task } from "../../types/types"
import addNewTask from "../../utilities/addNewTask"

export const TaskForm = () => {

    const router = useRouter()
    const [selectedColor, setSelectedColor] = useState<ColorName>()
    const [title, setTitle] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const addTaskToStore = useTaskStore((state) => state.addTask)

    const handleBackClick = () => {
        router.push(Routes.HOME)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const task: Task = {
            title,
            color: selectedColor 
        }
        const result = await addNewTask(task)
        if (result) {
            addTaskToStore(result)
            router.push(Routes.HOME)
        } else {
            console.error('Failed to create task')
        }
        setIsSubmitting(false)
    }

    return (
        <div className='max-w-[736px] m-auto'>
            <button 
                className='hover:cursor-pointer'
                onClick={handleBackClick}
            >
                <Image src='/ArrowLeft.svg' alt='Arrow Left' width={24} height={24} />
            </button>

            <form className="flex flex-col gap-4 mt-12" onSubmit={handleSubmit}>

                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-blue-500 font-bold">Title</label>
                    <input 
                        className="bg-[#262626] text-gray-100 p-3 rounded-lg border-[#333333] focus:outline-none focus:border-blue-500"
                        onChange={handleTitleChange}
                        type="text" 
                        id="title"  
                        placeholder="Ex. Brush your teeth" 
                    />
                </div>

                <div>
                    <label htmlFor="colors" className="text-blue-500 font-bold mb-2 block">Color</label>
                    <div id="colors" className="flex items-center gap-3 flex-wrap">
                        {(Object.keys(Colors) as ColorName[]).map((colorName) => (
                            <button
                                key={colorName}
                                type="button"
                                className={`w-[52px] h-[52px] rounded-full border-2 flex-shrink-0 focus:outline-none transition-all duration-150 hover:cursor-pointer ${selectedColor === colorName ? 'border-gray-300' : ''}`}
                                style={{ backgroundColor: Colors[colorName] }}
                                aria-label={colorName}
                                onClick={() => setSelectedColor(colorName)}
                            />
                        ))}
                    </div>
                </div>
                
                <button 
                    className={`w-full bg-blue-500 text-gray-100 rounded-lg p-4 flex justify-center items-center gap-2 ${(title.length === 0 || selectedColor === undefined || isSubmitting) ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
                    type='submit' 
                    disabled={title.length === 0 || selectedColor === undefined || isSubmitting}
                >
                    {isSubmitting ? 'Creating Task...' : 'Add Task'}
                    {!isSubmitting && <Image src='/Plus.svg' alt='Plus icon' width={16} height={16} />}
                </button>
            </form>
        </div>
    )
}