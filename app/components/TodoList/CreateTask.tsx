"use client"

import Image from "next/image"
import { useTaskStore } from "../../store/taskStore"
import { Task } from "../../types/types"
import addNewTask from "../../utilities/addNewTask"
import { TaskForm } from "./TaskForm"

export const CreateTask = () => {
    const addTaskToStore = useTaskStore((state) => state.addTask)

    const handleSubmit = async (task: Task): Promise<boolean> => {
        const result = await addNewTask(task)

        if (result) {
            addTaskToStore(result)
            return true
        }
        throw new Error("Failed to create task")
    }

    return (
        <TaskForm
            onSubmit={handleSubmit}
            submitButtonText="Add Task"
            submittingText="Creating Task..."
            submitIcon={<Image src='/Plus.svg' alt='Plus icon' width={16} height={16} />}
        />
    )
}