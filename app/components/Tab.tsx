import { TypePages } from "@/types/page"

// Heroicon
import { ArrowLeftIcon } from '@heroicons/react/24/outline'


export default function Tab({
  pages,
  pageId,
  setPageId,
  handleAddPage,
}: {
  pages: TypePages
  pageId: string
  setPageId: (index: string)=>void
  handleAddPage: () => void
}){
  return (
      <div className="flex items-center gap-2 px-2 py-4 sm:px-6 flex-wrap">
        {pages.map((page) => (
          <div
          onClick={()=> setPageId(page.id)} 
           key={page.id} 
           className={`py-1 px-2 cursor-pointer text-sm rounded-lg hover:bg-gray-300 ${pageId === page.id ? 'bg-gray-200' : ''} transition`}>
            {page.title}
          </div>
        ))}
        <button 
        onClick={handleAddPage}
        className={`relative h-6 w-6 rounded-md cursor-pointer bg-gray-300 hover:bg-gray-400 transition`}>
          +

          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-yellow-400/70 rounded-4xl animate-ping  ${pages.length !==0 && 'hidden'}`}></div>
        </button>
        {pages.length === 0 && (
          <div className="flex gap-1 ms-1 justify-center items-center animate-pulse text-sm underline">
            <ArrowLeftIcon className="h-4 w-4"/>
            Start a new page here </div>
        )}
      </div>
  )
}