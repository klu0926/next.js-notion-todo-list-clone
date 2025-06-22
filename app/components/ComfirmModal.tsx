'use client'

import { useEffect } from "react"


interface ConfirmModalProps {
  title: string
  onConfirm: () => void
  onClose: () => void
}

export default function ConfirmModal({ title = 'Confirm Title', onConfirm, onClose }: ConfirmModalProps) {

  // Click outside the modal will trigger onClose() callback
  useEffect(() => {
    const handleClickOutside = (e : MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('confirm-modal')){
        if (typeof onClose === 'function') {
          onClose()
        } 
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose]) 

  return (
    <div className="confirm-modal fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl text-center">
        <h2 className="text-lg mb-4">{title}</h2>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            No
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
