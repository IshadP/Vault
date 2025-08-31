
<%*  

let title = await tp.system.prompt("Title");
let folders = this.app.vault.getAllLoadedFiles().filter(i => i.children).map(folder => folder.path);
let folder = await tp.system.suggester(folders, folders);

await tp.file.rename(`${title}`)

  

await tp.file.move(`/${folder}/${title}`)

  

%>