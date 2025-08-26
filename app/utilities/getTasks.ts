import { Task } from "../types/types"

export default async function getTasks(): Promise<Task[] | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            console.error(`Error fetching tasks: ${response.status}`)
            return null
        }

        const tasks = await response.json()
       
        return tasks
    } catch (error) {
        console.error(`Error fetching tasks: ${error}`)
        return null
    }
}