import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task } from '../types/types'

interface TaskStore {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  removeTask: (id: number) => void
  updateTask: (task: Task) => void
  toggleTaskCompleted: (id: number) => void
  currentTask: Task | null
  setCurrentTask: (task: Task | null) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      setTasks: (tasks) => set(() => ({ tasks })),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      removeTask: (id) => set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) })),
      updateTask: (task) => set((state) => ({
        tasks: state.tasks.map(t => t.id === task.id ? task : t)
      })),
      toggleTaskCompleted: (id) => set((state) => ({
        tasks: state.tasks.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      })),
      currentTask: null,
      setCurrentTask: (task) => set(() => ({ currentTask: task }))
    }),
    {
      name: 'Todo List',
      partialize: (state) => {
        // Exclude currentTask from persisted state
        const { currentTask, ...rest } = state
        return rest
      }
    }
  )
)
