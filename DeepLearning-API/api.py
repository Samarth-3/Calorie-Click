from fastapi import FastAPI, HTTPException
from model.model_architecture import predict

app = FastAPI()


@app.get("/")
async def root():
    return {"Message": "This is a test message"}


@app.get("/sample_query")
async def sample_query(message: str = "Hello World"):
    """
    for output of this function, use the following command:
    localhost:8000/sample_query?message=message
    """
    return {"Message": message}


@app.post("/predict")
async def predict_class(base64_image: dict):
    """
    for output of this function, use the following command:
    localhost:8000/predict
    """
    try:
        print(base64_image)
        base64_image = base64_image.get("base64_image")
        if not base64_image:
            raise HTTPException(
                status_code=400, detail="Missing 'base64_image' in the request body"
            )
        top_p, top_classes = predict(
            image_string=base64_image,
            topk=3,
            train_on_gpu=False,
            n_classes=14,
        )
        return {"top_classes": top_classes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
