import MessageList from './MessageList'
import ChatInput from './ChatInput'
import SettingsPanel from './SettingsPanel'

function ChatWindow({
  messages,
  model,
  models,
  loading,
  inputValue,
  systemPrompt,
  selectedPromptMode,
  temperature,
  topP,
  numPredict,
  onInputChange,
  onSubmit,
  onChangeModel,
  onChangePromptMode,
  onChangeSystemPrompt,
  onChangeTemperature,
  onChangeTopP,
  onChangeNumPredict,
  onDownload,
}) {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <div>
          <h1>Local LLM Chat</h1>
          <p>FastAPI를 통해 Ollama 로컬 모델과 연결합니다.</p>
        </div>
        <button type="button" className="download-button" onClick={onDownload} disabled={!messages.length}>
          대화 다운로드
        </button>
      </div>

      <div className="chat-body-grid">
        <div className="chat-body">
          <MessageList messages={messages} />
        </div>
        <aside className="chat-sidebar">
          <SettingsPanel
            models={models}
            selectedModel={model}
            selectedPromptMode={selectedPromptMode}
            onChangeModel={onChangeModel}
            onChangePromptMode={onChangePromptMode}
            systemPrompt={systemPrompt}
            temperature={temperature}
            topP={topP}
            numPredict={numPredict}
            onChangeSystemPrompt={onChangeSystemPrompt}
            onChangeTemperature={onChangeTemperature}
            onChangeTopP={onChangeTopP}
            onChangeNumPredict={onChangeNumPredict}
            loading={loading}
          />
        </aside>
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
