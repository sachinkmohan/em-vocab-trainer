import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

class L2 {
  static className = "L2";

  constructor(config) {
    return tf.regularizers.l1l2(config);
  }
}
tf.serialization.registerClass(L2);

const DetectLetters = () => {
  const [model, setModel] = useState(null);
  const [image, setImage] = useState(null);

  // Load model when component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        const response = await fetch(
          "../../../src/components/games/malayalam-model_no_reg.json"
        );
        if (!response.ok) {
          throw new Error("File not found");
        }
        // const loadedModel = await tf.loadLayersModel(
        //   "../../../src/components/games/malayalam_model_no_reg.json"
        // ); // Adjust path if needed
        const loadedModel = await tf.loadLayersModel(
          "../../../src/components/games/model_090225.json"
        ); // Adjust path if needed
        setModel(loadedModel);
        console.log("Model loaded successfully!");
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const preprocessImage = async (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 128;
        canvas.height = 128;

        // Draw image on canvas (Resize to 128x128)
        ctx.drawImage(img, 0, 0, 128, 128);

        // Get image data
        const imageData = ctx.getImageData(0, 0, 128, 128);
        const pixels = imageData.data;
        const binaryPixels = new Array(128 * 128);

        // Extract single channel (Red) and binarize
        for (let i = 0; i < pixels.length; i += 4) {
          //const channelValue = pixels[i]; // Extract Red channel (Change to pixels[i+1] for Green, pixels[i+2] for Blue)

          // Convert to binary (Threshold = 128)
          const grayscale =
            0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
          const binaryValue = grayscale > 128 ? 1 : 0;

          binaryPixels[i / 4] = binaryValue;
        }

        // Ensure binaryPixels array length matches the expected size
        if (binaryPixels.length !== 128 * 128) {
          console.error("Unexpected binaryPixels length:", binaryPixels.length);
          return;
        }

        // Add this code to output the image on the screen
        const binaryImageData = new ImageData(
          new Uint8ClampedArray(
            binaryPixels.flatMap((v) => [v * 255, v * 255, v * 255, 255])
          ),
          128,
          128
        );
        const binaryCanvas = document.createElement("canvas");
        binaryCanvas.width = 128;
        binaryCanvas.height = 128;
        const binaryCtx = binaryCanvas.getContext("2d");
        binaryCtx.putImageData(binaryImageData, 0, 0);
        document.body.appendChild(binaryCanvas); // Append the binary image canvas to the body

        // Convert processed pixels to Tensor
        const tensor = tf
          .tensor(new Float32Array(binaryPixels), [128, 128, 1]) // Shape: (64, 64, 1) for single-channel binary image
          .expandDims(0) // Add batch dimension -> Shape: (1, 64, 64, 1)
          .toFloat();

        resolve(tensor);
      };
    });
  };

  // Predict
  const predict = async () => {
    if (!model || !image) return;

    const processedTensor = await preprocessImage(image);
    const predictions = model.predict(processedTensor);

    predictions.data().then((data) => {
      const maxPrediction = Math.max(...data);
      const maxIndex = data.indexOf(maxPrediction);
      console.log("Predictions:", maxPrediction, "index: ", maxIndex);
    });
  };

  return (
    <div>
      <h2>Upload an Image for Prediction</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" width="200px" />}
      <button onClick={predict} disabled={!model}>
        Predict
      </button>
    </div>
  );
};

export default DetectLetters;
