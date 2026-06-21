from fastapi import FastAPI

app = FastAPI()

# http://127.0.0.1:8000/
@app.get("/")
def read_root():
    word = "안녕"
    # 비지니스 로직 처리
    # DB 조회
    # AI와 통신한 결과
    return {"Hello": word}
    # return {"Hello": "World"}

# 경로 매개 변수
# http://127.0.0.1:8000/items/1
# http://127.0.0.1:8000/items/2
# http://127.0.0.1:8000/items/3
# http://127.0.0.1:8000/items/4
@app.post("/items/{item_id}")
def read_item(item_id : int, q: str | None = None):
    print(f"item_id : {item_id}, q : {q}")
    return {"item_id": item_id, "q": q}

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: str | None = None):
#     return {"item_id": item_id, "q": q}
