import { TypePages } from "@/types/page"

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
      <div className="flex items-center gap-2 px-2 py-4 sm:px-6">
        {pages.map((page) => (
          <div
          onClick={()=> setPageId(page.id)} 
           key={page.id} 
           className={`py-1 px-2 cursor-pointer text-sm rounded-lg hover:bg-gray-300 ${pageId === page.id ? 'bg-gray-200' : ''}`}>
            {page.title}
          </div>
        ))}
        <button 
        onClick={handleAddPage}
        className="bg-gray-200 h-6 w-6 border-gray-50 rounded-md cursor-pointer hover:bg-gray-300">
          +
        </button>
      </div>
  )
}