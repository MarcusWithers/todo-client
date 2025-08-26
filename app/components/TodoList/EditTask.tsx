"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useTaskStore } from "../../store/taskStore"
import { Routes, Task } from '../../types/types'
import updateTask from '../../utilities/updateTask'
import { TaskForm } from './TaskForm'

export const EditTask = () => {
    const currentTask = useTaskStore((state) => state.currentTask)
    const setCurrentTask = useTaskStore((state) => state.setCurrentTask)
    const router = useRouter()

    useEffect(() => {
        if (!currentTask) {
            router.replace("/")
        }
    }, [currentTask, router])

    const handleBackClick = () => {
        setCurrentTask(null)
        router.push(Routes.HOME)
    }

    const handleSubmit = async (task: Task): Promise<boolean> => {
        const result = await updateTask(task)
        
        if (result) {
            setCurrentTask(null)
            return true
        } else {
           console.error("Failed to update task")
            throw new Error("Failed to update task")
        }
    }

    if (!currentTask) {
        return null
    }

    return (
        <TaskForm
            initialTask={currentTask}
            onSubmit={handleSubmit}
            submitButtonText="Save"
            submittingText="Saving Task..."
            submitIcon={
                <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6.5L5.5 9L9 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            }
            onBack={handleBackClick}
        />
    )
}