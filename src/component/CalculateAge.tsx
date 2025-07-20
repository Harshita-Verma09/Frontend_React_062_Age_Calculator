import React, { useState, type ChangeEvent } from 'react';

type Age = {
  years: number;
  months: number;
  days: number;
} | null;


const CalculateAge: React.FC = () => {
  const [dob, setDob] = useState<string>('');
  const [age, setAge] = useState<Age>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDob(value);
    const result = calculateAge(value);
    setAge(result);
  };

  const calculateAge = (dob: string): Age => {
    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  return (
    <div
      style={{
        backgroundColor: '#121212',
        color: '#e0e0e0',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#1e1e1e',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 0 15px rgba(0,0,0,0.4)',
          width: '90%',
          maxWidth: '400px',
          textAlign: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <h2 style={{ color: '#90caf9', marginBottom: '20px' }}>🗓️ Age Calculator</h2>

        <input
          type="date"
          value={dob}
          onChange={handleChange}
          style={{
            padding: '10px',
            backgroundColor: '#2c2c2c',
            color: '#ffffff',
            border: '1px solid #555',
            borderRadius: '5px',
            outline: 'none',
            width: '100%',
            marginBottom: '20px',
          }}
        />

        {age && (
          <div style={{ color: '#a5d6a7' }}>
            <h3>
              You are {age.years} year(s), {age.months} month(s), and {age.days} day(s) old.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculateAge;
