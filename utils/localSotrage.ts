import { TypePages } from '@/types/page'

// Default data
import { defaultPages } from '@/Data/defaultPages'

export function savePages(pages : TypePages){
  localStorage.setItem('pages', JSON.stringify(pages))
  console.log('Pages data saved to storage')
}

export function loadPages(){
  const pagesJSON = localStorage.getItem('pages')

  if (pagesJSON){
    console.log('Pages data loaded from storage')
    return JSON.parse(pagesJSON)
  } else {
    console.log('Pages data not found, use default pages data')
    return defaultPages
  }
}