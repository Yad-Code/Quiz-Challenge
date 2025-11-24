import CountUp from "./CountUp.jsx";
import AnimatedContent from "./AnimateContent.jsx";
import SpotlightCard from "./Card.jsx";

export default function GameOver({ handleClick, score, wrong }) {
  return (
    <div id="gameOver">
      
        <AnimatedContent
          distance={300}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="bounce.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1.5}
          threshold={0.1}
          delay={0}
        >
          <h2 id="gH2">Your Score</h2>
          <p id="gP">
            Correct:{" "}
            <CountUp
              from={0}
              to={score}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />{" "}
            , Wrong:{" "}
            <CountUp
              from={0}
              to={wrong}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />{" "}
          </p>
          <h3 id="gH3">{score >= wrong ? "Congrats" : "You Lose"}</h3>

          <button
            onClick={(e) => {
              handleClick();
              e.target.blur();
            }}
          >
            Restart
          </button>
        </AnimatedContent>
      
    </div>
  );
}
