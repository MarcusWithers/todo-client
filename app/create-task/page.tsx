import { Header } from "../components/Header";
import { CreateTask } from "../components/TodoList";

export default function CreateTaskPage() {
  return (
    <div className='CreateTask'>
      <Header />
      <CreateTask />
    </div>
  )
}
