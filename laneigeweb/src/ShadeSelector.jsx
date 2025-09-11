import { useState } from "react";
import "./ShadeSelector.css";

export default function ShadeSelector() {
  const shades = [
    {
      name: "Strawberry Sprinkles",
      color: "#fcb6c8",
      cname:"Cool Pink",
      image: "/S.png",
    },
    {
      name: "Blueberry Jelly",
      color: "#870f59",
      cname:"Vibrant Purple",
      image: "/B.png",
    },
    {
      name: "Maple Glaze",
      color: "#935148",
      cname:"Rosy Maple",
      image: "/M.png",
    },
    {
      name: "Raspberry Jam",
      color: "#d31c35",
      cname:"Sheer Red",
      image: "/R.png",
    },
    {
      name: "Sugar Glaze",
      color: "#d7a596",
      cname:"Nude Beige",
      image: "/SU.png",
    },
    {
      name: "Cinnamon Sugar",
      color: "#8d4957",
      cname:"Mauve Pink",
      image: "/C.png",
    },
    {
      name: "Chocolate Frosting",
      color: "#61252a",
      cname:"Warm Brown",
      image: "/CH.png",
    },
    {
      name: "Peach Glaze",
      color: "#b25a62",
      cname:"Peachy Coral",
      image: "/P.png",
    },
  ];

  const [selectedShade, setSelectedShade] = useState(shades[0]);

  return (
    <section className="shade-section">
      {/* Left: Product Image */}
      <div className="shade-image">
        <img
          src={selectedShade.image}
          alt={selectedShade.name}
          className="product-img"
        />
      </div>

      {/* Right: Shade Info */}
      <div className="shade-info">
        {/* Shade Name */}
        <h2 className="shade-name">{selectedShade.name}</h2>
        <h4 className="shade-cname">{selectedShade.cname}</h4>

        {/* Color Circles */}
        <div className="shade-circles">
          {shades.map((shade, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedShade(shade)}
              className={`shade-circle ${
                selectedShade.name === shade.name ? "active" : ""
              }`}
              style={{ backgroundColor: shade.color }}
            ></button>
          ))}
        </div>

        <p className="shade-price">$22.00</p>

        <button className="add-btn">ADD TO CART</button>
      </div>
    </section>
  );
}
