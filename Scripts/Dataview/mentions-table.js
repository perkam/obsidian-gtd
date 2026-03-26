if (input) {
  // Add a header of level X, e.g. input = 2 means header level 2
  const name = dv.current().file.name.replace(/^@/, "");
  dv.header(input, "Tasks referencing " + name);
}

function tasksMentioningPerson(tasks, person) {
  return tasks
    .filter((task) => task.text.includes(person))
    .map((task) => task.text);
}

const person = dv.current().file.name;

// Updated filter logic below
const pages = dv.pages("[[" + person + "]]").filter((page) => {
  const isCompletedFolder = page.file.path.startsWith(
    "01 Project Management/Projects/✔ Completed",
  );
  const isArchiveFile =
    page.file.path === "01 Project Management/🗄️ Completed tasks.md";

  return !isCompletedFolder && !isArchiveFile;
});

const tasks = pages
  .map((b) => [b.file.link, tasksMentioningPerson(b.file.tasks, person)])
  .flatMap(([key, values]) => values.map((value) => [key, value]));

dv.table(["Note", "Task"], tasks);
