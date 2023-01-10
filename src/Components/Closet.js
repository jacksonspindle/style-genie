import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCloset } from "../store/hoodies";
import Hoodie from "./Hoodie";
import { Canvas } from "@react-three/fiber";

const Closet = () => {
  const { hoodies, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    dispatch(getCloset());
  }, []);

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
              <img
                onMouseEnter={() => setHovered(true)}
                src={hoodie.image}
              ></img>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Closet;
