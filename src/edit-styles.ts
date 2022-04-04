async function editStyles(workspace: Workspace) {
  const extensionDir = nova.extension.globalStoragePath
  checkStylesFile(extensionDir)
  const editor = await workspace.openFile(
    `${extensionDir}/data/user-styles.css`
  )
  console.log(editor?.document.path)
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

export { editStyles }
