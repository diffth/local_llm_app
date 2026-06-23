function SettingsPanel({
  models,
  selectedModel,
  onChangeModel,
  systemPrompt,
  temperature,
  topP,
  numPredict,
  onChangeSystemPrompt,
  onChangeTemperature,
  onChangeTopP,
  onChangeNumPredict,
  loading,
}) {
  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2>설정 패널</h2>
        <p>모델, 프롬프트, 샘플링 설정을 조정하세요.</p>
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

      <div className="settings-group range-group">
        <div className="range-label">
          <span>Temperature</span>
          <span>{temperature.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={temperature}
          onChange={onChangeTemperature}
          disabled={loading}
        />
      </div>

      <div className="settings-group range-group">
        <div className="range-label">
          <span>Top P</span>
          <span>{topP.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={topP}
          onChange={onChangeTopP}
          disabled={loading}
        />
      </div>

      <div className="settings-group">
        <label htmlFor="num-predict">Num Predict</label>
        <input
          id="num-predict"
          type="number"
          min="1"
          max="2048"
          step="1"
          value={numPredict}
          onChange={onChangeNumPredict}
          disabled={loading}
        />
      </div>

      <div className="settings-info">
        <h3>도움말</h3>
        <p>이 설정은 FastAPI를 통해 Ollama로 전달됩니다. 모델, 프롬프트, 샘플링 옵션을 변경한 뒤 채팅을 보내면 새로운 응답 방향이 반영됩니다.</p>
      </div>
    </div>
  )
}

export default SettingsPanel
