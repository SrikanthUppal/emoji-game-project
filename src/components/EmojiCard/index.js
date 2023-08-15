// Write your code here
import './index.css'

const EmojiCard = props => {
  const {emojiDetails, clickEmoji} = props
  const {id, emojiName, emojiUrl} = emojiDetails

  const onClickEmoji = () => {
    clickEmoji(id)
  }

  return (
    <li className="emoji-item">
      <button type="button" className="button" onClick={onClickEmoji}>
        <img src={emojiUrl} alt={emojiName} className="Emoji" />
      </button>
    </li>
  )
}

export default EmojiCard
