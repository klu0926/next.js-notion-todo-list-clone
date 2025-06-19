'use client'

import List from "../List/page"
import Detail from "../Detail/page"
import Tab from "../Tab/page"
import TaskForm from "../TaskForm/TaskForm"
import { TypePages } from "@/types/page"
import { useEffect, useState } from "react"
import { savePages, loadPages } from "@/utils/localSotrage"
import {addPage, deletePage, updatePageTitle, addTask} from "@/utils/pagesManager"


export default function HomePage() {
  const [pages, setPages] = useState<TypePages>([])
  const [pageId, setPageId] = useState('')

  // For adding new task (TaskForm)
  const [addPageId, setAddPageId] = useState('')
  const [addColumnId, setAddColumnId] = useState('')
  const [displayTaskForm, setDisplayTaskForm] = useState(false)

  if (pageId === '' && pages.length > 0){
    setPageId(pages[0].id)
  }

  // Load Page data on init
  useEffect(() => {
    setPages(loadPages())
  }, []) 

  const handleSavePages = (newPages : TypePages) => {
    setPages(newPages)
    savePages(newPages)
  }

  const handleAddPage = ()=>{
    addPage(setPages, 'new page')
  }

  const handleUpdatePageTitle = (pageId: string, newTitle: string) => {
    updatePageTitle(setPages, pageId, newTitle)
  }

  const onAddTaskButtonPress = (pageId, columnId) => {
    setPageId(pageId)
    columnId(columnId)
    setDisplayTaskForm(true)
  } 

  const handleAddTask = ( title:string, label:string) => {
    if (addPageId === '' || addColumnId ==='')
    {
      alert('Handle Add Task Missing page and column Id')
      return
    }
    addTask(setPages, addPageId, addColumnId, title, label)
  }

  return (
    <div className="min-h-screen">
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
            handleUpdatePageTitle={handleUpdatePageTitle}
            setAddPageId={setAddPageId}
            setAddColumnId={setAddColumnId}
            setDisplayTaskForm={setDisplayTaskForm}
           />
        </div>
        {displayTaskForm && (<TaskForm handleAddTask={handleAddTask} setDisplayTaskForm={setDisplayTaskForm}/>)}
        <Detail />
      </div>
    </div>
  )
}