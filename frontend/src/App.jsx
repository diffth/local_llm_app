import { useEffect, useState } from 'react'
import ChatWindow from './components/ChatWindow.jsx'
import { fetchModels, sendChatMessage } from './api/chatApi.js'
import './App.css'

function App() {
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState('')
  const [systemPrompt, setSystemPrompt] = useState('너는 초보자를 돕는 친절한 AI 강사다.')
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
          temperature={temperature}
          topP={topP}
          numPredict={numPredict}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onChangeModel={handleModelChange}
          onChangeSystemPrompt={(event) => setSystemPrompt(event.target.value)}
          onChangeTemperature={(event) => setTemperature(Number(event.target.value))}
          onChangeTopP={(event) => setTopP(Number(event.target.value))}
          onChangeNumPredict={(event) => setNumPredict(Number(event.target.value))}
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
