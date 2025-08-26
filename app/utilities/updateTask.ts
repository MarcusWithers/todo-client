import { Task } from "../types/types"

export default async function updateTask(task: Task): Promise<Task | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: task.title,
                color: task.color,
                completed: task.completed
            })
        })

        if (!response.ok) {
            throw new Error(`Error updating task: ${response.status}`)
        }

        const updatedTask = await response.json()

        return updatedTask
    } catch (error) {
        console.error('Error updating task:', error)
        return null
    }
}