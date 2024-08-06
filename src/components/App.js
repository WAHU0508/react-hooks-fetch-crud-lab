import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, [])

  function addQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }
  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setQuestions(questions.filter(question => question.id !== id))
    })
    .catch(error => {
      console.error(`Error Message: ${error}`)
    })
  }
  function updateQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ correctIndex })
    })
    .then(res => res.json())
    .then(updatedQuestion => {
      setQuestions(questions.map(question => question.id === id ? updatedQuestion : question))
    })
    .catch(error => console.error(`Erroe updating: ${error}`))
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={addQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={deleteQuestion} onUpdateQuestion={updateQuestion}/>}
    </main>
  );
}

export default App;
