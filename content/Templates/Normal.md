---
title: <%tp.file.title%>
draft: <%tp.system.prompt("Should this be published?(true/false)", "" %>
tags:
  - example-tag
---
<%*  

const title = await tp.system.prompt("Title");

  

const folders = this.app.vault.getAllLoadedFiles().filter(i => i.children).map(folder => folder.path);

  

const folder = await tp.system.suggester(folders, folders);
await tp.file.rename(`${title}`)
await tp.file.move(`/${folder}/${title}`)
%>