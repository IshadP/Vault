
<%*

// Prompt for title
let title = await tp.system.prompt("Title");

// Prompt for draft
let isDraftInput = await tp.system.prompt("Is this a draft? (yes/no)", "no");
let isDraft = (isDraftInput.toLowerCase() === "yes");

// Get all folders
let folders = this.app.vault.getAllLoadedFiles()
  .filter(i => i && i.children)
  .map(folder => folder.path);

// Folder selector
let folder = await tp.system.suggester(folders, folders);

// Rename and move file
await tp.file.rename(`${title}`);
await tp.file.move(`/${folder}/${title}.md`);

// Tag input
let tag = await tp.system.prompt("Enter a tag for this note");

// Date
let date = tp.date.now("YYYY-MM-DD");

// Frontmatter
let frontmatter =
`---
title: ${title}
draft: ${isDraft}
date: ${date}
tags:
- ${tag}
---
`;

await tp.file.prepend(frontmatter);
await tp.file.append(`# ${title}`);
%>
