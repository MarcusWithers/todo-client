'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ColorName, Colors, Routes, Task } from "../../types/types"

interface TaskFormProps {
    initialTask?: Partial<Task>
    onSubmit: (task: Task) => Promise<boolean>
    submitButtonText: string
    submittingText: string
    submitIcon?: React.ReactNode
    onBack?: () => void
}

export const TaskForm = ({ 
    initialTask, 
    onSubmit, 
    submitButtonText, 
    submittingText, 
    submitIcon,
    onBack 
}: TaskFormProps) => {
    const router = useRouter()
    const [selectedColor, setSelectedColor] = useState<ColorName>(initialTask?.color || "RED")
    const [title, setTitle] = useState<string>(initialTask?.title || '')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title || '')
            setSelectedColor(initialTask.color || "RED")
        }
    }, [initialTask])

    const handleBackClick = () => {
        if (onBack) {
            onBack()
        } else {
            router.push(Routes.HOME)
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const task: Task = {
            id: initialTask?.id,
            title,
            color: selectedColor 
        }

        const result = await onSubmit(task)

        if (result) {
            router.push(Routes.HOME)
        } else {
            console.error('Failed to submit task')
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
                        value={title}
                        placeholder="Ex. Brush your teeth"
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="colors" className="text-blue-500 font-bold mb-2 block">Color</label>
                    <div id="colors" className="flex items-center gap-3 flex-wrap">
                        {(Object.keys(Colors) as ColorName[]).map((colorName) => (
                            <button
                                key={colorName}
                                type="button"
                                className={`w-[52px] h-[52px] rounded-full border-2 flex-shrink-0 focus:outline-none transition-all duration-150 hover:cursor-pointer 
                                    ${selectedColor === colorName ? 'border-gray-300' : ''}`
                                }
                                style={{ backgroundColor: Colors[colorName] }}
                                aria-label={colorName}
                                onClick={() => setSelectedColor(colorName)}
                            />
                        ))}
                    </div>
                </div>
                
                <button 
                    className={`w-full bg-blue-500 text-gray-100 rounded-lg p-4 flex justify-center items-center gap-2 mt-5
                        ${(title.length === 0 || selectedColor === undefined || isSubmitting) ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`
                    }
                    type='submit' 
                    disabled={title.length === 0 || selectedColor === undefined || isSubmitting}
                >
                    {isSubmitting ? submittingText : submitButtonText}
                    {!isSubmitting && submitIcon}
                </button>
            </form>
        </div>
    )
}