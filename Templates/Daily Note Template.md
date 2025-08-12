---
created: <% tp.file.creation_date() %>
---
tags:: [[+Daily Notes]]

# <% moment(tp.file.title,'YYYY-MM-DD').format("dddd, MMMM DD, YYYY") %>

<< [[03 Daily Notes/<% tp.date.now("YYYY", -1) %>/<% tp.date.now("MM-MMMM", -1) %>/<% tp.date.now("YYYY-MM-DD-dddd", -1) %>|Yesterday]] | [[03 Daily Notes/<% tp.date.now("YYYY", 1) %>/<% tp.date.now("MM-MMMM", 1) %>/<% tp.date.now("YYYY-MM-DD-dddd", 1) %>|Tomorrow]] >>

---
# ⛅ Start of the day
<%* if (tp.app.vault.getName() != "gtd") { %>
- Check calendar
- Check email
- Check slack
- Check [GitHub Notifications](https://github.com/notifications)
- Process [📩 Inbox](../../01%20Project%20Management/📩%20Inbox.md)
<%* } %>
<%* if (tp.app.vault.getName() == "gtd") { %>
- Zważyć się
- Wypić szklanke wody
- Wziąć leki
- Przepakować zmywarke
- Posprzątać w kuwecie
- Umyć twarz i posmarować
- Zjeść śniadanie
- Wstawić pranie
- Zrobić listę na dzisiaj
---
<%* } %>

## 🔼 Priority Tasks
```tasks
not done
description includes 🔼
hide task count
```

## 📅 Due/Scheduled Today and Due in 2 weeks
```tasks
not done  
(due on <% tp.date.now("YYYY-MM-DD") %>) OR (scheduled on <% tp.date.now("YYYY-MM-DD") %>) OR (due before <% tp.date.now("YYYY-MM-DD") %>) OR (scheduled before <% tp.date.now("YYYY-MM-DD") %>)
hide task count
```
```tasks
not done
due after <% tp.date.now("YYYY-MM-DD") %>
due before <% tp.date.now("YYYY-MM-DD", +14) %>
hide task count
```
## 📝 Notes & Thoughts

