'use client'

import { useEffect } from "react";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import { useTaskStore } from "./store/taskStore";
import getTasks from "./utilities/getTasks";


export default function Home() {
  const setTasks = useTaskStore((state) => state.setTasks)

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks()
      if (fetchedTasks) {
        setTasks(fetchedTasks)
      }
    }
    fetchTasks()
  }, [])

  return (
    <div className='Home'>
      <Header />
      <TodoList />
    </div>
  )
}
