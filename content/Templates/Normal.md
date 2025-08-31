
<%*  

let title = await tp.system.prompt("Title");
let isDraftInput = await tp.system.prompt("Is this a draft? (yes/no)", "no");
let isDraft = isDraftInput && isDraftInput.toLowerCase() === "yes";
let folders = this.app.vault.getAllLoadedFiles().filter(i => i.children).map(folder => folder.path);
let folder = await tp.system.suggester(folders, folders);

await tp.file.rename(`${title}`)

  

await tp.file.move(`/${folder}/${title}`)

  

%>