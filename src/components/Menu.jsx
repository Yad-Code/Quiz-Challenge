import { useState } from "react";
import Button from "./Button.jsx";
import QUESTIONS from "../data.js";
import GameOver from "./GameOver.jsx";
import Countdown from "react-countdown";

export default function Menu() {
  const [category, setCategory] = useState("menu");
  const [selectedCategory, setSelectedCategory] = useState("Geography");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctscore, setScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);
  const [end, setEnd] = useState(0);
  const [startGame, setStartGame] = useState(true);
  const [isActive, setIsActive] = useState(20);
  const [timer, setTimer] = useState(6);
  const [randomInt, setRandomInt] = useState([]);

  function genRandomNumber() {
    let newNum;
    if (randomInt.length >= isActive) {
      setEnd(1);
      setRandomInt([]);
    }
    do {
      newNum = Math.floor(Math.random() * 60);
    } while (randomInt.includes(newNum));

    setRandomInt((prev) => [...prev, newNum]);
    console.log("used Indexes: " + [...randomInt, newNum]);

    return newNum;
  }

  //-------------handling-Categories--------
  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  //-------------Late-Answer---------
  function lateAnswer() {
    setWrongScore((prev) => prev + 1);
    setCurrentIndex(genRandomNumber());
  }

  //---------------handling-answers----------------
  function handleAnswerClick(choosenIndex) {
    if (category != "menu") {
      if (
        choosenIndex === QUESTIONS[selectedCategory][currentIndex].correctIndex
      ) {
        setScore((prevScore) => prevScore + 1);
        setCurrentIndex(genRandomNumber());
      } else {
        setWrongScore((prev) => prev + 1);
        setCurrentIndex(genRandomNumber());
      }
    }
  }

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
            className={timer === 6}
            handleClick={() => handleTimerClick(6)}
            title={5 + "s"}
          />
          <Button
            className={timer === 11}
            handleClick={() => handleTimerClick(11)}
            title={10 + "s"}
          />
          <Button
            className={timer === 16}
            handleClick={() => handleTimerClick(16)}
            title={15 + "s"}
          />
          <Button
            className={timer === 21}
            handleClick={() => handleTimerClick(21)}
            title={20 + "s"}
          />
        </div>
        {startGame && (
          <div className="startBtn">
            <Button id="startBtn" title="Start Challenge" handleClick={gameStart} />
          </div>
        )}
      </div>
    </div>
  );

  const cat = (
    <div id="gameUi">
      <div id="secondPage">
        <button id="returnBtn" onClick={gameRestart}>
          Back
        </button>
        <h2>Category: {selectedCategory}</h2>
        {end != 1 && (
          <h3>
            <Countdown
              key={currentIndex}
              date={Date.now() + timer * 1000}
              onComplete={() => lateAnswer()}
              intervalDelay={1}
              precision={3}
              renderer={(props) => <div>{props.seconds}</div>}
            />
          </h3>
        )}
        <p>{QUESTIONS[selectedCategory][currentIndex].q}</p>

        <div className="myButtons">
          <Button
            title={QUESTIONS[selectedCategory][currentIndex].choices[0]}
            handleClick={() => handleAnswerClick("1")}
          />

          <Button
            title={QUESTIONS[selectedCategory][currentIndex].choices[1]}
            handleClick={() => handleAnswerClick("2")}
          />
          <Button
            title={QUESTIONS[selectedCategory][currentIndex].choices[2]}
            handleClick={() => handleAnswerClick("3")}
          />
          <Button
            title={QUESTIONS[selectedCategory][currentIndex].choices[3]}
            handleClick={() => handleAnswerClick("4")}
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
