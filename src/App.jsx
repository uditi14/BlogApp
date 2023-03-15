import { useState } from 'react'
import './App.css'
import logo from './assets/logo.jpg'
import randomImg from './assets/image.png'

function App() {
  const [count, setCount] = useState(0)

  return (
  <main>
    <header>
      <img src={logo} className='logo'></img>
      <nav>
        <a href=''>Login</a>
        <a href=''>Register</a>
      </nav>
    </header>
    <div className="post">
      <div className="image">
        <img src={randomImg}></img>
      </div>
      <div className="text">
        <h2>The Importance of Vocabulary</h2>
        <p className="info">
          <a className="author">John Doe</a>
          <time>2023-01-15 13:39</time>
        </p>
        <p className='summary'>Vocabulary is the knowledge of words, and vocabulary words are a specific set of words to be learned. Vocabulary is an essential component of reading comprehension.</p>
      </div>
    </div>
    <div className="post">
      <div className="image">
        <img src={randomImg}></img>
      </div>
      <div className="text">
        <h2>The Importance of Vocabulary</h2>
        <p className="info">
          <a className="author">John Doe</a>
          <time>2023-01-15 13:39</time>
        </p>
        <p className='summary'>Vocabulary is the knowledge of words, and vocabulary words are a specific set of words to be learned. Vocabulary is an essential component of reading comprehension.</p>
      </div>
    </div>
    <div className="post">
      <div className="image">
        <img src={randomImg}></img>
      </div>
      <div className="text">
        <h2>The Importance of Vocabulary</h2>
        <p className="info">
          <a className="author">John Doe</a>
          <time>2023-01-15 13:39</time>
        </p>
        <p className='summary'>Vocabulary is the knowledge of words, and vocabulary words are a specific set of words to be learned. Vocabulary is an essential component of reading comprehension.</p>
      </div>
    </div>
  </main>
  )
}

export default App
