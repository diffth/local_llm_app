import { useEffect, useState } from 'react'
import ChatWindow from './components/ChatWindow.jsx'
import { fetchModels, sendChatMessage } from './api/chatApi.js'
import { promptModes } from './api/promptModels.js'
import './App.css'

function App() {
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedPromptMode, setSelectedPromptMode] = useState('basic')
  const [systemPrompt, setSystemPrompt] = useState(promptModes.basic.prompt)
  const [temperature, setTemperature] = useState(0.7)
  const [topP, setTopP] = useState(0.9)
  const [numPredict, setNumPredict] = useState(256)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadModels() {
      try {
        const modelList = await fetchModels()
        setModels(modelList)
        if (modelList.length > 0) {
          setSelectedModel(modelList[0])
        }
      } catch (error) {
        console.error(error)
        setErrorMessage('모델 목록을 불러오지 못했습니다. 서버를 확인해주세요.')
      }
    }

    loadModels()
  }, [])

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value)
  }

  const handlePromptModeChange = (event) => {
    const modeKey = event.target.value
    setSelectedPromptMode(modeKey)
    setSystemPrompt(promptModes[modeKey]?.prompt || '')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!inputValue.trim() || !selectedModel) {
      return
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue.trim(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await sendChatMessage({
        message: userMessage.text,
        model: selectedModel,
        system_prompt: systemPrompt,
        temperature,
        top_p: topP,
        num_predict: numPredict,
      })

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.message,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error(error)
      setErrorMessage('메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadMarkdown = () => {
    const lines = []
    lines.push('# 대화 기록')
    lines.push('')
    lines.push(`- 모델: ${selectedModel || '없음'}`)
    lines.push(`- 프롬프트 모드: ${selectedPromptMode}`)
    lines.push(`- temperature: ${temperature}`)
    lines.push(`- top_p: ${topP}`)
    lines.push(`- num_predict: ${numPredict}`)
    lines.push('')
    lines.push('## 시스템 프롬프트')
    lines.push('')
    lines.push(systemPrompt)
    lines.push('')
    lines.push('---')
    lines.push('')

    messages.forEach((message) => {
      const role = message.sender === 'user' ? '사용자' : 'AI'
      lines.push(`### ${role}`)
      lines.push('')
      lines.push(message.text)
      lines.push('')
    })

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'chat-history.md'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app-root">
      <div className="app-shell">
        <ChatWindow
          messages={messages}
          model={selectedModel}
          models={models}
          loading={loading}
          inputValue={inputValue}
          systemPrompt={systemPrompt}
          selectedPromptMode={selectedPromptMode}
          temperature={temperature}
          topP={topP}
          numPredict={numPredict}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onChangeModel={handleModelChange}
          onChangePromptMode={handlePromptModeChange}
          onChangeSystemPrompt={(event) => setSystemPrompt(event.target.value)}
          onChangeTemperature={(event) => setTemperature(Number(event.target.value))}
          onChangeTopP={(event) => setTopP(Number(event.target.value))}
          onChangeNumPredict={(event) => setNumPredict(Number(event.target.value))}
          onDownload={handleDownloadMarkdown}
        />
        <div className="status-area">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {!errorMessage && !models.length && (
            <div className="loading-message">모델을 불러오는 중입니다...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
