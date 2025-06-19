export interface TypeTask {
  id: string,
  title: string
  label?: string
  order?: number
  date?: Date
  description?: string
}

export interface TypeColumn {
  id: string,
  title: string
  order?: number
  color: string
  tasks: TypeTask[]
}

export interface TypePage {
  id: string,
  title: string
  order?: number
  columns: TypeColumn[]
}

export type TypePages = TypePage[]