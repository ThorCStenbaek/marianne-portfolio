import React, { useState, useEffect } from 'react';
import "./CreateProjectForm.css";
import { Software } from './mini/Software';
import ProjectList from './mini/ProjectList';






function MarianneAuth({isMarianneAuth}) {
  const [password, setPassword] = useState("");
  const [isMarianne, setIsMarianne] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await fetch("/isMarianne", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (data.answer) {
        setIsMarianne(true);
        isMarianneAuth(true)
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="text-red-500">{error}</p>}
      {isMarianne && <p className="text-green-500">You are Marianne!</p>}
    </div>
  );
}



function Delete() {

  const [marianneAuth, isMarianneAuth] =useState(false)


  if (!marianneAuth)
    return(
    <MarianneAuth isMarianneAuth={isMarianneAuth} />)


    return(
        <ProjectList/>
    )
    

    }

    export default Delete