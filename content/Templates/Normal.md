---
title: <%tp.file.title%>
draft: <%tp.system.prompt("Should this be published?(true/false)", "" %>
tags:
  - example-tag
---
<%*
let title = await tp.system.prompt("Title");
let isDraft = await tp.system.prompt("Is this a draft? (yes/no)", "no");

let allFilesAndFolders = this.app.vault.getAllLoadedFiles();
let folders = allFilesAndFolders.filter(t => t.isTFolder).map(f => f.path);

let folder = await tp.system.suggester(folders, folders, true, "Select a folder");

let newPath = (folder) ? `${folder}/${title}` : `${title}`;

await tp.file.move(newPath);

let frontmatter = `---
title: ${title}
draft: ${isDraft}
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
- <% tp.system.prompt("Enter a tag for this note") %>
---

`;

await tp.file.prepend(frontmatter);

await tp.file.append(`# ${title}`);
_%>