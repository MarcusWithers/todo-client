import { Task } from "../types/types"

export default async function updateTask(task: Task): Promise<Task | null> {
    try {
        const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
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
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const newTask = await response.json()
        console.log('Task updated successfully:', newTask)
        return newTask
    } catch (error) {
        console.error('Error updated task:', error)
        return null
    }
}