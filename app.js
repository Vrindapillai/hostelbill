function MultiplicationApp() {
  const [table, setTable] = React.useState(2);
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState({});
  const [score, setScore] = React.useState(null);

  // Fetch questions from backend
  const fetchQuestions = async () => {
    const res = await fetch(`http://localhost:3000/api/questions/${table}`);
    const data = await res.json();
    setQuestions(data);
    setAnswers({});
    setScore(null);
  };

  const handleChange = (index,e) => {
    setAnswers({...answers, [index]: e.target.value});
  };

  const checkAnswers = () => {
    let sc = 0;
    questions.forEach((q,i)=>{
      if(parseInt(answers[i]) === q.answer) sc++;
    });
    setScore(sc);
    // Send progress to backend
    fetch("http://localhost:3000/api/progress", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({user:"Student", score:sc})
    });
  };

  return (
    <div className="container">
      <h1>Multiplication Learning App</h1>
      <label>Choose Table (1-12):</label>
      <input type="number" value={table} min="1" max="12" onChange={e=>setTable(e.target.value)} />
      <button onClick={fetchQuestions}>Generate Questions</button>

      {questions.length>0 && (
        <div>
          <h2>Answer the Questions:</h2>
          {questions.map((q,i)=>(
            <div key={i}>
              <span>{q.question} = </span>
              <input type="number" value={answers[i]||""} onChange={(e)=>handleChange(i,e)} />
            </div>
          ))}
          <button onClick={checkAnswers}>Check Answers</button>
        </div>
      )}

      {score!==null && <h2>Your Score: {score} / {questions.length}</h2>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MultiplicationApp />);
