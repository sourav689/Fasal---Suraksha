from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

# origins = [
#     "http://localhost",
#     "http://localhost:8000",
#     "*",
# ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your TensorFlow model
MODEL = tf.keras.models.load_model(r"backend\model\Model_2.h5")

# Define class names
CLASS_NAMES = [
    "Black Gram_Anthracnose",
    "Black Gram_Healthy",
    "Black Gram_Leaf Crinckle",
    "Black Gram_Powdery Mildew",
    "Rice_Bacterial Blight",
    "Unknown",
]

# Preprocessing function
def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read image and preprocess
        image = read_file_as_image(await file.read())
        img_batch = np.expand_dims(image, axis=0)  # Add batch dimension

        # Predict using the model
        predictions = MODEL.predict(img_batch)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])

        return {"class": predicted_class, "confidence": float(confidence)}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    # Change host to '127.0.0.1' for better local access
    uvicorn.run(app, host="0.0.0.0", port=8000)