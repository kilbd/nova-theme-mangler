import { pickSource } from './pick-source'

function activate() {
  // Do work when the extension is activated
  // nova.commands.invoke("theme-mangler.pickSource");
}

function deactivate() {
  // Clean up state before the extension is deactivated
}

nova.commands.register('theme-mangler.pickSource', pickSource)

nova.commands.register('theme-mangler.editStyles', (_workspace) => {
  console.log('edit styles requested')
})

export { activate, deactivate }
