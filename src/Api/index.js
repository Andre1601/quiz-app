const API_URL = "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=boolean";

export const fetchQuestions = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results;
};