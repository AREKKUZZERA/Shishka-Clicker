import {useEffect, useState} from "react"
import {setupDiscord} from "./discord.js"


function App() {
  const [user, setUser] = useState(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setupDiscord().then(setUser)
  }, [])

  return (
    <div className="p-4">
      <h1>Discord Clicker</h1>

      {user && (
        <p>Игрок: {user.username}</p>
      )}

      <h2>{count}</h2>

      <button onClick={() => setCount(c => c + 1)}>
        Click
      </button>
    </div>
  )
}

export default App
