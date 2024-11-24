if (input) {
	// Add a header of level X, e.g. input = 2 means header level 2
	const name = dv.current().file.name.replace(/^@/, '')
	dv.header(input, 'Tasks referencing ' + name)
}

function tasksMentioningPerson(tasks, person) {
	console.log(tasks[0])
	return tasks.filter((task) => task.text.includes(person)).map((task) => task.text)
}

const person = dv.current().file.name
const pages = dv.pages("[[" + person + "]]").filter((page) => page.file.path !== "01 Project Management/🗄️ Completed tasks.md")
const tasks = pages.map(b => [b.file.link, tasksMentioningPerson(b.file.tasks, person)]).flatMap(([key, values]) => values.map(value => [key, value]));

dv.table(
	["Note", "Task"],
	tasks
)
