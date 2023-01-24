import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCloset } from "../store/hoodies";
import Hoodie from "./Hoodie";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { addCart } from "../store";

// const ItemDetailMenu = (props) => {
//   return (
//     <div className="item-detail-menu">
//       Item Detail
//       <div>Item</div>
//       <button
//         onClick={() => {
//           console.log(props.selectedItem);
//           if (auth.id) {
//             dispatch(addCart(hoodie));
//             alert("added to cart!");
//           }
//         }}
//       ></button>
//     </div>
//   );
// };

const Closet = (props) => {
  const { hoodies, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    dispatch(getCloset());
  }, []);

  console.log(hovered);

  console.log({ hoodies: hoodies, auth: auth });
  return (
    <div className="closet">
      {hoodies.map((hoodie, i) => {
        return (
          <div key={hoodie.id} className={"closet-container"}>
            {/* <h1>{hoodie.name}</h1> */}
            {/* {hovered ? (
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
                      dispatch(addCart(hoodie));
                      alert("added to cart!");
                    }
                  }}
                ></button>
              </div>
            )} */}

            <img
              className={"closet-image"}
              onClick={() => {
                console.log(selectedItem.image);
                setHovered(true);
                setSelectedItem(hoodie);
              }}
              // onMouseLeave={() => setHovered(true)}
              src={hoodie.image}
            ></img>
          </div>
        );
      })}
      {hovered ? (
        <div
          className="item-detail-menu"
          onMouseLeave={() => setHovered(false)}
        >
          <div>{selectedItem.name}</div>
          <div className="preview-canvas">
            <Canvas>
              <Hoodie image={selectedItem.image} />
              <OrbitControls minDistance={9} maxDistance={12} />
            </Canvas>
          </div>
          {/* <img
            // onMouseLeave={() => setHovered(false)}
            src={selectedItem.image}
          ></img> */}
          <button
            className="button-large"
            onClick={() => {
              console.log(selectedItem);
              if (auth.id) {
                dispatch(addCart(selectedItem));
                alert("added to cart!");
              }
            }}
          >
            Add To Cart
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Closet;
