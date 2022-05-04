import React, { useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './App.css'

const App: React.FC = () => {
  const {
    listening,
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  const [number, setNumber] = useState(Math.floor(Math.random() * 10))
  const [color, setColor] = useState('black')

  useEffect(() => {
    function updateNumber() {
      setTimeout(() => {
        resetTranscript()
        setColor('black')
        setNumber(Math.floor(Math.random() * 10))
      }, 2000)
    }

    if (transcript && listening === false) {
      if (transcript === String(number)) {
        setColor('green')
        updateNumber()
      }
      if (transcript !== String(number)) {
        setColor('red')
        updateNumber()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, listening])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <div id="container">
      <span style={{ color }}>{number}</span>
      {listening ? (
        <div onClick={() => SpeechRecognition.stopListening()}>❌</div>
      ) : (
        <div onClick={() => SpeechRecognition.startListening({ language: 'pt-BR' })}>🎙️</div>
      )}
      
    </div>
  )
}

export default App
