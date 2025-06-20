'use client'
import { useState } from "react"

interface TaskFormParam {
  handleAddTask: (pageId: string, label: string) => void
  setDisplayTaskForm: (display: boolean) => void
}

export default function TaskForm({ 
  handleAddTask,
  setDisplayTaskForm
}: TaskFormParam) {
  const [title, setTitle] = useState('')
  const [label, setLabel] = useState('')
  const [titleValidation, setTitleValidation] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() === '') {
      setTitleValidation('Title cannot be empty')
      return
    }
    handleAddTask(title.trim(), label.trim())
    handleClose()
  }

  const handleClose = () => {
    setDisplayTaskForm(false)
    setTitle('')
    setLabel('')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const title = e.target.value
    if (title.trim() === ''){
      setTitleValidation('Title cannot be empty')
    } else {
      setTitleValidation('')
    }
    setTitle(title)
  }   

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p className="text-sm px-2 text-red-400">{titleValidation}</p>
          <input
            type="text"
            placeholder="Label (optional)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
