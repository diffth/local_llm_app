function SettingsPanel({ models, selectedModel, onChangeModel, systemPrompt, onChangeSystemPrompt, loading }) {
  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2>설정 패널</h2>
        <p>모델과 시스템 프롬프트를 선택하세요.</p>
      </div>

      <div className="settings-group">
        <label htmlFor="model-select">모델 선택</label>
        <select id="model-select" value={selectedModel} onChange={onChangeModel} disabled={loading}>
          <option value="">모델을 선택하세요</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-group">
        <label htmlFor="system-prompt">시스템 프롬프트</label>
        <textarea
          id="system-prompt"
          value={systemPrompt}
          onChange={onChangeSystemPrompt}
          rows={5}
          disabled={loading}
        />
      </div>

      <div className="settings-info">
        <h3>도움말</h3>
        <p>이 설정은 FastAPI를 통해 Ollama로 전달됩니다. 모델, 시스템 프롬프트 변경 후 채팅을 보내면 새로운 응답 방향이 반영됩니다.</p>
      </div>
    </div>
  )
}

export default SettingsPanel
