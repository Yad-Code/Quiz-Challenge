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
  const [isActive, setIsActive] = useState(20); //-----Question number---------
  const [timer, setTimer] = useState(11); //-----Choosen time-------
  const [randomInt, setRandomInt] = useState([]);
  const [isTrue, setIsTrue] = useState(0);
  const [isWrong, setIsWrong] = useState(0);
  const [show, setShow] = useState("");

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
    console.log("used Indexes: " + [...randomInt, newNum]);

    return newNum;
  }

  //--------------------correct-answer-comment-------
  const good = ["GoodJob!⭐", "Keep going!🥇", "Don't stop 👏", "Nice Work!🏆"];
  function randomCall() {
    return Math.floor(Math.random() * 4);
  }

  const goodJob = good[randomCall()];

  //--------------------wrong-answer-comment---------
  const bad = [
    "Incorrect ❌",
    "Is that all you got 🤦",
    "Wrong 💥",
    "Try harder",
  ];

  const badJob = bad[randomCall()];

  function randomCall() {
    return Math.floor(Math.random() * 4);
  }

  //-------------handling-Categories--------
  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  //-------------Late-Answer---------
  function lateAnswer() {
    setWrongScore((prev) => prev + 1);
    const correct = QUESTIONS[selectedCategory][currentIndex].correctIndex;
    setIsTrue(correct);
    setTimeout(() => {
      setCurrentIndex(genRandomNumber());
      setIsTrue("");
    }, 1500);
  }

  const isLocked = useRef(false);
  //---------------handling-answers----------------
  function handleAnswerClick(choosenIndex) {
    if (isLocked.current) return;
    isLocked.current = true;

    const correct = QUESTIONS[selectedCategory][currentIndex].correctIndex;
    if (category != "menu") {
      setIsTrue(correct);
      if (choosenIndex === correct) {
        setShow("correct");
        setTimeout(() => {
          setScore((prevScore) => prevScore + 1);
          setCurrentIndex(genRandomNumber());
          setIsWrong("");
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
          setIsWrong("");
          setShow("");
          setIsTrue("");
          isLocked.current = false;
        }, 1500);
      }
    }
  }

  //-----------checkingTheTruth----

  //------------Active--------------
  function activeButton(num) {
    setIsActive(num);
  }

  //------------Timer----------------------
  function handleTimerClick(time) {
    setTimer(time);
  }

  //-------------Game-Start----------------
  function gameStart() {
    setCategory("cat");
    setCurrentIndex(genRandomNumber());
    setStartGame(false);
  }

  //--------------Game-Restart-------------
  function gameRestart() {
    setCategory("menu");
    setEnd(0);
    setWrongScore(0);
    setScore(0);
    setStartGame(true);
    setRandomInt([]);
  }
  //--------------------------------------
  const categoryRef = useRef(category);

  useEffect(() => {
    categoryRef.current = category;
  }, [category]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== "Enter") return;

      const tag = (e.target && e.target.tagName) || "";
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;

      if (categoryRef.current === "menu") {
        setCategory("cat");
        setCurrentIndex(genRandomNumber());
        setStartGame(false);
      } else {
        setCategory("menu");
        setEnd(0);
        setWrongScore(0);
        setScore(0);
        setStartGame(true);
        setRandomInt([]);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  //-------------------------------- MENU -------------------------------
  const menu = (
    <div id="game">
      <div id="firstPage">
        <h1>Quiz Challenge</h1>
        <p>Test your knowledge in multiple Categories</p>
        <h3>Choose from a category</h3>

        <div className="myButtons">
          <Button
            className={selectedCategory === "Geography"}
            title="Geography"
            handleClick={() => handleCategoryClick("Geography")}
          />

          <Button
            className={selectedCategory === "Science"}
            title="Science"
            handleClick={() => handleCategoryClick("Science")}
          />
          <Button
            className={selectedCategory === "Sport"}
            title="Sport"
            handleClick={() => handleCategoryClick("Sport")}
          />
          <Button
            className={selectedCategory === "Electronics"}
            title="Electronics"
            handleClick={() => handleCategoryClick("Electronics")}
          />
        </div>
        <h3>Select Question Number</h3>
        <div className="myButtons">
          <Button
            className={isActive === 5}
            handleClick={() => activeButton(5)}
            title={5}
          />
          <Button
            className={isActive === 10}
            handleClick={() => activeButton(10)}
            title={10}
          />
          <Button
            className={isActive === 15}
            handleClick={() => activeButton(15)}
            title={15}
          />
          <Button
            className={isActive === 20}
            handleClick={() => activeButton(20)}
            title={20}
          />
        </div>
        <h3>Time Limit</h3>
        <div className="myButtons">
          <Button
            id="seconds"
            className={timer === 1000}
            handleClick={() => handleTimerClick(1000)}
            title={"No Limit"}
          />
          <Button
            id="seconds"
            className={timer === 11}
            handleClick={() => handleTimerClick(11)}
            title={10 + " Seconds"}
          />
          <Button
            id="seconds"
            className={timer === 16}
            handleClick={() => handleTimerClick(16)}
            title={15 + " Seconds"}
          />
          <Button
            id="seconds"
            className={timer === 21}
            handleClick={() => handleTimerClick(21)}
            title={20 + " Seconds"}
          />
        </div>
        {startGame && (
          <div className="startBtn">
            <Button
              id="startBtn"
              title="Start Challenge"
              handleClick={gameStart}
            />
            <p id="small">
              or press <span id="bold">Enter</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const cat = (
    <div id="gameUi">
      <div id="secondPage">
        <button id="returnBtn" onClick={gameRestart}>
          <img src={leftArrow} id="svg" alt="" />
          Back
        </button>
        <div id="myflex">
          <h2>
            Question {randomInt.length} of {isActive}
          </h2>
          {end != 1 && (
            <h3>
              {timer != 1000 && (
                <>
                  <span id="time">Time</span>
                  <Countdown
                    key={currentIndex}
                    date={Date.now() + timer * 1000}
                    onComplete={() => {
                      lateAnswer();
                      setTimer((prev) => (prev = timer));
                    }}
                    intervalDelay={1}
                    precision={3}
                    renderer={(props) => <div>{props.seconds}</div>}
                  />
                </>
              )}
            </h3>
          )}
        </div>
        <img
          id="questionimg"
          src={QUESTIONS[selectedCategory][currentIndex].img}
        />
        <div id="popup">
          {show === "correct" ? (
            <div id="comment">
              <h4>{goodJob}</h4>
            </div>
          ) : null}
          {show === "wrong" ? (
            <div id="bad">
              <h4>{badJob}</h4>
            </div>
          ) : null}
        </div>
        <p>{QUESTIONS[selectedCategory][currentIndex].q}</p>

        <div className="myButtons">
          <TrueButton
            title={QUESTIONS[selectedCategory][currentIndex].choices[0]}
            handleClick={() => {
              handleAnswerClick("1");
            }}
            isTrue={isTrue === "1"}
            isWrong={isWrong === "1"}
          />

          <TrueButton
            title={QUESTIONS[selectedCategory][currentIndex].choices[1]}
            handleClick={() => {
              handleAnswerClick("2");
            }}
            isTrue={isTrue === "2"}
            isWrong={isWrong === "2"}
          />
          <TrueButton
            title={QUESTIONS[selectedCategory][currentIndex].choices[2]}
            handleClick={() => {
              handleAnswerClick("3");
            }}
            isTrue={isTrue === "3"}
            isWrong={isWrong === "3"}
          />
          <TrueButton
            title={QUESTIONS[selectedCategory][currentIndex].choices[3]}
            handleClick={() => {
              handleAnswerClick("4");
            }}
            isTrue={isTrue === "4"}
            isWrong={isWrong === "4"}
          />
        </div>
      </div>
    </div>
  );
  const gameOver = (
    <div id="gameOver">
      <h2>Your Score</h2>
      <p>Correct: , Wrong: </p>
    </div>
  );

  return (
    <>
      <div class="stars"></div>
      {category === "menu" ? menu : cat}
      {end === 1 ? (
        <GameOver
          handleClick={() => {
            gameRestart();
          }}
          score={correctscore}
          wrong={wrongScore}
        />
      ) : null}
    </>
  );
}
