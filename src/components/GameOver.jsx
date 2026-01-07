import CountUp from "./CountUp.jsx";
import AnimatedContent from "./AnimateContent.jsx";

export default function GameOver({ handleClick, score, wrong }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
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
        <div className="bg-[#2e3643] p-8 rounded-3xl shadow-xl text-center w-11/12 max-w-md">
          <h2 className="text-4xl font-bold mb-4 text-[#818cf8]">Your Score</h2>
          
          <p className="text-lg mb-6">
            Correct:{" "}
            <CountUp
              from={0}
              to={score}
              separator=","
              direction="up"
              duration={1}
              className="font-semibold text-green-400"
            />{" "}
            , Wrong:{" "}
            <CountUp
              from={0}
              to={wrong}
              separator=","
              direction="up"
              duration={1}
              className="font-semibold text-red-400"
            />
          </p>

          <h3 className={`text-2xl font-bold mb-6 ${score >= wrong ? "text-green-400" : "text-red-400"}`}>
            {score >= wrong ? "Congrats 🎉" : "You Lose 😢"}
          </h3>

          <button
            onClick={(e) => {
              handleClick();
              e.target.blur();
            }}
            className="px-6 py-2 bg-[#818cf8] text-white font-semibold rounded-lg shadow-lg hover:bg-[#5263fb] transition-colors duration-300"
          >
            Restart
          </button>
        </div>
      </AnimatedContent>
    </div>
  );
}
