'use client'

import { useState, useRef, useEffect } from "react"
import { TypePage, TypePages , TypeTask} from "@/types/page"
import "@/Data/colorList"
import Columns from "./Columns"
import ConfirmModal from "./ComfirmModal"

// Heroicon
import { EyeIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'


interface ListParam {
  pages: TypePages
  pageId: string
  setPageId: (pageId: string)=>void
  handleUpdatePageTitle: (pageId: string, newTitle: string) => void
  setAddPageId: (id : string) => void
  setAddColumnId: (id : string) => void
  setDisplayTaskForm: (on : boolean) => void
  setDisplayTask: (task : TypeTask) => void
  setDisplayColumnId: (columnId : string) => void
  handleDeletePage:(pageId : string) => void
}

export default function List({
  pages,
  pageId,
  setPageId,
  handleUpdatePageTitle,
  setAddPageId,
  setAddColumnId,
  setDisplayTaskForm,
  setDisplayTask,
  setDisplayColumnId,
  handleDeletePage
}: ListParam) {


  const [isEditing, setIsEditing] = useState(false)
  const [filterColumnId, setFilterColumnId] = useState<string[]>([])
  const [showFilter, setShowFilter] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const filterSelectorRef = useRef<HTMLDivElement>(null)

  // Confirm Modal
  const [showConfirm, setShowConfirm] =useState(false)
  const [confirmTitle, setConfirmTitle] = useState('')

  const currentPage: TypePage | undefined = pages.find(page => page.id === pageId)

  const currentColumns = currentPage?.columns ?? []
  const filteredColumns = currentColumns.filter(col => filterColumnId.includes(col.id)) ?? []


  const handleAddTaskButtonPress = (pageId: string, columnId : string) => {
    if (pageId === '' || columnId === '') {
      alert('Add Task Page | Column Id is empty')
      return
    }
    setAddPageId(pageId)
    setAddColumnId(columnId)
    setDisplayTaskForm(true)
  }

    // On start put all column id to filter id
    useEffect(() => {
      if (!pages || pageId === '') return;
    
      const currentPage = pages.find(p => p.id === pageId);
      if (!currentPage) return;
    
      setFilterColumnId(currentPage.columns.map(col => col.id));
    }, [pages, pageId]);
  


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


  // off click to hide filter selector (showFilter = off)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showFilter &&
        filterSelectorRef.current &&
        !filterSelectorRef.current.contains(e.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const newTitle = titleRef.current?.innerText.trim()
      if (!newTitle && currentPage && titleRef.current){
        alert('Cannot have empty title')
        titleRef.current.innerText = currentPage.title
        return
      }
      if (currentPage&& newTitle && newTitle !== currentPage.title) {
        handleUpdatePageTitle(currentPage.id, newTitle)
      }
      setIsEditing(false)
    }
  }

  const handleToggleFilterColumnId = (colmnId : string) => {
    // chekc if in list
    // if in list, filter it out
    const isInList = filterColumnId.includes(colmnId)
    let update

    if (isInList){
      update = filterColumnId.filter(id => id !== colmnId)
    } else {
      update = [...filterColumnId, colmnId]
    }
    setFilterColumnId(update)
  } 


  const onConfirmDeletePage = () =>{
    setShowConfirm(false)

    // move to next pge
    const index = pages.findIndex(page => page.id === pageId)
    let newIndex = 0
    if (index > 0) {
      newIndex = index - 1
    } else if (index === 0 && pages.length > 1) {
      newIndex = 1 
    }

     // Set new pageId if a valid one exists
    if (pages[newIndex] && pages[newIndex].id !== pageId) {
    setPageId(pages[newIndex].id)
    }
    
    handleDeletePage(pageId)
  }

  return (
 <>
    {
      showConfirm &&  
      <ConfirmModal
      title={confirmTitle}
      onConfirm={onConfirmDeletePage}
      onClose={() => setShowConfirm(false)}
      />
    }
    <div className="px-1 sm:px-4 w-full mx-auto">
        <div className="p-4 relative">
          {isEditing &&(<span className="text-sm text-white bg-yellow-500 py-0.5 px-2 rounded animate-pulse absolute top-1">Press Enter To Save</span>)}
          <h1
            ref={titleRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className={`p-1 text-4xl font-bold mt-6 mb-4 focus:outline-none rounded-md ${isEditing && 'bg-gradient-to-r from-gray-200 to-white'}`}
            onClick={() => {
              setIsEditing(true)
              if (titleRef.current) titleRef.current.focus()
            }
            }
            onKeyDown={handleKeyDown}
            onBlur={() => setIsEditing(false)}
          >
            {currentPage && (currentPage.title)}
          </h1>

          {/* Top tool bar */}
          <div className="flex gap-2 items-center mb-2">
            {/* filter */}
           <div className="relative flex flex-col px-1 ">
            <button 
            onClick={() =>setShowFilter(!showFilter)}
            className={`bg-gray-200 py-1 px-3 rounded-md flex gap-2 items-center  ${showFilter ? 'bg-yellow-200 hover:bg-yellow-300' : 'bg-gray-200 hover:bg-gray-300'}` }
            >
              <span className="">Filter</span>
              <EyeIcon className="h-6 w-5" />
            </button>

            {showFilter &&
            <div 
            ref={filterSelectorRef}
            className="absolute top-10 border border-gray-300 w-fit rounded-md shadow-lg bg-white">
              <div className="p-2 flex flex-col gap-1">
              {currentColumns.map(col => (
              <div
               key={col.id} 
               onClick={() => handleToggleFilterColumnId(col.id)}
               className={`w-full px-2 min-w-30 pr-4 py-1 cursor-pointer rounded-sm hover:font-bold ${filterColumnId.includes(col.id) ? 'bg-amber-200' : ''}`}
               >
                {col.title}

              </div>
               ))}              
               </div>
            </div>
            }
            </div>
              {/* Delete page */}
              <div 
                onClick={() => {
                    setConfirmTitle('Delete Page?')
                    setShowConfirm(true)
                }}
                className="p-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer">
                  <TrashIcon className="h-5 w-5" />
                </div>
          </div>

            {currentPage && (
                 <Columns 
                 currentPage={currentPage}
                 filteredColumns={filteredColumns} 
                 handleAddTaskButtonPress={handleAddTaskButtonPress}
                 setDisplayTask={setDisplayTask}
                 setDisplayColumnId={setDisplayColumnId}
               />
            )}
        </div>
    </div>
    </>
  )
}
