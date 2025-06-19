'use client'

import { useState, useRef, useEffect } from "react"
import { TypePage, TypePages } from "@/types/page"
import "@/Data/colorList"
import Columns from "../Columns/page"

interface ListParam {
  pages: TypePages
  pageId: string
  handleUpdatePageTitle: (pageId: string, newTitle: string) => void
  setAddPageId: (id : string) => void
  setAddColumnId: (id : string) => void
  setDisplayTaskForm: (on : boolean) => void
}

export default function List({
  pages,
  pageId,
  handleUpdatePageTitle,
  setAddPageId,
  setAddColumnId,
  setDisplayTaskForm
}: ListParam) {

  const currentPage: TypePage | undefined = pages.find(page => page.id === pageId)

  const [isEditing, setIsEditing] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)


  const handleAddTaskButtonPress = (pageId: string, columnId : string) => {
    if (pageId === '' || columnId === '') {
      alert('Add Task Page | Column Id is empty')
      return
    }
    setAddPageId(pageId)
    setAddColumnId(columnId)
    setDisplayTaskForm(true)
  }


  // Click outside to diable editmode
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isEditing && titleRef.current && e.target !== titleRef.current) {
        setIsEditing(false)
        if (currentPage){
          titleRef.current.innerText = currentPage.title
        }
      } 
    }
  
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isEditing, currentPage])
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const newTitle = titleRef.current?.innerText.trim()
      if (!newTitle && currentPage && titleRef.current){
        alert('Cannot have empty title')
        titleRef.current.innerText = currentPage.title
        return
      }
      if (currentPage && newTitle !== currentPage.title) {
        handleUpdatePageTitle(currentPage.id, newTitle)
      }
      setIsEditing(false)
    }
  }

  return (
    <div className="px-1 sm:px-4 w-full min-h-150 mx-auto">
      {!currentPage ? (
        <div className="h-full flex flex-col justify-center items-center">
          Loading...
        </div>
      ) : (
        <div className="p-4 relative">
          {isEditing &&(<span className="text-sm text-white bg-gray-400 py-0.5 px-2 rounded animate-pulse absolute top-1">Hit Enter To Save Title</span>)}
          <h1
            ref={titleRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className={`p-1 text-4xl font-bold mt-4 mb-6 focus:outline-none rounded-md ${isEditing && 'bg-gradient-to-r from-gray-200 to-white'}`}
            onClick={() => {
              setIsEditing(true)
              if (titleRef.current) titleRef.current.focus()
            }
            }
            onKeyDown={handleKeyDown}
            onBlur={() => setIsEditing(false)}
          >
            {currentPage.title}
          </h1>
          <Columns 
          currentPage={currentPage} 
          handleAddTaskButtonPress={handleAddTaskButtonPress}
          />
        </div>
      )}
    </div>
  )
}
