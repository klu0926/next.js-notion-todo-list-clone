'use client'

import { useEffect, useState, useRef, useCallback } from "react"
import { TypeTask } from "@/types/page"
import styles from './slideIn.module.css'
import ConfirmModal from "../ComfirmModal"

// Heroicon
import { BackspaceIcon, CalendarIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/outline'

interface DetailParam {
  displayTask : TypeTask
  setDisplayTask: (task : TypeTask | null) => void
  handleUpdateTask:(title: string, label:string,description:string) => void
  handleDeleteTask: () => void
}

export default function Detail({
  displayTask,
  setDisplayTask,
  handleUpdateTask,
  handleDeleteTask
}:DetailParam){

const [toggle, setToggle] = useState(true) 
const [isEditing, setIsEditing] = useState(false)
const [showConfirm, setShowConfirm] =useState(false)
const [confirmTitle, setConfirmTitle] = useState('')

const titleRef = useRef<HTMLDivElement>(null)
const labelRef= useRef<HTMLDivElement>(null)
const descriptionRef = useRef<HTMLDivElement>(null)

const hide = useCallback(() => {
  // trigger slide out animation
  setToggle(false)

  // reset trigger, and hide detail page
  setTimeout(() => {
    setDisplayTask(null)
    setToggle(true)
  }, 500)
}, [setDisplayTask])

// load description to editable div
useEffect(() => {
  if (titleRef.current) {
    titleRef.current.innerText = displayTask.title || ''
  }
  if (labelRef.current) {
    labelRef.current.innerText = displayTask.label || 'Empty'
  }
  if (descriptionRef.current) {
    descriptionRef.current.innerText = displayTask.description || 'Insert Text Here...'
  }
}, [displayTask])

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    const clickedInside =
      titleRef.current?.contains(target) ||
      labelRef.current?.contains(target) ||
      descriptionRef.current?.contains(target) 

    if (!clickedInside) {
      setIsEditing(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)
  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
}, [])

// Click outside to hide detail
useEffect(() => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    // check if clicking not on task and detail page
    const clickedInside = 
    target.closest('.task') ||
    target.closest('.detail') ||
    target.closest('.confirm-modal')
    
    if (!clickedInside){
      hide()
    }

  }
  document.addEventListener('mousedown', handleClick)
  return () => document.removeEventListener('mousedown', handleClick)
}, [setDisplayTask, hide])


const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
  if (e.key !== "Enter" || !isEditing)  return
  e.preventDefault()

  const title = titleRef.current?.innerText.trim() || ''

  // Label (check for defaul)
  let label = labelRef.current?.innerText.trim() ?? ''
  label = label == 'Empty' ? '' : label

  // Des (check for defaul)
  let description = descriptionRef.current?.innerText.trim() ?? ''
  description = description == 'Insert Text Here...' ? '' : description

  if (!title){
    alert('Cannot have empty title')
    return
  }
  handleUpdateTask(title, label, description)
  // disable edit mode
  setIsEditing(false)
  if (titleRef.current) titleRef.current.blur()
  if (labelRef.current) labelRef.current.blur()
  if (descriptionRef.current) descriptionRef.current.blur()
}

const hideAndDeleteTask = () => {
  setShowConfirm(false)
  hide()
  handleDeleteTask()
}

  return(
    <>
    {
      showConfirm &&  
      <ConfirmModal
      title={confirmTitle}
      onConfirm={hideAndDeleteTask}
      onClose={() => setShowConfirm(false)}
      />
    }
    <div 
    onKeyDown={handleKeyDown}
    className={`${toggle ? styles.slideIn : styles.slideOut} detail fixed top-15 right-0 max-w-2xl w-8/10 rel `}>
      <div className="py-5 px-6 bg-white shadow-2xl border-t border-l rounded-l-xl w-full h-screen relative">
            <div className="flex mb-6 gap-2">

              {/* Hide */}
              <div 
                onClick={hide}
                className="p-1 rounded hover:bg-gray-200 cursor-pointer">
                  <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
              </div>

              {/* Delete */}
              <div 
                onClick={() => {
                  setConfirmTitle('Delete Task?')
                  setShowConfirm(true)
                }}
                className="p-1 rounded hover:bg-gray-200 cursor-pointer">
                  <TrashIcon className="w-5 h-5" />
              </div>

              {isEditing &&(<span className="text-sm text-white bg-yellow-500 py-0.5 px-2 rounded animate-pulse absolute top-5 left-25">Press Enter To Save</span>)}

            </div>
            <div className="px-8">
              {/* title  */}
            <div 
                ref={titleRef}
                contentEditable={true}
                onClick={() => setIsEditing(true)}
                 className="title font-bold text-4xl mb-4 focus:outline-0 focus:bg-gray-200 px-2 rounded">
            </div>
            <div className="flex flex-col gap-2 px-2">
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center text-gray-500 min-w-20">
                  <BackspaceIcon className="w-5 h-5" />
                  Label
                </div>
                <div 
                 ref={labelRef}
                  contentEditable={true}
                  onClick={() => setIsEditing(true)}
                  className={`w-full min-h-7 px-2 flex items-center hover:bg-gray-200 focus:outline-0 focus:bg-gray-200 rounded `}>   
                  </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center text-gray-500 min-w-20">
                  <CalendarIcon className="w-5 h-5" />
                  Date
                </div>
                <div 
                className="w-full min-h-7 px-2 flex items-center hover:bg-gray-200 rounded"
                >
                  {displayTask.date ?
                  new Date(displayTask.date).toLocaleDateString() : 
                  'Empty'  
                  }
                  </div>
              </div>

              <div 
                  contentEditable={true}
                  ref={descriptionRef}
                  onClick={() => setIsEditing(true)}
                  className={`description w-full min-h-40 p-2  whitespace-pre-wrap focus:outline-0 focus:bg-gray-100 rounded-md `}
                  >
              </div>

            </div>
            </div>
          </div>
    </div>
    </>
  )
}


