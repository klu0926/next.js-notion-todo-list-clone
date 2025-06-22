'use client'
import { ColorEnum } from "@/types/page"
import { useState, useRef, useEffect, useCallback } from "react"
import "@/Data/colorList.ts"

interface ColumnFormParam {
  handleAddColumn: (title: string, color: ColorEnum) => void
  setDisplayColumnForm: (display: boolean) => void
}

export default function ColumnForm({
  handleAddColumn,
  setDisplayColumnForm
}: ColumnFormParam) {
  const [title, setTitle] = useState('')
  const [color, setColor] = useState<ColorEnum>(ColorEnum.Gray)
  const [titleValidation, setTitleValidation] = useState('')

  const modalRef = useRef<HTMLDivElement>(null)


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() === '') {
      setTitleValidation('Title cannot be empty')
      return
    }
    handleAddColumn(title.trim(), color)
    handleClose()
  }

  const handleClose = useCallback(() => {
    setDisplayColumnForm(false)
    setTitle('')
  }, [setDisplayColumnForm])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    if (title.trim() === '') {
      setTitleValidation('Title cannot be empty')
    } else {
      setTitleValidation('')
    }
    setTitle(title)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent)=>{
      const target = e.target as HTMLElement

      if (!modalRef.current?.contains(target)){
        handleClose()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [handleClose])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50 z-50">
      <div 
      ref={modalRef}
      className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Create New Column</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p className="text-sm px-2 text-red-400">{titleValidation}</p>

          <div className="mt-1">
            <label className="flex gap-2 items-center font-semibold h-10">
              Color
              <div className={`h-4 w-4 bg-${color}-400 mb-0.5`}></div>
            </label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value as ColorEnum)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {Object.values(ColorEnum).map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

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
