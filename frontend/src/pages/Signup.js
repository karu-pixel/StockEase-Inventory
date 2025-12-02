import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import hook for redirection

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  
  // New states for handling feedback
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // ALIGNMENT FIX: 
    // Backend expects: 'username'
    // Frontend has: 'name'
    // We map name -> username here.
    const userData = {
      username: name, 
      email: email,
      password: password,
    };

    try {
      // FIX: Changed port 3001 to 5000 to match your Node.js server
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success!
        setSuccess("Account created successfully! Redirecting to login...");
        
        // Clear form
        setName("");
        setEmail("");
        setMobile("");
        setPassword("");

        // Redirect to Login page after 2 seconds
        setTimeout(() => {
          navigate("/"); 
        }, 2000);
      } else {
        // Handle backend errors (e.g., "User already exists")
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("Could not connect to server. Is the backend running on port 5000?");
    } finally {
      setLoading(false);
    }
  };

  // --- Styles Object ---
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f0f2f5",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    wrapper: {
      display: "flex",
      width: "100%",
      maxWidth: "900px",
      background: "#fff",
      borderRadius: "20px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
    leftPanel: {
      flex: 1,
      background: "#4F46E5",
      color: "white",
      padding: "50px 40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    leftTitle: {
      fontSize: "36px",
      fontWeight: "700",
      marginBottom: "15px",
    },
    leftSubtitle: {
      fontSize: "18px",
      opacity: 0.9,
      lineHeight: 1.6,
    },
    formContainer: {
      flex: 1,
      padding: "50px 40px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "600",
      textAlign: "center",
      marginBottom: "30px",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    inputGroup: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "12px 15px",
      background: "#f9f9f9",
    },
    icon: {
      marginRight: "10px",
      fontSize: "18px",
      opacity: 0.7,
    },
    input: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: "15px",
      background: "transparent",
    },
    button: {
      marginTop: "10px",
      padding: "14px",
      background: "#4F46E5",
      color: "white",
      fontSize: "16px",
      fontWeight: "500",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "0.2s",
      opacity: loading ? 0.7 : 1, 
    },
    loginText: {
      marginTop: "20px",
      textAlign: "center",
      color: "#555",
      fontSize: "14px",
    },
    link: {
      color: "#4F46E5",
      textDecoration: "none",
      fontWeight: "500",
    },
    messageBox: { 
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "15px",
      textAlign: "center",
      fontSize: "14px",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <h1 style={styles.leftTitle}>Create Your Account</h1>
          <p style={styles.leftSubtitle}>
            Join StockEase and manage your inventory with ease, clarity, and speed.
          </p>
        </div>

        {/* Right Panel */}
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Sign Up</h2>

          {/* Success Message */}
          {success && (
            <div style={{...styles.messageBox, backgroundColor: "#d4edda", color: "#155724"}}>
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={{...styles.messageBox, backgroundColor: "#f8d7da", color: "#721c24"}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Full Name */}
            <div style={styles.inputGroup}>
              <span style={styles.icon}>👤</span>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            {/* Email */}
            <div style={styles.inputGroup}>
              <span style={styles.icon}>📧</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            {/* Password */}
            <div style={styles.inputGroup}>
              <span style={styles.icon}>🔒</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p style={styles.loginText}>
            Already have an account?{" "}
            <a href="/" style={styles.link}>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;