import React, { useState } from 'react';

function MyForm() {
  const [mood, setMood] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  const handleSubmit = () => {
    let formResponses = {
      mood: mood,
      additionalInfo: additionalInfo
    };
    localStorage.setItem("formResponses", JSON.stringify(formResponses));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Mood:
        {/* Assuming mood is a radio input */}
        <input name="mood" type="radio" value="happy" onChange={e => setMood(e.target.value)} />
        <input name="mood" type="radio" value="sad" onChange={e => setMood(e.target.value)} />
      </label>
      <label>
        Additional Info:
        <input name="additionalInfo" value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default MyForm;