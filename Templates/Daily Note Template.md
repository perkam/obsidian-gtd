---
created: <% tp.file.creation_date() %>
---
tags:: [[+Daily Notes]]

# <% moment(tp.file.title,'YYYY-MM-DD').format("dddd, MMMM DD, YYYY") %>

<< [[03 Daily Notes/<% tp.date.now("YYYY", -1) %>/<% tp.date.now("MM-MMMM", -1) %>/<% tp.date.now("YYYY-MM-DD-dddd", -1) %>|Yesterday]] | [[03 Daily Notes/<% tp.date.now("YYYY", 1) %>/<% tp.date.now("MM-MMMM", 1) %>/<% tp.date.now("YYYY-MM-DD-dddd", 1) %>|Tomorrow]] >>

---

## 🔼 Priority Tasks
```tasks
not done
description includes 🔼
hide task count
short mode
show tree
```

## 📅 Due/Scheduled Today and Due in 2 weeks
```tasks
not done
(due on <% tp.date.now("YYYY-MM-DD") %>) OR (scheduled on <% tp.date.now("YYYY-MM-DD") %>) OR (due before <% tp.date.now("YYYY-MM-DD") %>) OR (scheduled before <% tp.date.now("YYYY-MM-DD") %>)
hide task count
short mode
show tree
```
---
```tasks
not done
due after <% tp.date.now("YYYY-MM-DD") %>
due before <% tp.date.now("YYYY-MM-DD", +14) %>
hide task count
short mode
show tree
```
## 📝 Notes & Thoughts
- [ ] <% tp.date.now("YYYY-MM-DD") %> [scheduled:: <% tp.date.now("YYYY-MM-DD") %>]
  - [ ] First task

