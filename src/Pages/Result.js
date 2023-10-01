import React from "react";
import { useLocation } from 'react-router-dom';

function ResultPage() {

    const location = useLocation(); 
    const results = location.state?.results;

    return (
        <main className="flex h-screen justify-center items-center">
            <div className="space-y-12 bg-zinc-700 rounded-2xl w-[900px] h-[555px] p-10 text-center">
                <h1 className="text-center text-[48px] text-slate-200 font-bold">HASIL</h1>
                <div className="flex space-x-10">
                    <div className="flex-1 bg-red-500 rounded-2xl h-32 p-2">
                        <h2 className="text-xl">Jawaban Salah</h2>
                        <p className="text-4xl font-bold mt-3">{results?.incorrect}</p>
                    </div>
                    <div className="flex-1 bg-green-500 rounded-2xl h-32 p-2">
                        <h2 className="text-xl">Jawaban Benar</h2>
                        <p className="text-4xl font-bold mt-3">{results?.correct}</p>
                    </div>
                </div>
                <div className="bg-amber-300 h-32 rounded-2xl p-2 w-96 mx-auto">
                    <h2 className="text-xl">Soal yang dikerjakan</h2>
                    <p className="text-4xl font-bold mt-3">{results?.answered}/{results?.correct + results?.incorrect}</p>
                </div>
            </div>
        </main>
    );
}

export default ResultPage;
