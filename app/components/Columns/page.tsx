import { TypePage , TypeTask} from "@/types/page"
import Task from "../Task/page"


interface ColumnsParam  {
  currentPage : TypePage
  handleAddTaskButtonPress: (pageId:string, columnId: string) => void
  setDisplayTask: (task : TypeTask) => void
} 

export default function Columns({
  currentPage,
  handleAddTaskButtonPress,
  setDisplayTask
}: ColumnsParam){

  return (
          <div className="overflow-x-auto">
              <div className="flex gap-4 flex-nowrap w-max overflow-x-auto items-start py-2">
                  {/* Columns */}
                  {currentPage.columns.map((col) => (
                    <div
                      key={col.id}
                      className={`w-72 rounded-lg p-3 bg-${col.color}-50 shadow-md border border-gray-100`}
                    >
                      {/* Column header */}
                      <div className="flex justify-between">
                        <span className={`bg-${col.color}-300 rounded-sm py-1 px-2 text-sm font-bold`}>
                          {col.title}
                        </span>
                        <span
                          className={`w-7 h-7 text-center align-center text-sm p-1 rounded-md bg-${col.color}-300`}
                        >
                          {col.tasks.length}
                        </span>
                      </div>
    
                      {/* Task list */}
                      <div className="flex flex-col py-3 gap-3">
                        {col.tasks.map((task) => (
                          <Task
                            key={task.id}
                            task={task}
                            color={col.color}
                            setDisplayTask={setDisplayTask}
                          />
                        ))}

                        {/* New Task button */}
                        <button   
                        onClick={()=> handleAddTaskButtonPress(currentPage.id, col.id) }  
                        className={`border py-2 px-4 bg-${col.color}-100 rounded-lg border-gray-200 cursor-pointer text-start text-${col.color}-500 hover:bg-${col.color}-200`}>
                          + New Task
                          </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  )
}