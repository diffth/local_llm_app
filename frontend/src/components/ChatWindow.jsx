import MessageList from './MessageList'
import ChatInput from './ChatInput'
import SettingsPanel from './SettingsPanel'

function ChatWindow({
  messages,
  model,
  models,
  loading,
  inputValue,
  onInputChange,
  onSubmit,
  onChangeModel,
}) {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <div>
          <h1>Local LLM Chat</h1>
          <p>FastAPI를 통해 Ollama 로컬 모델과 연결합니다.</p>
        </div>
        <SettingsPanel
          models={models}
          selectedModel={model}
          onChangeModel={onChangeModel}
          loading={loading}
        />
      </div>

      <div className="chat-body">
        <MessageList messages={messages} />
      </div>

      <div className="chat-footer">
        <ChatInput
          value={inputValue}
          onChange={onInputChange}
          onSubmit={onSubmit}
          disabled={loading}
        />
      </div>
    </div>
  )
}

export default ChatWindow
