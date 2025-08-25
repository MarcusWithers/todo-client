import { Task } from "../../types/types"

interface Props {
    onConfirm: () => void
    onCancel: () => void
    task: Task | null
}

export const DeleteTaskModal = (props: Props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-bold mb-4 text-gray-900">Delete Task</h2>
                <p className="mb-6 text-gray-700">Are you sure you want to delete <span className="font-semibold">{props.task.title}</span>?</p>
                <div className="flex justify-end gap-2">
                    <button className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={props.onCancel}>Cancel</button>
                    <button className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600" onClick={props.onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    )
}