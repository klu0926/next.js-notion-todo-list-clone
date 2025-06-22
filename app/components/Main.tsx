'use client'

import List from "./List"
import Detail from "./Detail/Detail"
import Tab from "./Tab"
import TaskForm from "./TaskForm"
import { ColorEnum, TypePages, TypeTask } from "@/types/page"
import { useEffect, useState } from "react"
import { loadPages } from "@/utils/localSotrage"
import {addPage, deletePage, updatePageTitle, addTask, updateTask, deleteTask, addColumn, deleteColumn} from "@/utils/pagesManager"
import {findTaskLocation} from "@/utils/findTaskLocation"


export default function HomePage() {
  const [pages, setPages] = useState<TypePages>([])
  const [pageId, setPageId] = useState('')

  // For adding new task (TaskForm)
  const [addPageId, setAddPageId] = useState('')
  const [addColumnId, setAddColumnId] = useState('')
  const [displayTaskForm, setDisplayTaskForm] = useState(false)

  // For displaying selected task (Detail)
  const [displayColumnId, setDisplayColumnId] = useState('')
  const [displayTask, setDisplayTask] = useState<TypeTask|null>(null)

  // Auto select the first page
  if (pageId === '' && pages.length > 0){
    setPageId(pages[0].id)
  }

  // Load Page data on init
  useEffect(() => {
    setPages(loadPages())
  }, []) 


  // Page ------------------------
  const handleAddPage = ()=>{
    addPage(setPages, 'new page')
  }

  const handleUpdatePageTitle = (pageId: string, newTitle: string) => {
    updatePageTitle(setPages, pageId, newTitle)
  }

  const handleDeletePage = (pageId:string)=> {
    deletePage(setPages, pageId)
  }

  // Column -------------------
  const handleAddColumn = (title:string, color: ColorEnum) => {
    addColumn(setPages, pageId, title, color)
  }

  const handleDeleteColumn = (columnId: string) => {
    if (!columnId || columnId.trim() === ''){
      alert('Handle Delete column missing column id')
      return
    }
    deleteColumn(setPages, pageId, columnId)
  }

  // const handleUpdateColumn = (columnId: string, title:string, color: ColorEnum) => {
  //   updateColumn(setPages, pageId, columnId, title, color)
  // }

  // Task -----------------------
  const handleAddTask = ( title:string, label:string) => {
    if (addPageId === '' || addColumnId ==='')
    {
      alert('Handle Add Task Missing page and column Id')
      return
    }
    addTask(setPages, addPageId, addColumnId, title, label)
  }

  const handleUpdateTask = (title:string, label:string | '', description: string | '') => {
    let locationObject = null
    if (displayTask){
      locationObject = findTaskLocation(pages, displayTask?.id)
    } else {
      alert('Cannot find current display task')
      return
    }

    if (!locationObject){
      alert('Cannot find task within pages')
      return
    }

    const {pageId, columnId} = locationObject
    if (displayTask){
      updateTask(setPages, pageId, columnId, displayTask?.id ,{
        title, label, description
      } )
    }
  }

  const handleDeleteTask = () => {
    if (displayTask){
      deleteTask(setPages, pageId, displayColumnId, displayTask.id)
    }
  }

  return (
    <div className="min-h-screen">
      {!pages ? (
        <div className="fixed inset-0 flex items-center justify-center text-gray-500 animate-pulse">
        <span className="animate text-3xl font-bold">Loading Data Plese Wait.</span>
        </div>
      ) : (
        <>
          <Tab
            pages={pages}
            pageId={pageId}
            setPageId={setPageId}
            handleAddPage={handleAddPage}
          />
          <div className="mx-auto px-2 py-4">
            <div className="flex flex-col justify-center mb-4">
              <List
                pages={pages}
                pageId={pageId}
                setPageId={setPageId}
                handleUpdatePageTitle={handleUpdatePageTitle}
                setAddPageId={setAddPageId}
                setAddColumnId={setAddColumnId}
                setDisplayTaskForm={setDisplayTaskForm}
                setDisplayTask={setDisplayTask}
                setDisplayColumnId={setDisplayColumnId}
                handleDeletePage={handleDeletePage}
                handleAddColumn={handleAddColumn}
                handleDeleteColumn={handleDeleteColumn}
              />
            </div>
  
            {displayTaskForm && (
              <TaskForm
                handleAddTask={handleAddTask}
                setDisplayTaskForm={setDisplayTaskForm}
              />
            )}
  
            {displayTask && (
              <Detail
                displayTask={displayTask}
                setDisplayTask={setDisplayTask}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
              />
            )}
          </div>
        </>
      )}
    </div>
  )

}