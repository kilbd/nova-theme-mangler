function pickSource(workspace: Workspace) {
  const extensionsDir = nova.path.dirname(`${nova.extension.globalStoragePath}`)
  const installedExtensions = nova.fs.listdir(extensionsDir)
  let allThemes: string[][] = [['None', '']]
  installedExtensions.forEach((path) => {
    const fullPath = `${extensionsDir}/${path}`
    const themeDir = `${fullPath}/Themes`
    const stats = nova.fs.stat(fullPath)
    if (stats?.isDirectory() && nova.fs.access(themeDir, nova.fs.F_OK)) {
      let themes = nova.fs.listdir(themeDir)
      themes.forEach((file) => {
        let fileParts = nova.path.splitext(file)
        if (fileParts[1] === 'css') {
          allThemes.push([fileParts[0], `${themeDir}/${file}`])
        }
      })
    }
  })
  let choices = allThemes.map((theme) => theme[0])
  workspace.showChoicePalette(choices, {}, (_choice, index) => {
    if (index !== undefined && index !== null) {
      console.log(`chosen theme: ${allThemes[index][1]}`)
    }
  })
}

export { pickSource }