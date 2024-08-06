"use client"

import { generateQuiz } from '@/utils/generateQuiz'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import '@/styles/globals.css'
import QuestionCard from '@/components/QuestionCard'


const NewQuiz = () => {
    const [loading, setLoading] = useState(false)
    const { data: session, status } = useSession();
    const [questions, setQuestions] = useState([])
    const [score, setScore] = useState(0);

    useEffect(() => {
        
        if(status === 'authenticated'){
            const fetchQuestions = async () => {
                setLoading(true)
                const quiz = await generateQuiz(session.user.name)
                setQuestions(quiz)
                setLoading(false)
                console.log(quiz)
                console.log(session)
            }
            fetchQuestions()
            }

    }, [status, session?.user.name])

    return (
        <div>
            {loading 
            ?
                <h1>Loading...</h1> 
            :
                <div className='flex flex-col items-center'>
                    {questions.map((question, index) => {
                        return (
                            <div key={index}>
                                <QuestionCard question = {question} setScore = {setScore}/>
                            </div>
                        )
                    })}
                    <h1>Your score: {score}</h1>
                </div>
            
            }

            
        </div>
    )
}

export default NewQuiz