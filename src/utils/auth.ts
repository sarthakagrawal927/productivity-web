export async function sendTokenToServer(token: string | undefined): Promise<void> {
    // Implement your logic to send the token to the Golang server
    // Example using fetch API:
    if (!token) {
      console.error("Missing access token");
      return;
    }
  
    const response = await fetch("http://localhost:8080/validate-jwt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token }), // Include token in request body (optional)
    });
  
    if (!response.ok) {
      console.error("Error sending token:", await response.text());
    } else {
      console.log("Token successfully sent and validated!");
    }
  }