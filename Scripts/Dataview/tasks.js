/*
 * ---------------------
 * CONFIGURATION OPTIONS
 * ---------------------
 */

// Add the folders, tags, and headings which should be excluded.
const globalExclude = {
  folders: [
    'Utility',
    '01 Project Management/Projects/💤 Someday',
    '01 Project Management/📩 Inbox',
    '01 Project management/Projects/✔ Completed',
    '03 Daily Notes',
    '02 References'
  ],
  tags: [
    '#exclude-master-tasklist',
    '#completed'
  ],
  headings: [
    '🌱 Daily Habits'
  ]
}

const hideSubsectionName = ['Todo', 'Tasks']
const hideFutureScheduledTasks = false

/*
 * ----------------------------
 * END OF CONFIGURATION OPTIONS
 * ----------------------------
 */

const tasks = []
const noNextAction = []
const excludeItems = ['', ...globalExclude.tags]
globalExclude.folders.forEach(folder => excludeItems.push(`"${folder}"`))
const globalExcludeString = excludeItems.join(' AND -')

const Groups = {
  Waiting: 0,
  Priority: 1,
  Normal: 2,
  Someday: 3
}

function generateTaskElement(task, page) {
  let group = Groups.Normal
  if (task.tags.includes('#someday')) {
    group = Groups.Someday
  } else if (task.tags.includes('#waiting-on')) {
    group = Groups.Waiting
  } else if (task.text.includes('🔼') || page.tags.includes('#🔼')) {
    group = Groups.Priority
  }

  let date
  const hasDate = task?.text?.match(/➕\s?(\d{4}-\d{2}-\d{2})/)
  if (hasDate) {
    date = moment(hasDate[1].valueOf())
  } else if (page.created) {
    date = page.created?.ts || moment(page.created).valueOf()
  }
  date = date || page.ctime.ts

  // Extract time estimate from timeTag
  const timeTag = task.tags.find(t => t.startsWith('#time/')) || ''
  let timeEstimate = ''
  if (timeTag) {
    const timeValue = timeTag.replace('#time/', '')
    if (timeValue.endsWith('m')) {
      timeEstimate = `${parseInt(timeValue)} Minutes`
    } else if (timeValue.endsWith('h')) {
      timeEstimate = `${parseInt(timeValue)} Hours`
    } else {
      timeEstimate = timeValue
    }
  } else {
    timeEstimate = 'No Time Estimate'
  }

  const projectName = page.name || ''

  return {
    task: task, // Keep the original task object for interactivity
    date,
    group,
    timeEstimate,
    projectName
  }
}

/*
 * Process projects
 */
dv.pages('#project' + globalExcludeString)
  .where(project => !project.completed).file
  .forEach(project => {
    const sections = []
    if (!project.tasks.filter(t => !t.completed && t.text).length) {
      noNextAction.push(project)
    } else {
      project.tasks
        .where(t => !t.completed && t.text)
        .forEach(task => {
          const sectionName = task.section.subpath || 'root'
          if ((!sections.includes(sectionName) && !sectionName.includes('exclude')) || sectionName.includes('🕯')) {
            sections.push(sectionName)
            tasks.push(generateTaskElement(task, project))
          }
        })
    }
  })

/*
 * Process tasks
 */
dv.pages('-#project' + globalExcludeString)
  .where(p => p.file.tasks.length && !p['kanban-plugin'] && !p['exclude_master_tasklist']).file
  .forEach(page => {
    page.tasks
      .where(t => {
        if (hideFutureScheduledTasks) {
          const scheduledDate = t?.text?.match(/⏳\s?(\d{4}-\d{2}-\d{2})/)
          if (scheduledDate && moment(scheduledDate[1]) > moment()) return false
        }
        return t.text && !t.completed && !t.tags.includes('#exclude') &&
          (!t.header.subpath || !t.header.subpath.includes('exclude')) &&
          !globalExclude.headings.includes(t.header.subpath)
      })
      .forEach(task => tasks.push(generateTaskElement(task, page)))
  })

// Sort tasks by group and date
tasks.sort((a, b) => a.group - b.group || a.date - b.date)

// Organize tasks by time estimate and project
const tasksByTimeEstimate = {}

// Define the desired order for time estimates
const timeEstimateOrder = [
  'Waiting On',
  '5 Minutes',
  '15 Minutes',
  '30 Minutes',
  '60 Minutes',
  '90 Minutes',
  '120 Minutes',
  'No Time Estimate'
]

const timeEstimateHeaders = {
  'Waiting On': 'Waiting On',
  '5 Minutes': '⚪️5 Minutes',
  '🟢15 Minutes': '🟢15 Minutes',
  '30 Minutes': '🟡30 Minutes',
  '60 Minutes': '🟠60 Minutes',
  '90 Minutes': '🔴90 Minutes',
  '120 Minutes': '⚫️120 Minutes',
  'No Time Estimate': '❓No Time Estimate'
}

tasks.forEach(t => {
  let timeEstimate = t.timeEstimate
  let projectName = t.projectName || 'Next Actions'

  if (t.group === Groups.Waiting) {
    timeEstimate = 'Waiting On'
  }

  if (!tasksByTimeEstimate[timeEstimate]) {
    tasksByTimeEstimate[timeEstimate] = {}
  }
  if (!tasksByTimeEstimate[timeEstimate][projectName]) {
    tasksByTimeEstimate[timeEstimate][projectName] = []
  }
  tasksByTimeEstimate[timeEstimate][projectName].push(t.task)
})

// Output tasks grouped by time estimate and project
timeEstimateOrder.forEach(timeEstimate => {
  if (tasksByTimeEstimate[timeEstimate]) {
    dv.header(2, timeEstimateHeaders[timeEstimate])
    const projects = tasksByTimeEstimate[timeEstimate]

    // You can define the order of projects or sort them alphabetically
    const projectNames = Object.keys(projects)
    projectNames.sort((a, b) => {
      if (a === 'Next Actions') return -1
      if (b === 'Next Actions') return 1
      return a.localeCompare(b)
    })

    projectNames.forEach(projectName => {
      dv.header(4, projectName)
      const taskList = projects[projectName]
      dv.taskList(taskList, false)
    })
  }
})

// Projects without next action
if (noNextAction.length) {
  dv.header(2, '🚩 Projects without next actions')
  dv.list(noNextAction.map(p => p.link))
}
