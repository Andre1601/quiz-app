import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../Api";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10000);
    const [answers, setAnswers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getQuestions = async () => {
            const questionsData = await fetchQuestions();
            setQuestions(questionsData);
        };
        getQuestions();
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        } else {
            const correctCount = answers.filter(
                (a) => a.userAnswer === a.correctAnswer
            ).length;
            const resultData = {
                answered: answers.length,
                correct: correctCount,
                incorrect: questions.length - correctCount,
            };
            navigate("/result", { state: { results: resultData } });
        }
    }, [timeLeft, navigate]);

    const handleAnswer = (answer) => {
        const updatedAnswers = [
            ...answers,
            {
                question: question.question,
                userAnswer: answer,
                correctAnswer: question.correct_answer,
            },
        ];
        setAnswers(updatedAnswers);

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setTimeout(() => {
                const correctCount = updatedAnswers.filter(
                    (a) => a.userAnswer === a.correctAnswer
                ).length;
                const resultData = {
                    answered: updatedAnswers.length,
                    correct: correctCount,
                    incorrect: updatedAnswers.length - correctCount,
                };
                navigate("/result", { state: { results: resultData } });
            }, 100);
        }
    };

    const question = questions[currentIndex];

    return (
        <main className="flex flex-col items-end p-12 space-y-10">
            {/* Timer */}
            <div className="flex bg-gray-500 w-36 h-24 rounded-xl justify-center items-center">
                <p className="text-4xl text-neutral-100">{timeLeft}</p>
            </div>

            {question && (
                <>
                    {/* Soal */}
                    <div className="flex bg-slate-600 w-full h-80 px-16 rounded-xl justify-center items-center">
                        <p className="text-3xl text-slate-100">
                            {question.question}
                        </p>
                    </div>

                    {/* Jawaban */}
                    <div className="flex w-full h-56 space-x-5">
                        <button
                            onClick={() => handleAnswer("True")}
                            className="bg-green-600 rounded-xl flex-1 h-full text-4xl font-semibold text-slate-100"
                        >
                            True
                        </button>
                        <button
                            onClick={() => handleAnswer("False")}
                            className="bg-red-600 rounded-xl flex-1 h-full text-4xl font-semibold text-slate-100"
                        >
                            False
                        </button>
                    </div>
                </>
            )}
        </main>
    );
};

export default QuizPage;
