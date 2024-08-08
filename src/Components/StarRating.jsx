import { useState } from "react";
import Star from "./Star";

const StarRating = ({
  maxRating = 10,
  color = "#ffd700",
  size = "8",
  textColor = "#fff",
  onSetRating,
}) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rate) {
    setRating(rate);
    onSetRating(rate);
  }
  return (
    <div className="text-black">
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => handleRating(i + 1)}
            onHoverOut={() => handleRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <span className="text-lg text-white font-bold">{rating || ""}</span>
    </div>
  );
};

export default StarRating;
