from fastapi import FastAPI


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


