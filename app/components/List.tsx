'use client'

import { useState, useRef, useEffect } from "react"
import { ColorEnum, TypePage, TypePages, TypeTask } from "@/types/page"
import "@/Data/colorList"
import Columns from "./Columns"
import ConfirmModal from "./ComfirmModal"
import ColumnForm from "./ColumnForm"
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'

interface ListParam {
  pages: TypePages
  pageId: string
  setPageId: (pageId: string) => void
  handleUpdatePageTitle: (pageId: string, newTitle: string) => void
  setAddPageId: (id: string) => void
  setAddColumnId: (id: string) => void
  setDisplayTaskForm: (on: boolean) => void
  setDisplayTask: (task: TypeTask) => void
  setDisplayColumnId: (columnId: string) => void
  handleDeletePage: (pageId: string) => void
  handleAddColumn: (title: string, color: ColorEnum) => void
  handleDeleteColumn: (columnId: string) => void
  handleUpdateColumn: (columnId: string, title: string, color: ColorEnum) => void
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
  handleDeletePage,
  handleAddColumn,
  handleDeleteColumn,
  handleUpdateColumn
}: ListParam) {
  const [isEditing, setIsEditing] = useState(false)
  const [filterColumnId, setFilterColumnId] = useState<string[]>([])
  const [showFilter, setShowFilter] = useState(false)
  const [displayColumnForm, setDisplayColumnForm] = useState(false)

  const titleRef = useRef<HTMLHeadingElement>(null)
  const filterSelectorRef = useRef<HTMLDivElement>(null)
  const filterButtonRef = useRef<HTMLButtonElement>(null)

  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmTitle, setConfirmTitle] = useState('')
  const [confirmCallback, setConfirmCallback] = useState<() => void>(() => {})

  const currentPage: TypePage | undefined = pages.find(page => page.id === pageId)
  const currentColumns = currentPage?.columns ?? []
  const filteredColumns = currentColumns.filter(col => filterColumnId.includes(col.id)) ?? []

  const handleAddTaskButtonPress = (pageId: string, columnId: string) => {
    if (!pageId || !columnId) {
      alert('Add Task Page | Column Id is empty')
      return
    }
    setAddPageId(pageId)
    setAddColumnId(columnId)
    setDisplayTaskForm(true)
  }

  useEffect(() => {
    if (!pages || !pageId) return
    const currentPage = pages.find(p => p.id === pageId)
    if (!currentPage) return
    setFilterColumnId(currentPage.columns.map(col => col.id))
  }, [pages, pageId])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isEditing && titleRef.current && e.target !== titleRef.current) {
        setIsEditing(false)
        if (currentPage) {
          titleRef.current.innerText = currentPage.title
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isEditing, currentPage])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const clickInside =
        filterButtonRef.current?.contains(target) ||
        filterSelectorRef.current?.contains(target)
      if (!clickInside) {
        setShowFilter(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [showFilter])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const newTitle = titleRef.current?.innerText.trim()
      if (!newTitle && currentPage && titleRef.current) {
        alert('Cannot have empty title')
        titleRef.current.innerText = currentPage.title
        return
      }
      if (currentPage && newTitle && newTitle !== currentPage.title) {
        handleUpdatePageTitle(currentPage.id, newTitle)
      }
      setIsEditing(false)
    }
  }

  const handleToggleFilterColumnId = (columnId: string) => {
    const isInList = filterColumnId.includes(columnId)
    const update = isInList
      ? filterColumnId.filter(id => id !== columnId)
      : [...filterColumnId, columnId]
    setFilterColumnId(update)
  }

  const handleConfirmDisplay = (title: string, callback: () => void) => {
    setConfirmTitle(title)
    setConfirmCallback(() => callback)
    setShowConfirm(true)
  }

  const onConfirmDeletePage = () => {
    setShowConfirm(false)

    const index = pages.findIndex(page => page.id === pageId)
    let newIndex = 0
    if (index > 0) newIndex = index - 1
    else if (index === 0 && pages.length > 1) newIndex = 1

    if (pages[newIndex] && pages[newIndex].id !== pageId) {
      setPageId(pages[newIndex].id)
    }
    handleDeletePage(pageId)
  }

  const hasPagesToDisplay = pages && pages.length > 0

  return (
    <>
      {!hasPagesToDisplay ? (
        <div></div>
      ) : (
        <>
          {showConfirm && (
            <ConfirmModal
              title={confirmTitle}
              onConfirm={confirmCallback}
              onClose={() => setShowConfirm(false)}
            />
          )}

          {displayColumnForm && (
            <ColumnForm
              handleAddColumn={handleAddColumn}
              setDisplayColumnForm={setDisplayColumnForm}
            />
          )}

          <div className="px-1 sm:px-4 w-full mx-auto">
            <div className="p-4 relative">
              {isEditing && (
                <span className="text-sm text-white bg-yellow-500 py-0.5 px-2 rounded animate-pulse absolute top-1">
                  Press Enter To Save
                </span>
              )}
              <h1
                ref={titleRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className={`p-1 text-4xl font-bold mt-6 mb-4 focus:outline-none rounded-md ${
                  isEditing ? 'bg-gradient-to-r from-gray-200 to-white' : ''
                }`}
                onClick={() => {
                  setIsEditing(true)
                  if (titleRef.current) titleRef.current.focus()
                }}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsEditing(false)}
              >
                {currentPage?.title}
              </h1>

              {/* Toolbar */}
              <div className="flex gap-2 items-center mb-4 text-md">
                {/* Filter */}
                <div className="relative flex flex-col px-1">
                  <button
                    ref={filterButtonRef}
                    onClick={() => setShowFilter(prev => !prev)}
                    className={`py-1 px-3 rounded-md flex gap-2 items-center cursor-pointer ${
                      showFilter
                        ? 'bg-yellow-200 hover:bg-yellow-300'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    <span>Filter</span>
                    <EyeIcon className="h-6 w-5" />
                  </button>

                  {showFilter && (
                    <div
                      ref={filterSelectorRef}
                      className="absolute top-10 left-0 border border-gray-400  rounded-md shadow-lg bg-white"
                    >
                      <div className="p-2 flex flex-col gap-1">
                        {currentColumns.length > 0 ? (
                          currentColumns.map((col) => (
                            <div
                              key={col.id}
                              onClick={() => handleToggleFilterColumnId(col.id)}
                              className={`w-full px-2 min-w-35 pr-4 py-1 cursor-pointer rounded-sm ${
                                filterColumnId.includes(col.id)
                                  ? 'bg-amber-200 hover:bg-amber-300'
                                  : 'hover:bg-gray-200'
                              }`}
                            >
                              {col.title}
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-400 italic px-2 py-1 w-37">
                            There are no columns to filter
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Add column */}
                <div
                  onClick={() => setDisplayColumnForm(true)}
                  className="flex items-center gap-1 py-1 px-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
                  New Column
                  <PlusIcon className="h-4 w-4" />
                </div>

                {/* Delete Page */}
                <div
                  onClick={() => {
                    if (!currentPage) return
                    handleConfirmDisplay(`Delete ${currentPage.title} Page?`, onConfirmDeletePage)
                  }}
                  className="p-1 ms-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
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
                  handleDeleteColumn={handleDeleteColumn}
                  handleUpdateColumn={handleUpdateColumn}
                  handleConfirmDisplay={handleConfirmDisplay}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
