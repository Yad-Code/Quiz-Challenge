import { useState } from "react";
import Button from "./Button.jsx";
import QUESTIONS from "../data.js";
import GameOver from "./GameOver.jsx";
import SpotlightCard from "./Card.jsx";

export default function Menu() {
  const [category, setCategory] = useState("menu");
  const [selectedCategory, setSelectedCategory] = useState("Geography");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctscore, setScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);
  const [end, setEnd] = useState(0);

  const [randomInt, setRandomInt] = useState([]);

  function genRandomNumber() {
    let newNum;
    if (randomInt.length >= 10) {
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
    setCategory("cat");
    setSelectedCategory(category);
    setCurrentIndex(genRandomNumber());
  }

  //---------------handling-answers----------------
  function handleAnswerClick(choosenIndex) {
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

  //--------------Game-Restart-------------
  function gameRestart() {
    setCategory("menu");
    setEnd(0);
    setWrongScore(0);
    setScore(0);
    setRandomInt([]);
  }

  const menu = (
    <div id="firstPage">
      <h2>Quiz Challenge</h2>
      <p>Test your knowledge in multiple Categories</p>
      <h3>Choose from a category</h3>

      <div className="myButtons">
        <Button
          title="Geography"
          handleClick={() => handleCategoryClick("Geography")}
        />

        <Button
          title="Science"
          handleClick={() => handleCategoryClick("Science")}
        />
        <Button
          title="Sport"
          handleClick={() => handleCategoryClick("Sport")}
        />
        <Button
          title="Electronics"
          handleClick={() => handleCategoryClick("Electronics")}
        />
      </div>
    </div>
  );

  const cat = (
    <div id="firstPage">
      <h2>Category: {selectedCategory}</h2>
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
  );
  const gameOver = (
    <div id="gameOver">
      <h2>Your Score</h2>
      <p>Correct: , Wrong: </p>
    </div>
  );

  return (
    <div id="game">
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
    </div>
  );
}
