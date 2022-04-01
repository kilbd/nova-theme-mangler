function activate() {
  // Do work when the extension is activated
  // nova.commands.invoke("theme-mangler.pickSource");
}

function deactivate() {
  // Clean up state before the extension is deactivated
}

nova.commands.register('theme-mangler.pickSource', (workspace: Workspace) => {
  console.log('command requested')
  let choices = ['one', 'two', 'three']
  workspace.showChoicePalette(choices, {}, (choice, index) =>
    console.log(choice, index)
  )
})

nova.commands.register('theme-mangler.editStyles', (_workspace) => {
  console.log('edit styles requested')
})

export { activate, deactivate }
