function pickSource(workspace: Workspace) {
  const extensionsDir = nova.path.dirname(nova.extension.globalStoragePath)
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
        generateSwatches(savePath)
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

function generateSwatches(filePath: string | null) {
  if (filePath) {
    const colorRegex = /\#[a-fA-F0-9]+/g
    let colorSet = new Set<string>()
    const sourceContents = nova.fs.open(filePath, 'r').read() as string
    const matches = sourceContents.matchAll(colorRegex)
    for (let match of matches) {
      colorSet.add(match[0])
    }
    let swatches: SwatchColor[] = []
    let counter = 1
    colorSet.forEach((color) => {
      swatches.push({
        color: color,
        name: `Color ${counter}`,
        space: 'srgb',
      })
      counter++
    })
    let theme = nova.path.splitext(nova.path.basename(filePath))
    const novaStorage = nova.path.dirname(
      nova.path.dirname(nova.extension.globalStoragePath)
    )
    const swatchFile = nova.fs.open(
      `${novaStorage}/Swatches/${theme[0]} Theme.json`,
      'w'
    )
    swatchFile.write(JSON.stringify({ swatches: swatches }))
    swatchFile.close()
  }
}

interface SwatchColor {
  color: string
  name: string
  space: string
}

export { pickSource }
