import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCloset } from "../store/hoodies";
import Hoodie from "./Hoodie";
import { Canvas } from "@react-three/fiber";
import { addCart } from "../store";

const Closet = (props) => {
  const { hoodies, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    dispatch(getCloset());
  }, []);

  //   const putInCart = (garment) => {
  //     if (auth.id) {
  //       const garment = {
  //         productId: "",
  //         userId: auth.id,
  //         name: props.prompt,
  //         bodyColor: props.color,
  //         // image: props.image.replace("data:image/png;base64,", ""),
  //       };
  //       console.log(garment);
  //       dispatch(addCart(garment));
  //       alert("added to cart!");
  //     }
  //   };

  console.log({ hoodies: hoodies, auth: auth });
  return (
    <div>
      {hoodies.map((hoodie, i) => {
        return (
          <div key={hoodie.id} className={"closet-container"}>
            <h1>{hoodie.name}</h1>
            {hovered ? (
              <Canvas onMouseLeave={() => setHovered(false)}>
                <Hoodie image={hoodie.image} />
              </Canvas>
            ) : (
              <div>
                <img
                  onMouseEnter={() => setHovered(true)}
                  src={hoodie.image}
                ></img>
                <button
                  onClick={() => {
                    if (auth.id) {
                      //   const garment = {
                      //     hoodieId: hoodie.id,
                      //     userId: auth.id,
                      //     name: props.prompt,
                      //     bodyColor: props.color,
                      //     // image: props.image.replace("data:image/png;base64,", ""),
                      //   };
                      //   console.log(garment);
                      dispatch(addCart(hoodie));
                      alert("added to cart!");
                    }
                  }}
                ></button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Closet;
