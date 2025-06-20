'use client'

import { useEffect, useState, useRef, useCallback } from "react"
import { TypeTask } from "@/types/page"
import styles from './slideIn.module.css'

// Heroicon
import { BackspaceIcon, CalendarIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'


interface DetailParam {
  displayTask : TypeTask,
  setDisplayTask: (task : TypeTask | null) => void
}

export default function Detail({
  displayTask,
  setDisplayTask
}:DetailParam){

const [toggle, setToggle] = useState(true) 
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
  if (descriptionRef.current) {
    descriptionRef.current.innerText = displayTask.description || ''
  }
}, [displayTask])


// Click outside to hide detail
useEffect(() => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    // check if clicking not on task and detail page
    if (!target.closest('.task') && !target.closest('.detail')) {
      hide()
    }
  }
  document.addEventListener('mousedown', handleClick)
  return () => document.removeEventListener('mousedown', handleClick)
}, [setDisplayTask, hide])




  return(
    <div className={`${toggle ? styles.slideIn : styles.slideOut} detail fixed top-15 right-0 w-1/2 max-w-3xl`}>
      <div className="py-5 px-6 bg-white shadow-md border-t border-l w-full h-screen">
            <div className="flex mb-10">
              <div 
                onClick={hide}
                className="p-1 rounded hover:bg-gray-200 cursor-pointer">
              <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
              </div>

            </div>
            <div className="px-8">
            <h1 className="font-bold text-4xl mb-4">
              {displayTask.title}
            </h1>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center text-gray-500 min-w-20">
                  <BackspaceIcon className="w-5 h-5" />
                  Label
                </div>
                <div className="min-w-20 min-h-7 px-2 flex items-center hover:bg-gray-200">
                  {displayTask.label ?
                  displayTask.label : 
                  'Empty'  
                  }
                  </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center text-gray-500 min-w-20">
                  <CalendarIcon className="w-5 h-5" />
                  Date
                </div>
                <div className="min-w-20 min-h-7 px-2 flex items-center hover:bg-gray-200">
                  {displayTask.date ?
                  new Date(displayTask.date).toLocaleDateString() : 
                  'Empty'  
                  }
                  </div>
              </div>

              <div 
                  contentEditable={true}
                  ref={descriptionRef}
                  className="description w-full min-h-40 p-2  whitespace-pre-wrap focus:outline-0 focus:bg-gray-100 rounded-md"
                  >
              </div>

            </div>
            </div>
          </div>
    </div>
  )
}


