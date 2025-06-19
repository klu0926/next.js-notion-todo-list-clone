import { TypePages } from '@/types/page'

// Default Pages is basically just a single page
export const defaultPages: TypePages = [
  {
    id: 'adadwfeffa',
    title: 'Todo List',
    order: 0,
    columns: [
      {
        id: 'poadd0w-cmpawomdao',
        title: 'Not started',
        order: 0,
        color: 'gray',
        tasks: [
          {
            id: 'adadadaakdopa0wdad',
            title: 'Week of July 7 Discussion',
            label: 'Art & Science',
            order: 0,
            date: new Date(),
            description: `What are some of the problems with capitalism that you learned about in the last two readings? Please refer to this or last week's reading when answering this question.`
          },
          {
            id: 'adadgfafa',
            title: 'Paragraph Assignment - Really Long Text here',
            label: 'Writing',
            order: 1,
            date: new Date(),
            description: `Complete APA 7 References citation for the texts you provide. Please choose peer-reviewed articles or academic grade chapters from a textbook – do not cite an entire book`
          },
        ]
      },
      {
        id: 'opkadkopdkaopdk',
        title: 'In Progress',
        order: 1,
        color: 'blue',
        tasks: [
          {
            id: 'adadfaf',
            title: 'CPAN 144 - Take Home Midterm',
            label: 'Frontend',
            order: 0,
            date: new Date(),
            description: `In this practical exam, you are tasked with creating a small, fully functional React application using Next.js. The app should demonstrate your understanding of component structure, state management, event handling, and conditional rendering. This is a take-home exam, and you are required to follow the given instructions carefully`
          },
        ]
      },
      {
        id: 'adpowkdokawdoa',
        title: 'Done',
        order: 2,
        color: 'green',
        tasks: []
      },
      {
        id: 'dadadada',
        title: 'Other',
        order: 3,
        color: 'yellow',
        tasks: []
      }
    ]
  },
  {
    id: 'awdmoapkdpo0-awdad',
    title: 'Todo List 2',
    order: 1,
    columns: [
      {
        id: 'lmdkaowdkopkofpkaod',
        title: 'Not started',
        order: 0,
        color: 'gray',
        tasks: [
          {
            id: 'awpodaopdkopakdpoa',
            title: 'CPAN 144 - Take Home Midterm',
            label: 'Frontend',
            order: 0,
            date: new Date(),
            description: `In this practical exam, you are tasked with creating a small, fully functional React application using Next.js. The app should demonstrate your understanding of component structure, state management, event handling, and conditional rendering. This is a take-home exam, and you are required to follow the given instructions carefully`
          },
          {
            id: 'daadfwadd',
            title: 'Paragraph Assignment',
            label: 'Writing',
            order: 1,
            date: new Date(),
            description: `Complete APA 7 References citation for the texts you provide. Please choose peer-reviewed articles or academic grade chapters from a textbook – do not cite an entire book`
          },
        ]
      },
      {
        id: 'awdmpioadkpaowkd',
        title: 'In Progress',
        order: 1,
        color: 'blue',
        tasks: []
      },
      {
        id: 'adkakdpokpowadkp',
        title: 'Completed',
        order: 2,
        color: 'green',
        tasks: []
      }
    ]
  }
]
