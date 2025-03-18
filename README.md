<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #271b0c; /* Brown color for text and buttons */
      --primary-hover: #b02125; /* Hover color for buttons */
      --background: #f2f2f2; /* Light grey background */
      --card-bg: #ffffff; /* White background for the form */
      --text: #333333; /* Dark text color */
      --border-radius: 12px; /* Rounded corners */
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Montserrat', sans-serif;
      background: var(--background);
      color: var(--text);
      padding: 20px;
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .verification-container {
      width: 100%;
      max-width: 500px;
      background: var(--card-bg);
      padding: 30px;
      border-radius: var(--border-radius);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin-bottom: 10px;
      color: var(--primary); /* Brown text */
      text-align: center;
      font-size: 24px;
      font-weight: 800; /* Montserrat Black */
    }

    h3 {
      color: var(--primary);
      font-size: 13px;
      text-align: center;
      margin-bottom: 30px;
      font-weight: 600; /* Montserrat Semi-Bold */
    }

    .input-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }

    input[type="email"], input[type="text"] {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-family: inherit;
      margin-bottom: 15px;
    }

    button {
      display: block;
      width: 100%;
      padding: 12px 20px;
      background-color: var(--primary);
      color: #fff;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      font-family: inherit;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
    }

    button:hover {
      background-color: var(--primary-hover);
    }

    .result {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
      display: none;
    }

    .result.active {
      display: block;
    }

    .result-value {
      font-size: 24px;
      font-weight: 600;
      color: var(--primary);
      margin: 10px 0;
    }

    @media (max-width: 600px) {
      .verification-container {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="verification-container">
    <h2>This link is protected</h2>
    <h3>Please enter your email below to get a log-in code</h3>

    <div class="input-group">
      <label for="email">Enter your email</label>
      <input type="email" id="email" placeholder="Enter your email" />
    </div>

    <button id="sendCodeBtn">Send Code</button>

    <div class="input-group" id="codeInputGroup" style="display: none;">
      <label for="code">Enter verification code</label>
      <input type="text" id="code" placeholder="Enter the code sent to your email" />
    </div>

    <button id="verifyCodeBtn" style="display: none;">Verify Code</button>

    <div class="result" id="resultContainer">
      <p>Verification successful!</p>
    </div>
  </div>

  <script>
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    const emailInput = document.getElementById('email');
    const codeInput = document.getElementById('code');
    const codeInputGroup = document.getElementById('codeInputGroup');
    const resultContainer = document.getElementById('resultContainer');

    sendCodeBtn.addEventListener('click', function() {
      const email = emailInput.value;
      if (email) {
        // Make an API call to your backend to send the code
        fetch('http://localhost:3000/send-verification-email', { // Replace with your backend URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Verification code sent to ' + email); // Simulate sending the code
            codeInputGroup.style.display = 'block';
            verifyCodeBtn.style.display = 'block';
          } else {
            alert('Email not whitelisted or error.');
          }
        })
        .catch(error => {
          alert('There was an error sending the verification code. Please try again later.');
        });
      } else {
        alert('Please enter a valid email.');
      }
    });

    verifyCodeBtn.addEventListener('click', function() {
      const code = codeInput.value;
      if (code) {
        // Verify the code with backend API
        fetch('http://localhost:3000/verify-code', { // Replace with your backend URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            resultContainer.style.display = 'block';
          } else {
            alert('Invalid verification code. Please try again.');
          }
        })
        .catch(error => {
          alert('There was an error verifying the code. Please try again later.');
        });
      } else {
        alert('Please enter the verification code.');
      }
    });
  </script>
</body>
</html>
