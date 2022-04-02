function pickSource(workspace: Workspace) {
  const extensionsDir = nova.path.dirname(`${nova.extension.globalStoragePath}`)
  const installedExtensions = nova.fs.listdir(extensionsDir)
  let allThemes: string[][] = [['None', '']]
  installedExtensions.forEach((path) => {
    // Don't want to select own generated theme and create an Inception nightmare
    if (path === 'com.kilb.theme-mangler') return
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
  workspace.showChoicePalette(
    choices,
    { placeholder: `current source: ${getCurrentSource()}` },
    (_choice, index) => {
      if (index !== undefined && index !== null) {
        let savePath = allThemes[index][1] === '' ? null : allThemes[index][1]
        nova.config.set('com.kilb.theme-mangler.source', savePath)
      }
    }
  )
}

function getCurrentSource(): string {
  let path = nova.config.get('com.kilb.theme-mangler.source') as string | null
  if (path !== null) {
    let file = nova.path.basename(path)
    return nova.path.splitext(file)[0]
  } else {
    return 'None'
  }
}

export { pickSource }
