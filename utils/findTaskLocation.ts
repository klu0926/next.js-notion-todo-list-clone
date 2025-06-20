import { TypePages, TypeTask } from "@/types/page";

export function findTaskLocation(
  pages: TypePages,
  taskId: string
): { pageId: string; columnId: string; task: TypeTask } | null {
  for (const page of pages) {
    for (const column of page.columns) {
      const task = column.tasks.find(task => task.id === taskId)
      if (task) {
        return {
          pageId: page.id,
          columnId: column.id,
          task
        }
      }
    }
  }
  return null
}