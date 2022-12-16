import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Hoodie from "./Hoodie";
import { OrbitControls, Environment } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import axios from "axios";

const CreateHoodie = () => {
  const [color, setColor] = useState("#FFFFFF");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    console.log(color);
  }, [color]);

  return (
    <div className="create-hoodie">
      <div className="create-hoodie-container">
        <div>
          <Canvas>
            <mesh>
              <Hoodie color={color} />
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
        </div>
      </div>
    </div>
  );
};

export default CreateHoodie;
