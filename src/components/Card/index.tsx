import React from "react";

type Props = {
  p: any;
  i: number;
  deleteFunction: (i: number) => void;
};

const Card = ({ p, i, deleteFunction }: Props) => (
  <div
    key={i}
    className="relative text-center bg-yellow-600 p-8 rounded-md w-56 mr-4"
  >
    <button
      className="bg-red-500 w-6 h-6 rounded text-center text-white text-xl absolute top-3 right-3"
      onClick={() => {
        deleteFunction(i);
      }}
    >
      x
    </button>
    <p className="text-2xl text-yellow-400 mb-4">{p.name}</p>
    <p className="text-base text-yellow-400">Category: {p.category}</p>
    <p className="text-base text-yellow-400">Price: {p.price}</p>
    <p className="text-base text-yellow-400">Description: {p.description}</p>
  </div>
);

export default Card;
