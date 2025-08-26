import { Task } from "../types/types"

export default async function addNewTask(task: Task): Promise<Task | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks`, {
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
            throw new Error(`Error creating task: ${response.status}`)
        }

        const createdTask = await response.json()

        return createdTask
    } catch (error) {
        console.error('Error creating task:', error)
        return null
    }
}