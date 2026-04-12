import { NavProvider } from './context/NavContext'
import { SettingsProvider } from './context/SettingsContext'
import {AppWrapper} from "./components/wrapper/AppWrapper.jsx"
import {StoresProvider} from "./stores/StoresProvider.jsx"


export default function App() {
  return (
    <StoresProvider>
      <SettingsProvider>
        <NavProvider>
          <AppWrapper />
        </NavProvider>
      </SettingsProvider>
    </StoresProvider>
  )
}
