import React, { useState } from 'react';

function SimpleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [submittedData, setSubmittedData] = useState([]); 

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = { name, email, mobile, address };

  try {
    const response = await fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);
      setSubmittedData([...submittedData, formData]);
      setName('');
      setEmail('');
      setMobile('');
      setAddress('');
    } else {
      const error = await response.json();
      alert(error.error);
    }
  } catch (error) {
    alert('An error occurred while submitting the form.');
  }
};


  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mobile No:</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>


      {submittedData.length > 0 && (
        <div>
          <h3>Submitted Data:</h3>
          <ol>
            {submittedData.map((data, index) => (
              <li key={index}>
                <p>Name: {data.name}</p>
                <p>Email: {data.email}</p>
                <p>Mobile No: {data.mobile}</p>
                <p>Address: {data.address}</p>
                <hr />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default SimpleForm;
