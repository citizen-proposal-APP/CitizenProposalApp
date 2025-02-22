from fastapi import FastAPI, HTTPException, Response, Form, File, UploadFile
from pydantic import BaseModel, Field
from typing import List, Optional, Annotated, Dict
import logging
from contextlib import asynccontextmanager
from classifier import Ranker, Moderator

context = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    context[0] = Ranker("model", "db")
    context[1] = Moderator("model")
    print("Server launched successfully.")
    yield
    print("Shutdown event triggered, saving database...")
    await context[0].save_db()
    print("exit gracefully...")

app = FastAPI(
    title="Text Vector API",
    version="0.1",
    description="""
    **Text Vector API** provides three main functionalities:
    
    1. **Classification**: Classify a given text into department and topic categories.
    2. **Ranking**: Retrieve the top-k relevant items based on a query string or vector embedding.
    3. **Vector Database**: Add Post to vector database.
    """,
    lifespan=lifespan,
)

logger = logging.getLogger('uvicorn.error')

# Request and Response Models
class ClassifyRequest(BaseModel):
    text: str = Field(
        ..., 
        min_length=1, 
        description="Post title to classify. Must not be empty. For example, '廢除學習歷程檔案'"
    )

class ClassifyResponse(BaseModel):
    department_label: List[str] = Field(..., description="The predicted department label name.")
    topic_label: Optional[List[str]] = Field(None, description="The predicted topic label name.")

class RankRequest(BaseModel):
    query: str = Field(
        ..., 
        description="Query to retrieve relevant posts."
    )
    topk: int = Field(
        ..., 
        gt=0, 
        description="Number of top results to retrieve. Must be a positive integer greater than zero."
    )

class RankedResult(BaseModel):
    index: int = Field(..., description="Index of the retrieved posts.")
    distance: float = Field(..., description="Distance to the query. range in [0, 1]")

class RankResponse(BaseModel):
    ranked_results: List[RankedResult] = Field(
        ..., 
        description="A list of ranked results containing index of retrieved posts."
    )
    
class EmbeddingRequest(BaseModel):
    id: int = Field(..., gt=0, description="Id of the Post. Must not be empty.")
    text: str = Field(..., description="Post title to embed. Nust not be empty.")

class ModerationRequest(BaseModel):
    text: str = Field(..., description="Any text")

class ModerationReponse(BaseModel):
    flag: bool = Field(..., description="if input content is unsafe, flag will be True, otherwise False")


# API Endpoints
@app.post("/classify", response_model=ClassifyResponse, summary="Classify a Text", tags=["Classification"])
async def classify(request: Annotated[ClassifyRequest, Form()]):
    """
    **Classify** a given text into department and topic categories.
    
    - **text**: Input text to classify.
    - The endpoint returns:
      - The predicted department label.
      - The predicted topic label.
    """
    text = request.text

    if not text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty or whitespace only.")

    try:
        department_label, topic_label = context[0].get_tags(text)
        topic_label = [topic_label] if topic_label != None else None
        department_label = [department_label]
        # department_label, department_label_id, topic_label, topic_label_id = get_tags(text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during classification: {e}")

    return ClassifyResponse(
        department_label=department_label,
        topic_label=topic_label,
    )

@app.post("/add", summary="Vector Database", tags=["Vector DB"])
async def add(request: Annotated[EmbeddingRequest, Form()]):
    """
    **Add** an item into vector db.

    - **id**: Id of the added item.
    - **text**: content of the added item.
    - The endpoint returns:
      - status code 200 if success, otherwise failed.
    """

    id = request.id
    text = request.text
    
    try:
        context[0].embed(id, text)
        # embed(id, text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
    
    return Response(status_code=200)
    

@app.post("/rank", response_model=RankResponse, summary="Rank Items", tags=["Ranking"])
async def rank(request: Annotated[RankRequest, Form()]):
    """
    **Rank** relevant items based on a query.

    - **query**: A string query.
    - **topk**: Number of top results to retrieve. This must be a positive integer.
    - The endpoint returns:
      - A list of ranked results, represent by its index. 
    """
    query = request.query
    topk = request.topk

    if not query.strip():
        raise HTTPException(status_code=400, detail="Query string cannot be empty or whitespace only.")

    try:
        results, distances = context[0].index_rank(query, topk)
        distances[distances < 0] = 0
        ranked_results = [RankedResult(index=int(idx), distance=float(dis)) for idx, dis in zip(results, distances)]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{e}")

    return RankResponse(ranked_results=ranked_results)

@app.post("/text-moderation", response_model=ModerationReponse, summary="Check whether a string is safe", tags=["Moderation"])
async def text_moderation(request: Annotated[ModerationRequest, Form()]):
    text = request.text
    
    if not text.strip():
        raise HTTPException(status_code=400, detail="Query string cannot be empty or whitespace only.")
    
    # try:
    flag = context[1].text_moderation(text)
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"{e}")
    
    return ModerationReponse(flag=flag)

@app.post("/image-moderation", response_model=ModerationReponse, summary="Check whether an image is safe", tags=["Moderation"])
async def image_moderation(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        flag = context[1].image_moderation(image_bytes)
    except Exception as e:
        raise  HTTPException(status_code=500, detail=f"{e}")
    
    return ModerationReponse(flag=flag)
        

# python3 -m uvicorn main:app --port 5002
# sudo docker buildx build -t machine-learning .
# docker run -it -p 5001:5001 -v vector-db:/app/db -d machine-learning