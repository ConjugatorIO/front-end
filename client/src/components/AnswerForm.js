import React, { useState, useEffect } from 'react'
import UIfx from "uifx"
import correctAudio from "../assets/correct.mp3"
import incorrectAudio from "../assets/incorrect.mp3"
import Charts from './Charts'

const correct = new UIfx (
  correctAudio,
  {
    volume: 0.6
  }
)

const incorrect = new UIfx (
  incorrectAudio,
  {
    volume: 0.6,
    throttleMs: 300
  }
)

// const answersArray = [
//     'Camino',
//     'Habla',
//     'Comes'
// ]

// const questionsArray = [
//     'Conjugate Caminar to First Person Present',
//     'Conjugate Hablar to Third Person Present',
//     'Conjugate Comer to Second Person Present'
// ]

const dataArray = [
    {'Conjugate Caminar to First Person Present': 'Camino'},
    {'Conjugate Hablar to Third Person Present': 'Habla'},
    {'Conjugate Comer to Second Person Present': 'Comes'},
    {'Conjugate Beber to Third Person Present Plural': 'Beben'},
    {'Conjugate Mirar to First Person Present': 'Miro'},
    {'Conjugate Pagar to Third Person Present Plural': 'Pagan'},
    {'Conjugate Parar to Second Person Present': 'Paras'},
    {'Conjugate Ganar to First Person Present Plural': 'Ganamos'},
    {'Conjugate Estar to Third Person Present Plural': 'Estan'},
    {'Conjugate Tener to First Person Present': 'Tengo'},
    {'Conjugate Ir to Second Person Present': 'Vas'}
]

const AnswerForm = props => {
    
    const [streak, setStreak] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [totalQs, setTotalQs] = useState(0)
    const [currentQ, setCurrentQ] = useState(Object.keys(dataArray[currentIndex]).join())
    const [answers, setAnswers] = useState({
        answerBar: ''
      })

    const addOne = e => {
        setStreak(streak + 1)
        setCurrentIndex(currentIndex + 1)
        setTotalQs(totalQs + 1)
        setCurrentQ(Object.keys(dataArray[currentIndex + 1]).join())
        if(currentIndex === 9){
            setCurrentQ(Object.keys(dataArray[0]).join())
            setCurrentIndex(0)
        }
    }

    function checkAnswer(){
        if(answers.answerBar === Object.values(dataArray[currentIndex]).join()){
            addOne()
            correct.play()
        }else {
            setStreak(0)
            incorrect.play()
       }
    }

    console.log(currentIndex)

    const handleChange = event => {
        setAnswers({[event.target.name]: event.target.value});
        console.log(answers)
      }

      const handleSubmit = event => {
        event.preventDefault();
        setAnswers({answerBar: ''})
        console.log(answers)
      }
    
    
    return (
        <div>
            {streak} {totalQs}
            <form onSubmit={event => handleSubmit(event)}>
                <label htmlFor='answerBar'>
                    Answer:
                </label>
                <input 
                type="text" 
                name="answerBar" 
                value={answers.answerBar}
                onChange={event => handleChange(event)} />
                <button onSubmit={() => handleSubmit()} onClick={checkAnswer}>Submit!</button>
            </form>
            <p>{currentQ}</p>
            <Charts streak={streak} currentIndex={currentIndex}/>
      </div>
    )
}

export default AnswerForm