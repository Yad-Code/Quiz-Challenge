import { useEffect, useState, useRef } from "react";
import Button from "./Button.jsx";
import TrueButton from "./TrueButton.jsx";
import QUESTIONS from "../data.js";
import GameOver from "./GameOver.jsx";
import Countdown from "react-countdown";
import leftArrow from "./left-arrow.png";

export default function Menu() {
  const [category, setCategory] = useState("menu");
  const [selectedCategory, setSelectedCategory] = useState("Geography");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctscore, setScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);
  const [end, setEnd] = useState(0);
  const [startGame, setStartGame] = useState(true);
  const [isActive, setIsActive] = useState(20);
  const [timer, setTimer] = useState(11);
  const [randomInt, setRandomInt] = useState([]);
  const [isTrue, setIsTrue] = useState(0);
  const [isWrong, setIsWrong] = useState(0);
  const [show, setShow] = useState("");

  const isLocked = useRef(false);

  function genRandomNumber() {
    let newNum;
    if (randomInt.length >= isActive) {
      setEnd(1);
      setRandomInt([]);
    }
    do {
      newNum = Math.floor(Math.random() * 35);
    } while (randomInt.includes(newNum));
    setRandomInt((prev) => [...prev, newNum]);
    return newNum;
  }

  const good = ["GoodJob!⭐", "Keep going!🥇", "Don't stop 👏", "Nice Work!🏆"];
  const bad = [
    "Incorrect ❌",
    "Is that all you got 🤦",
    "Wrong 💥",
    "Try harder",
  ];
  const goodJob = good[Math.floor(Math.random() * good.length)];
  const badJob = bad[Math.floor(Math.random() * bad.length)];

  function handleCategoryClick(cat) {
    setSelectedCategory(cat);
  }
  function activeButton(num) {
    setIsActive(num);
  }
  function handleTimerClick(time) {
    setTimer(time);
  }

  function lateAnswer() {
    setWrongScore((prev) => prev + 1);
    const correct = QUESTIONS[selectedCategory][currentIndex].correctIndex;
    setIsTrue(correct);
    setTimeout(() => {
      setCurrentIndex(genRandomNumber());
      setIsTrue("");
    }, 1500);
  }

  function handleAnswerClick(choosenIndex) {
    if (isLocked.current) return;
    isLocked.current = true;
    const correct = QUESTIONS[selectedCategory][currentIndex].correctIndex;
    setIsTrue(correct);

    if (choosenIndex === correct) {
      setShow("correct");
      setTimeout(() => {
        setScore((prev) => prev + 1);
        setCurrentIndex(genRandomNumber());
        setShow("");
        setIsTrue("");
        isLocked.current = false;
      }, 1500);
    } else {
      setShow("wrong");
      setIsWrong(choosenIndex);
      setTimeout(() => {
        setWrongScore((prev) => prev + 1);
        setCurrentIndex(genRandomNumber());
        setShow("");
        setIsTrue("");
        setIsWrong("");
        isLocked.current = false;
      }, 1500);
    }
  }

  function gameStart() {
    setCategory("cat");
    setCurrentIndex(genRandomNumber());
    setStartGame(false);
  }

  function gameRestart() {
    setCategory("menu");
    setEnd(0);
    setWrongScore(0);
    setScore(0);
    setStartGame(true);
    setRandomInt([]);
  }

  const categoryRef = useRef(category);
  useEffect(() => {
    categoryRef.current = category;
  }, [category]);
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== "Enter") return;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      categoryRef.current === "menu" ? gameStart() : gameRestart();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#0b0b2b] via-[#1b2735] to-[#090a0f] text-white px-4">
       

      {category === "menu" && (
        <div className="bg-[#2e3643] rounded-3xl shadow-xl max-w-3xl w-full p-8 flex flex-col items-center space-y-8">
          <h1 className="text-5xl font-extrabold text-[#818cf8] text-center">
            Quiz Challenge
          </h1>
          <p className="text-lg text-white/70 text-center">
            Test your knowledge in multiple Categories
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            {["Geography", "Science", "Sport", "Electronics"].map((cat) => (
              <Button
                key={cat}
                title={cat}
                className={selectedCategory === cat}
                handleClick={() => handleCategoryClick(cat)}
              />
            ))}
          </div>

          <h3 className="text-2xl text-white/90  mt-4">
            Select Question Number
          </h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {[5, 10, 15, 20].map((num) => (
              <Button
                key={num}
                title={num}
                className={isActive === num}
                handleClick={() => activeButton(num)}
              />
            ))}
          </div>

          <h3 className="text-2xl mt-4">Time Limit</h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {[1000, 11, 16, 21].map((time) => (
              <Button
                key={time}
                title={time === 1000 ? "No Limit" : time - 1 + " Seconds"}
                className={timer === time}
                handleClick={() => handleTimerClick(time)}
              />
            ))}
          </div>

          {startGame && (
            <div className="flex flex-col items-center mt-8 space-y-2 z-2">
              <Button
                title="Start Challenge"
                handleClick={gameStart}
                className="
        w-64 h-16                     /* bigger width and height */
        bg-[#818cf8]                   /* original color */
        text-white text-2xl font-extrabold
        rounded-xl
        shadow-[0_4px_5px_0.5px_#5a6093]   /* exactly like CSS box-shadow */
        hover:bg-[#5263fb]             /* hover color */
        hover:shadow-[0_4px_5px_0.5px_#5a6093] 
        hover:-translate-y-2
        active:translate-y-1
        transition-all duration-100 ease-in-out
        focus:outline-none
      "
                id="startbtn"
              />
              <p className="text-sm text-white/80">
                or press <span className="px-2 rounded bg-white/20">Enter</span>
              </p>
            </div>
          )}
        </div>
      )}

      {category === "cat" && !end && (
        <div className="bg-[#2e3643] rounded-3xl shadow-xl max-w-3xl w-full p-6 flex flex-col items-center space-y-6">
          <button
            onClick={gameRestart}
            className="self-start flex items-center space-x-2 text-white hover:text-[#818cf8]"
          >
            <img src={leftArrow} alt="Back" className="w-6 h-6" />
            <span>Back</span>
          </button>

          <div className="flex flex-col md:flex-row w-full justify-between items-center">
            <h2 className="text-xl font-bold">
              Question {randomInt.length} of {isActive}
            </h2>
            {timer !== 1000 && (
              <div className="flex items-center space-x-2 text-lg">
                <span>Time:</span>
                <Countdown
                  key={currentIndex}
                  date={Date.now() + timer * 1000 - 1000}
                  onComplete={lateAnswer}
                  renderer={(props) => <span>{props.seconds}</span>}
                />
              </div>
            )}
          </div>

          <img
            src={QUESTIONS[selectedCategory][currentIndex].img}
            className="max-w-full h-52 object-contain my-4 rounded"
            alt="Question"
          />

        
          {show === "correct" && (
            <div className="bg-green-700/60 text-green-200 rounded-md p-2 shadow-md w-full text-center">
              {goodJob}
            </div>
          )}
          {show === "wrong" && (
            <div className="bg-red-700 text-red-300 rounded-md p-2 shadow-md w-full text-center">
              {badJob}
            </div>
          )}

          <p className="text-lg text-center">
            {QUESTIONS[selectedCategory][currentIndex].q}
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            {QUESTIONS[selectedCategory][currentIndex].choices.map(
              (choice, i) => (
                <TrueButton
                  key={i}
                  title={choice}
                  handleClick={() => handleAnswerClick((i + 1).toString())}
                  isTrue={isTrue === (i + 1).toString()}
                  isWrong={isWrong === (i + 1).toString()}
                />
              )
            )}
          </div>
        </div>
      )}

      {end === 1 && (
        <GameOver
          handleClick={gameRestart}
          score={correctscore}
          wrong={wrongScore}
        />
      )}
    </div>
  );
}
