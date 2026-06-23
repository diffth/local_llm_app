function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderMarkdown(text) {
  let html = escapeHtml(text)

  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
  html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
  html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
  html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')
  html = html.replace(/^\*\s+(.*)$/gm, '<li>$1</li>')
  html = html.replace(/^\-\s+(.*)$/gm, '<li>$1</li>')
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
  html = html.replace(/\n{2,}/g, '</p><p>')

  if (html.includes('<li>')) {
    html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
  }

  html = html.replace(/\n/g, '<br/>')

  return `<div class="markdown-content">${html}</div>`
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  }

  const temp = document.createElement('textarea')
  temp.value = text
  temp.style.position = 'fixed'
  temp.style.left = '-9999px'
  document.body.appendChild(temp)
  temp.focus()
  temp.select()
  document.execCommand('copy')
  document.body.removeChild(temp)
  return Promise.resolve()
}

function MessageBubble({ message }) {
  const isAssistant = message.sender === 'assistant'
  const content = isAssistant
    ? { __html: renderMarkdown(message.text || '') }
    : null

  const handleCopy = () => {
    copyText(message.text || '')
  }

  return (
    <div className={`message-bubble ${message.sender}`}>
      {isAssistant && (
        <button type="button" className="copy-button" onClick={handleCopy}>
          복사
        </button>
      )}

      {content ? (
        <div className="message-content" dangerouslySetInnerHTML={content} />
      ) : (
        <div className="message-content">{message.text}</div>
      )}
    </div>
  )
}

export default MessageBubble
