import io
import pickle
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

app =  FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pydantic import BaseModel

class inputData(BaseModel):
    a: int 

@app.post("/predict/")
async def predi(data : inputData):
    try:
        prediction = model.predict([[data.a]])
        return {"prediction" : int(prediction)}
    except Exception as e:
        return {"error": str(e)}