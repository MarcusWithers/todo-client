export default async function deleteTask(id: number): Promise<boolean> {
    try {
        const response = await fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return true
    } catch (error) {
        console.error('Error deleting task:', error)
        
        return false
    }
}