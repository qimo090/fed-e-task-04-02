import Counter from './components/Counter'
import Modal from './components/Modal'

function App () {
  return (
    <div className="App" style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      marginTop: 100
    }}>
      <Counter/>
      <Modal/>
    </div>
  )
}

export default App
