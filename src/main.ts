import { editStyles } from './edit-styles'
import { pickSource } from './pick-source'

const disposables = new CompositeDisposable()

function activate() {
  // Do work when the extension is activated
  disposables.add(
    nova.commands.register('theme-mangler.pickSource', pickSource)
  )
  disposables.add(
    nova.commands.register('theme-mangler.editStyles', editStyles)
  )
}

function deactivate() {
  // Clean up state before the extension is deactivated
  disposables.dispose()
}

export { activate, deactivate }
