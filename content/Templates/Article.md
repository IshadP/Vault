<%*
let title = await tp.system.prompt("Title");


let folders = this.app.vault.getAllLoadedFiles()
  .filter(i => i && i.children)
  .map(folder => folder.path);

let folder = await tp.system.suggester(folders, folders);
await tp.file.rename(title);
await tp.file.move(`/${folder}/${title}`);

let draftInput = await tp.system.prompt("Draft? (t/f)", "t");
let isDraft = (draftInput.toLowerCase() === "t") ? "true" : "false";
let tag = await tp.system.prompt("Enter a tag for this note");
let date = tp.date.now("YYYY-MM-DD");

let frontmatter = `---
title: ${title}
draft: ${isDraft}
date: ${date}
ObsidianUIMode: preview
tags:
- ${tag}
---

`;

tR += frontmatter;   // write frontmatter
%>