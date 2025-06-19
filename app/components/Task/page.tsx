import { TypeTask } from "@/types/page"
import "@/Data/colorList"

export default function Task({
  task,
  color
}: {
  task: TypeTask,
  color: string
}){
  return (
    <div 
    key={task.id} 
    className={`border p-2 bg-white rounded-lg border-gray-200 shadow-sm cursor-pointer hover:bg-${color}-200`}>
    <p className="">
        {task.title}
      </p>
    {task.label && 
    <p className="my-1">
      <span className={`text-sm p-1 bg-${color}-100 `}>{task.label}</span>
    </p>
    }
  </div>
  )
}