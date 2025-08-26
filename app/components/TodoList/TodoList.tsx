'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useTaskStore } from "../../store/taskStore"
import { Routes, Task as TaskType } from "../../types/types"
import deleteTask from "../../utilities/deleteTask"
import updateTask from "../../utilities/updateTask"
import { DeleteTaskModal } from "../DeleteTaskModal/DeleteTaskModal"
import { Task } from "../Task/Task"

export const TodoList = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState<TaskType | null>(null)
    const router = useRouter()
    const tasks = useTaskStore((state) => state.tasks)
    const setTasks = useTaskStore((state) => state.setTasks)
    const removeTask = useTaskStore((state) => state.removeTask)
    const setCurrentTask = useTaskStore((state) => state.setCurrentTask)

    const handleCreateTaskClick = () => {
        router.push(Routes.CREATE_TASK)
    }

    const sortedTasks = [...tasks].sort((a, b) => {
        if ((a.completed ? 1 : 0) === (b.completed ? 1 : 0)) return 0
        return a.completed ? 1 : -1
    })

    const handleToggleTaskCompleted = async (task: TaskType) => {
        const updatedTask = { ...task, completed: !task.completed }
        const result = await updateTask(updatedTask)
        if (result) {
            const newTasks = tasks.map(t => t.id === task.id ? result : t)

            newTasks.sort((a, b) => {
                if ((a.completed ? 1 : 0) === (b.completed ? 1 : 0)) return 0
                return a.completed ? 1 : -1
            })
            setTasks(newTasks)
        }
    }

    const handleTaskDelete = (e: React.MouseEvent<Element, MouseEvent>, task: TaskType) => {
        e.stopPropagation()

        setTaskToDelete(task)
        setShowDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        if (!taskToDelete) return
        const result = await deleteTask(taskToDelete.id)
        if (result) {
            removeTask(taskToDelete.id)
        }
        setShowDeleteModal(false)
        setTaskToDelete(null)
    }

    const handleCancelDelete = () => {
        setShowDeleteModal(false)
        setTaskToDelete(null)
    }

    const countCompletedTasks = () => {
        return tasks.filter(task => task.completed).length
    }

    const onTaskClick = (task: TaskType) => {
        setCurrentTask(task)
        router.push(Routes.EDIT_TASK)
    }

    return (
        <div className='TodoList relative max-w-[736px] mx-auto px-4'>
            <div className='absolute -top-28 left-0 w-full px-4'>
                <button className='w-full bg-blue-500 text-gray-100 rounded-lg p-4 flex justify-center items-center gap-2 hover:cursor-pointer' onClick={handleCreateTaskClick}>
                    Create Task 
                    <Image src='/Plus.svg' alt='Plus icon' width={16} height={16} />
                </button>
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <span className='text-blue-400 text-sm font-bold'>Tasks</span>
                    <div className='flex items-center bg-gray-700 py-[2px] px-2 rounded-full'>
                        <span className='text-gray-200 font-bold text-xs'>{tasks.length}</span>
                    </div>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-[#8284fa] text-sm font-bold'>Completed</span>
                    <div className='flex items-center bg-gray-700 py-[2px] px-2 rounded-full'>
                        <span className='text-gray-200 font-bold text-xs'>{countCompletedTasks()} of {tasks.length}</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-3 mt-5'>
                {sortedTasks.map((task: TaskType) => (
                    <Task 
                        key={task.id} 
                        task={task} 
                        onClick={() => onTaskClick(task)} 
                        onToggleCompleted={() => handleToggleTaskCompleted(task)} 
                        onDelete={(e) => handleTaskDelete(e, task)}
                    />
                ))}
            
                {tasks.length === 0 && (
                    <div className='flex flex-col justify-center items-center mt-2 border-t pt-16 border-t-[#333333] rounded-md'>
                        <Image src="/Clipboard.svg" alt="Clipboard" width={56} height={56} />
                        <div>
                            <p className='text-[#808080] font-bold mt-4 text-center'>You have no tasks registered</p>
                            <p className='text-[#808080] text-center mt-3'>Create tasks and organize your to-do items</p>
                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <DeleteTaskModal 
                        onConfirm={handleConfirmDelete} 
                        onCancel={handleCancelDelete} 
                        task={taskToDelete}
                    />
                )}
            </div>
        </div>
    )
}