
---
title: <% tp.file.title %>
draft: <
tags:
---
 

<%*

// Prompt for title
let title = await tp.system.prompt("Title");

// Prompt for draft (t/f)
let isDraftInput = await tp.system.prompt("Draft? (t/f)", "f");
let isDraft = (isDraftInput.toLowerCase() === "t") ? "true" : "false";

// Get all folders
let folders = this.app.vault.getAllLoadedFiles()
  .filter(i => i && i.children)
  .map(folder => folder.path);

// Folder selector
let folder = await tp.system.suggester(folders, folders);

// Rename file (Obsidian adds .md automatically)
await tp.file.rename(title);

// Move file (do NOT add .md)
await tp.file.move(`/${folder}/${title}`);

// Tag input
let tag = await tp.system.prompt("Enter a tag for this note");

//Frontmatter
tp.frontmatter.draft = isDraft;

// Date
let date = tp.date.now("YYYY-MM-DD");
%>

