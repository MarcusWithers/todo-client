import { Task } from "../types/types"

export default async function addNewTask(): Promise<Task[] | null> {
    try {
        const response = await fetch('http://localhost:3001/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const tasks = await response.json()
        console.log('Task created successfully:', tasks)
        return tasks
    } catch (error) {
        console.error('Error creating task:', error)
        return null
    }
}