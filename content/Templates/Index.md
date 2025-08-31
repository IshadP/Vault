<%*
let title = await tp.system.prompt("Title");
let tag = await tp.system.prompt("Enter a tag for this note");
let date = tp.date.now("YYYY-MM-DD");

let frontmatter = `---
title: ${title}
draft: false
date: ${date}
view: read
tags:
- ${tag}
---

`;

tR += frontmatter;   // write frontmatter
tR += tp.file.cursor(); 
tR += "%% " + "Waypoint" + " %%"// teleport cursor here
%>
