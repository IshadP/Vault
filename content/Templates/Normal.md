<%*
let title = await tp.system.prompt("Title");
let draftInput = await tp.system.prompt("Draft? (t/f)", "f");
let isDraft = (draftInput.toLowerCase() === "t") ? "true" : "false";
let tag = await tp.system.prompt("Enter a tag for this note");
let date = tp.date.now("YYYY-MM-DD");

let frontmatter = `---
title: ${title}
draft: ${isDraft}
date: ${date}
tags:
- ${tag}
---

`;

tR += frontmatter;   // write frontmatter
tR += tp.file.cursor();   // teleport cursor here
%>
# ${title}
