function SettingsPanel({ models, selectedModel, onChangeModel, loading }) {
  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2>모델 선택</h2>
      </div>
      <select value={selectedModel} onChange={onChangeModel} disabled={loading}>
        <option value="">모델을 선택하세요</option>
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SettingsPanel
