---
created: <% tp.file.creation_date() %>
---
tags:: [[+Daily Notes]]

# <% moment(tp.file.title,'YYYY-MM-DD').format("dddd, MMMM DD, YYYY") %>

<< [[03 Daily Notes/<% tp.date.now("YYYY", -1) %>/<% tp.date.now("MM-MMMM", -1) %>/<% tp.date.now("YYYY-MM-DD-dddd", -1) %>|Yesterday]] | [[03 Daily Notes/<% tp.date.now("YYYY", 1) %>/<% tp.date.now("MM-MMMM", 1) %>/<% tp.date.now("YYYY-MM-DD-dddd", 1) %>|Tomorrow]] >>

---
<%* if (tp.app.vault.getName() != "gtd") { %>
# 🔍Review

- [ ] Check calendar
- [ ] Check email
- [ ] Check slack
- [ ] Check [GitHub Notifications](https://github.com/notifications)
- [ ] Process [📩 Inbox](../../01%20Project%20Management/📩%20Inbox.md)

---
<%* } %>

# 📝 Notes

---

## Overdue
```tasks
not done
(scheduled before <% tp.date.now("YYYY-MM-DD") %>) OR (due before <% tp.date.now("YYYY-MM-DD") %>)
hide task count
```
## Scheduled today
```tasks
not done
(scheduled on <% tp.date.now("YYYY-MM-DD") %>) OR (due on <% tp.date.now("YYYY-MM-DD") %>)
hide task count
```
## Due in the next two weeks
```tasks
not done
due after <% tp.date.now("YYYY-MM-DD") %>
due before <% tp.date.now("YYYY-MM-DD", +14) %>
hide task count
```
### Notes created today
```dataview
List FROM "" WHERE file.cday = date("<%tp.date.now("YYYY-MM-DD")%>") SORT file.ctime asc
```

### Notes last touched today
```dataview
List FROM "" WHERE file.mday = date("<%tp.date.now("YYYY-MM-DD")%>") SORT file.mtime asc
```
