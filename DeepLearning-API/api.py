from fastapi import FastAPI
import numpy as np
import torch
from model.model_arch import SalaryPredict

app = FastAPI()


async def load_model():
    model = SalaryPredict(n_input_features=3)
    model.load_state_dict(torch.load("model/test_model.pt"))
    model.eval()


@app.get("/")
async def root():
    return {"Message": "This is a test message"}


@app.get("/predict")
async def predict_salary(country: str, education: str, experience: int):
    """
    to run this function, use the following command:
    localhost:8000/predict?country=United States&education=Bachelor's degree&experience=1
    :param country:
    :type country:
    :param education:
    :type education:
    :param experience:
    :type experience:
    :return:
    :rtype:
    """
    loader = await load_model()
    model = loader["model"]
    le_country = loader["le_country"]
    le_ed = loader["le_ed"]
    param = np.array([[country, education, experience]])
    param[:, 0] = le_country.transform(param[:, 0])
    param[:, 1] = le_ed.transform(param[:, 1])
    param = param.astype(float)
    param = torch.from_numpy(param).float()
    prediction = model(param)
    prediction = prediction.item()
    return {"Prediction": prediction}
