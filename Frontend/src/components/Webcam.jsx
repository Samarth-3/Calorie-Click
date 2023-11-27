import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import Modal from "./Modal";
import l from '../Images/l.mp4';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const StyledFileInput = styled.input`
  display: none; /* Hide the file input */
`;

const FullScreenLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Set a high z-index to ensure it's above other elements */
`;

const LoaderVideo = styled.video`
  width: 420px; /* Adjust the width as needed */
  height: 420px; /* Adjust the height as needed */
`;

const FileInputLabel = styled.label`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.7);
  }
`;

const CaptureButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 11.5px 20px;
  margin: 10px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.7);
  }
`;

const SubmitButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 11.5px 20px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #bb1c2d;
    box-shadow: 0 0 5px rgba(220, 53, 69, 0.7);
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  margin: 10px;
  border-radius: 5px;
`;

const WebcamContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  max-width: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  margin: 10px;
  border-radius: 5px;
`;


function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (loading) => {
    setIsLoading(loading);
  };

  return (
    <>
      {isLoading && (
        <FullScreenLoader>
          {/* Your custom loader component with video */}
          <LoaderVideo autoPlay loop muted>
            <source src={l} type="video/mp4" />
            Your browser does not support the video tag.
          </LoaderVideo>
        </FullScreenLoader>
      )}
      <ImageCapture onLoading={handleLoading} />
    </>
  );
}

function ImageCapture({onLoading}) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFileInputDisabled, setFileInputDisabled] = useState(false);
  const [isPictureTaken, setPictureTaken] = useState(false);
  const [foodItems, setFoodItems] = useState([]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setIsSubmitEnabled(true);
      setFileInputDisabled(true);
      setPictureTaken(true);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setIsSubmitEnabled(true);
      setIsWebcamReady(false); // Disable webcam after uploading
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    onLoading(true);
    if (capturedImage || uploadedImage) {
      let imageData = capturedImage || uploadedImage;
      const base64Image = imageData;

      if (base64Image) {
        // Define the request data
        const requestData = {
          base64_image: base64Image,
        };

        fetch("http://localhost:8000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setFoodItems(data.top_classes);
            onLoading(false);
            openModal();
          })
          .catch((error) => {
            onLoading(false);
            console.error("Error sending request:", error);
          });
      } else {
        console.error("Failed to convert the image to Base64");
      }
    }
    setIsWebcamReady(true);
    setPictureTaken(false);
    setFileInputDisabled(false);
    setCapturedImage(null);
    setUploadedImage(null);
  };

  return (
    <Container>
      <h1>👇Upload Food Image👇</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        width={375} /* Adjust width as needed */
        height={350} /* Adjust height as needed */
        screenshotFormat="image/jpeg"
        onUserMedia={() => setIsWebcamReady(true)}
      />

      <div>
        <CaptureButton
          onClick={captureImage}
          disabled={!isWebcamReady || isPictureTaken}
        >
          Capture Image
        </CaptureButton>
        <StyledFileInput
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="fileInput"
          disabled={isFileInputDisabled || isPictureTaken}
        />
        <FileInputLabel htmlFor="fileInput">Upload Image</FileInputLabel>
        <SubmitButton
        onClick={handleClick}
        disabled={!isSubmitEnabled}
      >
        Submit
      </SubmitButton>
        <Modal isOpen={isModalOpen} onClose={closeModal} topClasses={foodItems}>
          <h2>Choose Most Appropriate Prediction</h2>
        </Modal>
      </div>
      {capturedImage && (
        <PreviewImage src={capturedImage} alt="Captured Image" />
      )}
      {uploadedImage && (
        <PreviewImage src={uploadedImage} alt="Uploaded Image" />
      )}
    </Container>
  );
}

export default App;
