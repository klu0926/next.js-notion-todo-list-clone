import { TypeColumn, TypePage, TypeTask, ColorEnum } from "@/types/page"
import Task from "./Task"
import "@/Data/colorList"

// Heroicon
import { TrashIcon } from '@heroicons/react/24/outline'

interface ColumnsParam {
  currentPage: TypePage
  filteredColumns: TypeColumn[]
  handleAddTaskButtonPress: (pageId: string, columnId: string) => void
  setDisplayTask: (task: TypeTask) => void
  setDisplayColumnId: (columnId: string) => void
  handleDeleteColumn: (columnId: string) => void
  handleUpdateColumn: (columnId: string, title:string, color: ColorEnum) => void
  handleConfirmDisplay: (title:string, callback: () => void) => void
}

export default function Columns({
  currentPage,
  filteredColumns,
  handleAddTaskButtonPress,
  setDisplayTask, 
  setDisplayColumnId,
  handleDeleteColumn,
  handleUpdateColumn,
  handleConfirmDisplay
}: ColumnsParam) {
  const isEmpty = filteredColumns.length === 0

  return (
    <div className="w-full">
      {isEmpty ? (
        <div className="w-full h-60 flex flex-col items-center justify-center text-gray-400  border border-gray-300 rounded">
          <p>No columns to display</p>
          <p>Check your filter or add a column</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 flex-nowrap items-start py-2 min-w-full">
            {filteredColumns.map((col) => (
              <div
                key={col.id}
                className={`w-72 flex-shrink-0 rounded-lg p-3 bg-${col.color}-50 shadow-md border border-gray-100`}
              >
                {/* Column header */}
                <div className="flex justify-between">
                  <span className={`bg-${col.color}-300 rounded-sm py-1 px-2 text-sm font-bold`}>
                    {col.title}
                  </span>

                  {/* buttons and count*/}
                  <div className="flex gap-2">
                    {/* Delete Column */}
                    <div
                      onClick={() => 
                        { if (!currentPage) return
                         handleConfirmDisplay( `Delete ${col.title} Column?`,() => handleDeleteColumn(col.id))
                        }
                       }
                      className={`p-1 rounded text-gray-400 hover:bg-${col.color}-200 hover:text-gray-700 cursor-pointer`}
                    >
                      <TrashIcon className="h-5 w-5 " />
                    </div>
                  <span
                    className={`w-7 h-7 text-center align-center text-sm p-1 rounded-md bg-${col.color}-300`}
                  >
                    {col.tasks.length}
                  </span>
                  </div>
                  
                </div>

                {/* Task list */}
                <div className="flex flex-col py-3 gap-3">
                  {col.tasks.map((task) => (
                    <Task
                      key={task.id}
                      columnId={col.id}
                      task={task}
                      color={col.color}
                      setDisplayTask={setDisplayTask}
                      setDisplayColumnId={setDisplayColumnId}
                    />
                  ))}

                  {/* New Task button */}
                  <button
                    onClick={() => handleAddTaskButtonPress(currentPage.id, col.id)}
                    className={`border py-2 px-4 bg-${col.color}-100 rounded-lg border-gray-200 cursor-pointer text-start text-${col.color}-500 hover:bg-${col.color}-200`}
                  >
                    + New Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
