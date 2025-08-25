import { Task } from "../types/types"

export default async function addNewTask(task: Task): Promise<Task | null> {
    try {
        const response = await fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: task.title,
                color: task.color
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const newTask = await response.json()
        console.log('Task created successfully:', newTask)
        return newTask
    } catch (error) {
        console.error('Error creating task:', error)
        return null
    }
}