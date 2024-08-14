import React from "react";
import { useSpring, animated } from "@react-spring/web";

const Congratulations: React.FC<{ message: string }> = ({ message }) => {
  const props = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.5)" },
    config: { duration: 2000 },
  });

  return (
    <animated.div
      style={{
        ...props,
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        border: "2px solid green",
        padding: "10px",
        textAlign: "center",
        fontSize: "1.5rem",
        borderRadius: "10px",
        transform: "translate(0%, 0%)",
      }}
    >
      {message}
    </animated.div>
  );
};

export default Congratulations;
