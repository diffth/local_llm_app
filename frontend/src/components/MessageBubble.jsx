function MessageBubble({ message }) {
  return (
    <div className={`message-bubble ${message.sender}`}>
      <div className="message-content">{message.text}</div>
    </div>
  )
}

export default MessageBubble
