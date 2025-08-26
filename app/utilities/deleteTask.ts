export default async function deleteTask(id: number): Promise<boolean> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error(`Error deleting task: ${response.status}`)
        }

        return true
    } catch (error) {
        console.error('Error deleting task:', error)
        
        return false
    }
}