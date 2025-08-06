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
```

## 📅 Due/Scheduled Today
```tasks
not done  
(due on <% tp.date.now("YYYY-MM-DD") %>) OR (scheduled on <% tp.date.now("YYYY-MM-DD") %>)
hide task count
```

## 📝 Notes & Thoughts


## 📥 Quick Capture
<!-- Dump thoughts here, process later -->