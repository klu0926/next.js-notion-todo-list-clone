import { TypePages, TypePage, TypeTask } from "@/types/page";
import { loadPages, savePages } from "./localSotrage";
import { generateID } from "./generateId";

// PAGES ----------
// Each function takes in the setPages funciton from Main.tsx
export function addPage(
  setPages : (pages: TypePages) => void, 
  pageTitle : string = 'New Page'
){
  // Load pages from localstorage()
  const pages = loadPages()

  // Create a new page object
  const newPage: TypePage = {
    id: generateID(),
    title: pageTitle,
    order: pages.length,
    columns: [
      { id: generateID(), title: 'Not started', order: 0, color: 'gray', tasks: [] },
      { id: generateID(), title: 'In Progress', order: 1, color: 'blue', tasks: [] },
      { id: generateID(), title: 'Completed', order: 2, color: 'green', tasks: [] },
    ]
  }
  // Create updared pages
  const updated = [...pages, newPage]

  // Save to storage and update
  savePages(updated)
  setPages(updated)
}


export function deletePage(setPages: (pages: TypePages) => void, pageId: string) {
  const pages : TypePages = loadPages()
  const updated = pages.filter(p => p.id !== pageId)

  // Save to storage and update
  savePages(updated)
  setPages(updated)
}


export function updatePageTitle(
  setPages: (pages: TypePages) => void, 
  pageId: string, 
  newTitle: string,
){
  const pages : TypePages = loadPages()
  const updated = pages.map(p => 
    p.id === pageId ? { ...p, title: newTitle } : p
  )
  // Save to storage and update
  savePages(updated)
  setPages(updated)
} 


// Task ----------
export function addTask(
  setPages: (pages: TypePages) => void, 
  pageId: string, 
  columnId: string,
  title: string = 'New Task',
  label: string = '',
){
  const pages : TypePages = loadPages()

  const newTask : TypeTask= {
    id: generateID(),
    title,
    label,
    date : new Date()
  }

  const updated = pages.map(page => {
    // other pages
    if (page.id !== pageId) return page

    // target page
    return{
      ...page,
      columns: page.columns.map(col => {
        // other columns
        if (col.id !== columnId) return col

        // target columns
        return {
          ...col,
          // other task + newTask
          tasks: [...col.tasks, newTask]
        }
      })
    } 
  } )
    // Save to storage and update
    savePages(updated)
    setPages(updated)
}


export function updateTask(
  setPages: (pages: TypePages) => void,
  pageId: string,
  columnId: string,
  taskId: string,
  updatedFields: {
    title?: string
    label?: string
    description?: string
  }
) {
  const pages: TypePages = loadPages()

  const updated = pages.map(page => {
    if (page.id !== pageId) return page

    return {
      ...page,
      columns: page.columns.map(col => {
        if (col.id !== columnId) return col

        return {
          ...col,
          tasks: col.tasks.map(task => {
            if (task.id !== taskId) return task

            return {
              ...task,
              ...updatedFields
            }
          })
        }
      })
    }
  })

  savePages(updated)
  setPages(updated)
}