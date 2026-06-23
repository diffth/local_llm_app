function ChatInput({ value, onChange, onSubmit, disabled }) {
  return (
    <form className="chat-input-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="chat-input"
        placeholder="질문을 입력하고 Enter를 누르세요..."
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <button type="submit" className="chat-submit" disabled={disabled || !value.trim()}>
        전송
      </button>
    </form>
  )
}

export default ChatInput
