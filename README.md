<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Protected Link Access</title>
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f7f7f7;
      margin: 0;
    }
    .container {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    h1 {
      font-size: 28px;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
      text-align: center;
    }
    p {
      font-size: 16px;
      color: #666;
      text-align: center;
      margin-bottom: 20px;
    }
    input[type="email"], input[type="text"] {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #0056b3;
    }
    .error {
      color: red;
      font-size: 14px;
      text-align: center;
    }
  </style>
</head>
<body>

<div class="container">
  <h1>This link is protected</h1>
  <p>Please enter your email and a code will be sent to your email. Enter the code below.</p>

  <form id="accessForm">
    <input type="email" id="email" placeholder="Enter your email" required />
    <input type="text" id="code" placeholder="Enter verification code" required />
    <button type="submit">Access Link</button>
  </form>

  <div class="error" id="error-message"></div>
</div>

<script>
  // Backend endpoint for verification
  const API_URL = 'https://your-backend-api.com/verify'; // Change this to your backend API

  document.getElementById('accessForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const code = document.getElementById('code').value;
    
    // Reset error message
    document.getElementById('error-message').innerText = '';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to the target link or display a success message
        window.location.href = result.redirectUrl || '/success';
      } else {
        // Display error message from backend
        document.getElementById('error-message').innerText = result.error || 'Something went wrong';
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('error-message').innerText = 'Failed to verify. Please try again later.';
    }
  });
</script>

</body>
</html>
