import randomImg from './image.png'

export default function Post(){
    return(
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
    )
}