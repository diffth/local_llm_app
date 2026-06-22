from fastapi import FastAPI, HTTPException

# ollama chat 모듈의 call_ollama_chat 함수 로딩
from ollama_chat import call_ollama_chat

# FastAPI 객체 생성
app = FastAPI(
    title="Local LLM Chat API",
    description="Ollama 기반 로컬 LLM 채팅 백엔드 API",
    version="0.1.0",
)

# /chat API 구현
# htpp://localhost:8000/chat
# @app.post("/chat")
# def chat():
#     # 비지니스 로직 처리
#     return_value = {
#         "model":"aaa",
#         "ai_message":"ai_message",
#         "걸린시간":"걸린시간"
#     }
#     return return_value

 
@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        return call_ollama_chat(
            message=request.message,
            model=request.model,
            system_prompt=request.system_prompt,
            temperature=request.temperature,
            top_p=request.top_p,
            num_predict=request.num_predict,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"채팅 처리 중 오류가 발생했습니다: {exc}"
        ) 

