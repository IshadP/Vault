<%*
let title = await tp.system.prompt("Title");
let isDraftInput = await tp.system.prompt("Is this a draft? (yes/no)", "no");
let isDraft = isDraftInput && isDraftInput.toLowerCase() === "yes";

let allFilesAndFolders = app.vault.getAllLoadedFiles();
// Detect folders without TFolder
let folders = allFilesAndFolders
  .filter(t => t && typeof t === "object" && "children" in t)
  .map(f => f.path);

let folder = await tp.system.suggester(folders, folders, true);

let newPath = folder ? `${folder}/${title}.md` : `${title}.md`;
await tp.file.move(newPath);

let tag = await tp.system.prompt("Enter a tag for this note");
let date = tp.date.now("YYYY-MM-DD");

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
