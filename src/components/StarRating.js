import Star from "./Star";
import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

StarRating.propTypes = {
  maxRating: PropTypes.number.isRequired,
  fillColor: PropTypes.string,
  borderColor: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  setterFunction: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  fillColor = "#fcc419",
  borderColor = "#e9ecef",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  setterFunction,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    fontSize: `${size / 1.5}px`,
  };

  const handleRatingClick = (userRating) => {
    setRating(userRating);
    if (setterFunction) {
      setterFunction(userRating);
    }
  };

  const handleRatingMouseEnter = (userRating) => {
    setTempRating(userRating);
  };

  const handleRatingMouseLeave = (userRating) => {
    setTempRating(userRating);
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRatingClick(i + 1)}
            onEnter={() => handleRatingMouseEnter(i + 1)}
            onLeave={() => handleRatingMouseLeave(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            fillColor={fillColor}
            borderColor={borderColor}
            size={size}
            messages={messages}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}
