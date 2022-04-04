async function editStyles(workspace: Workspace) {
  const extensionDir = nova.extension.globalStoragePath
  checkStylesFile(extensionDir)
  const editor = await workspace.openFile(
    `${extensionDir}/data/user-styles.css`
  )
  const saveDisposable = editor?.onDidSave(generateTheme)
  let closeDisposable: Disposable | undefined
  closeDisposable = editor?.onDidDestroy((_editor) => {
    saveDisposable?.dispose()
    closeDisposable?.dispose()
  })
}

function checkStylesFile(extRoot: string) {
  createDirIfMissing(extRoot)
  createDirIfMissing(`${extRoot}/data`)
  if (!nova.fs.access(`${extRoot}/data/user-styles.css`, nova.fs.F_OK)) {
    nova.fs.copy(
      `${nova.extension.path}/data/template.css`,
      `${extRoot}/data/user-styles.css`
    )
  }
}

function createDirIfMissing(path: string) {
  if (!nova.fs.access(path, nova.fs.F_OK)) {
    nova.fs.mkdir(path)
  }
}

function generateTheme(editor: TextEditor) {
  let themeDir = `${nova.extension.globalStoragePath}/Themes`
  // Nova doesn't seem to pick up themes in global storage path for dev mode.
  // Here's hoping it does when not in dev mode!
  if (nova.inDevMode()) {
    themeDir = `${nova.extension.path}/Themes`
  }
  createDirIfMissing(themeDir)
  const mangledTheme = nova.fs.open(`${themeDir}/My Perfect Theme.css`, 'w')
  const source = nova.config.get('com.kilb.theme-mangler.source') as
    | string
    | null
  if (source) {
    const themeFile = nova.fs.open(source, 'r') as FileTextMode
    let line: string | null
    do {
      line = themeFile.readline()
      if (line !== null) {
        mangledTheme.write(line)
      }
    } while (line?.includes('\n'))
    mangledTheme.write('\n')
  }
  let userStyles = editor.getTextInRange(new Range(0, editor.document.length))
  mangledTheme.write(userStyles)
  mangledTheme.close()
}

export { editStyles }
