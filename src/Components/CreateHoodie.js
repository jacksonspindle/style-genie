import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Hoodie from "./Hoodie";
import { OrbitControls, Environment } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCloset } from "../store/hoodies";

const CreateHoodie = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [color, setColor] = useState("#FFFFFF");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");

  const getImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImage("");
    const imageResult = await axios.post("/api/image", { prompt });
    setImage(`data:image/png;base64,${imageResult.data}`);
    setLoading(false);
  };

  const displayImage = () => {
    if (!image && !loading) {
      return <img src="../../static/default-image.png" />;
    } else if (!image && loading) {
      return "";
    } else {
      return <img src={image} />;
    }
  };

  const addToHoodie = () => {
    setResult(image);
  };

  const addToCollection = (ev) => {
    console.log("adding to collection!");
    const hoodie = {
      userId: auth.id,
      name: prompt,
      bodyColor: color,
      image: image.replace("data:image/png;base64,", ""),
    };

    if (image.startsWith("data:image/png;base64,")) {
      dispatch(addToCloset(hoodie));
      console.log(hoodie);
    }
  };

  useEffect(() => {
    document.title = "StyleGenie 🎨";
  }, []);

  return (
    <div className="create-hoodie">
      <div className="create-hoodie-container">
        <div>
          <Canvas>
            <mesh>
              <Hoodie color={color} image={result} />
              <ambientLight />
              <OrbitControls minDistance={10} maxDistance={15} />
            </mesh>
            <Environment preset="city" />
          </Canvas>
        </div>
        <div className="color-picker">
          <HexColorPicker color={color} onChange={setColor} />
        </div>
        <div className="dalle-container">
          <h3>Generate an Image:</h3>
          <input
            type={"text"}
            placeholder={"type any prompt..."}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          ></input>
          <button className="button-small" onClick={getImage}>
            Generate Image
          </button>
          {displayImage()}

          <button onClick={addToHoodie}>Add to Hoodie</button>
        </div>
        <div>
          <button onClick={addToCollection}>Save Design</button>
        </div>
      </div>
    </div>
  );
};

export default CreateHoodie;
