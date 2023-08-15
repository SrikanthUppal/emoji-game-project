/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'
import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojiList: [],
    isGameInProgress: true,
    topScore: 0,
  }

  playAgain = () => {
    this.setState({clickedEmojiList: [], isGameInProgress: true})
  }

  renderScoreCard = () => {
    const {clickedEmojiList} = this.state
    const {emojisList} = this.props
    const isWon = clickedEmojiList.length === emojisList.length
    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.playAgain}
        score={clickedEmojiList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (currentScore > topScore) {
      newTopScore = currentScore
    }

    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const isEmojiPresents = clickedEmojiList.includes(id)
    const clickedEmojisLength = clickedEmojiList.length

    if (isEmojiPresents) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else if (emojisList.length - 1 === clickedEmojisLength) {
      this.finishGameAndSetTopScore(emojisList.length)
    }
    this.setState(prevState => ({
      clickedEmojiList: [...prevState.clickedEmojiList, id],
    }))
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojisList = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()
    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map(eachEmoji => (
          <EmojiCard
            key={eachEmoji.id}
            emojiDetails={eachEmoji}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojiList, isGameInProgress, topScore} = this.state
    return (
      <div className="app-container">
        <NavBar
          currentScore={clickedEmojiList.length}
          isGameInProgress={isGameInProgress}
          topScore={topScore}
        />
        <div className="game-body">
          {isGameInProgress ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}
export default EmojiGame
