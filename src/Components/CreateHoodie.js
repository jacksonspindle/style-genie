import React, { useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Hoodie from "./Hoodie";
import { OrbitControls, Environment } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCloset } from "../store/hoodies";
import { useControls, button, folder } from "leva";
import { addCart } from "../store";

const Scene = (props) => {
  const gl = useThree((state) => state.gl);
  // const [imageDownload, setImageDownload] = useState("");
  useControls({
    screenshot: button(() => {
      const link = document.createElement("a");
      link.setAttribute("download", "hoodie.png");
      link.setAttribute(
        "href",
        gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      setImageDownload(link);
      link.click();

      // console.log(imageDownload);
    }),
  });
  console.log(props);
  return (
    <>
      <mesh>
        <Hoodie color={props.color} image={props.result} />
        <ambientLight />
        <OrbitControls minDistance={10} maxDistance={15} />
      </mesh>
      <Environment preset="city" />
    </>
  );
};

const CreateHoodie = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [color, setColor] = useState("#FFFFFF");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  const [dalleToggle, setDalleToggle] = useState(true);

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
      return (
        <img
          src="../../static/default-image.png"
          className="dalle-preview-image"
        />
      );
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
      // console.log(hoodie);
    }
  };

  useEffect(() => {
    document.title = "StyleGenie 🎨";
  }, []);

  const toggleDalle = () => {
    setDalleToggle(!dalleToggle);
  };

  const { ...props } = useControls({
    // myFooColor: "#fff",
    // myBarColor: { r: 200, b: 125, g: 106, a: 0.4 },
    // enabled: true,
    // movingDownsampling: true,
    // useTileRender: false,
    // dpr: { value: 1.5, min: 0.5, max: 2, step: 0.5 },
    // samples: { value: 128, min: 8, max: 2048, step: 8 },
    // bounces: { value: 4, min: 1, max: 10, step: 1 },
    // envMapIntensity: { value: 0.7, min: 0, max: 1 },
    // denoise: folder({
    //   enableDenoise: false,
    //   enableTemporalDenoise: true,
    //   enableSpatialDenoise: true,
    //   denoiseColorBlendFactor: { value: 0.5, min: 0, max: 1 },
    //   denoiseMomentBlendFactor: { value: 0.5, min: 0, max: 1 },
    //   denoiseColorFactor: { value: 0.1, min: 0, max: 1 },
    //   denoisePositionFactor: { value: 0.1, min: 0, max: 1 },
    // }),
  });

  // const putInCart = (garment) => {
  //   if (auth.id) {
  //     const garment = {
  //       productId: "",
  //       userId: auth.id,
  //       name: prompt,
  //       bodyColor: color,
  //       image: image.replace("data:image/png;base64,", ""),
  //     };
  //     console.log(garment);
  //     dispatch(addCart(garment));
  //     alert("added to cart!");
  //   }
  // };

  return (
    <div className="create-hoodie">
      <div className="create-hoodie-container">
        <div>
          <Canvas gl={{ preserveDrawingBuffer: true }}>
            <Scene color={color} result={result} />
          </Canvas>
        </div>
        <div className="color-picker">
          <HexColorPicker color={color} onChange={setColor} />
        </div>
        <div onMouseEnter={toggleDalle} className={"dalle-container"}>
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
