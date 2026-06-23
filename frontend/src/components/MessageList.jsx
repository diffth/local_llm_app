import MessageBubble from './MessageBubble'

function MessageList({ messages }) {
  if (!messages.length) {
    return <div className="empty-state">여기에 채팅 메시지가 표시됩니다.</div>
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageList
