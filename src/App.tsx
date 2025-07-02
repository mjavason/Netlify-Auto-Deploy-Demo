import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
  const featureFlag = import.meta.env.VITE_REACT_APP_FEATURE_FLAG
  const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID
  const clientSecret = import.meta.env.VITE_REACT_APP_CLIENT_SECRET

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="env-vars">
        <p><strong>API URL:</strong> {apiUrl}</p>
        <p><strong>Feature Flag:</strong> {featureFlag}</p>
        <p><strong>Client ID:</strong> {clientId}</p>
        <p><strong>Client Secret:</strong> {clientSecret}</p>
        <p><strong>Testing Testing</strong></p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
