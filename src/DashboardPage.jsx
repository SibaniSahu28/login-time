// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserSession } from "./firebaseService";
// import Popup from "./Popup";

// const DashboardPage = () => {
//   const navigate = useNavigate();
//   const [popupMessage, setPopupMessage] = useState(""); // State for popup message

//   const handleClosePopup = () => {
//     setPopupMessage(""); // Close the popup
//   };

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const email = localStorage.getItem("email");
//         if (!email) {
//           setPopupMessage("Session expired. Please log in again.");
//           navigate("/");
//           return;
//         }

//         // Fetch user session details from Firebase
//         const user = await getUserSession(email);
//         if (user && user.loginTime) {
//           const loginTime = user.loginTime;
//           const currentTime = Date.now();

//           // Check if session has expired
//           if (currentTime - loginTime > 2 * 60 * 1000) {
//             setPopupMessage("Session expired. Please log in again.");
//             localStorage.removeItem("email");
//             navigate("/");
//           }
//         } else {
//           setPopupMessage("User session not found. Please log in again.");
//           localStorage.removeItem("email");
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error checking session:", error);
//         setPopupMessage("An error occurred. Please log in again.");
//         localStorage.removeItem("email");
//         navigate("/");
//       }
//     };

//     checkSession();

//     // Optional: Set a periodic check for session expiration
//     const interval = setInterval(checkSession, 60 * 1000); // Check every minute
//     return () => clearInterval(interval);
//   }, [navigate]);

//   return (
//     <>
//       <h2>Welcome to the Dashboard</h2>
//       {popupMessage && <Popup message={popupMessage} onClose={handleClosePopup} />}
//     </>
//   );
// };

// export default DashboardPage;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSession } from "./firebaseService";
import Popup from "./Popup";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [sessionEndTime, setSessionEndTime] = useState(null); // Store session end time
  const [popupShown, setPopupShown] = useState(false); // Track if popup was shown

  const handleClosePopup = () => {
    setPopupMessage(""); // Close the popup
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          setPopupMessage("Session expired. Please log in again.");
          navigate("/");
          return;
        }

        // Fetch user session details from Firebase
        const user = await getUserSession(email);
        if (user && user.loginTime) {
          const loginTime = user.loginTime;
          const sessionDuration = 5 * 60 * 1000; // Session duration in milliseconds
          const sessionEnd = loginTime + sessionDuration;
          setSessionEndTime(sessionEnd);

          const currentTime = Date.now();
          const remainingTime = sessionEnd - currentTime;

          // Show popup 1 minute before session expires
          if (remainingTime <= 1 * 60 * 1000 && !popupShown) {
            setPopupMessage("Your session will expire in 1 minute. Please save your work.");
            setPopupShown(true); // Prevent multiple popups
          }

          // Log out if session has expired
          if (remainingTime <= 0) {
            setPopupMessage("Session expired. Please log in again.");
            localStorage.removeItem("email");
            navigate("/");
          }
        } else {
          setPopupMessage("User session not found. Please log in again.");
          localStorage.removeItem("email");
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setPopupMessage("An error occurred. Please log in again.");
        localStorage.removeItem("email");
        navigate("/");
      }
    };

    checkSession();

    // Set a periodic check for session expiration
    const interval = setInterval(checkSession, 10 * 1000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [navigate, popupShown]);

  return (
    <>
      <h2>Welcome to the Dashboard</h2>
      {popupMessage && <Popup message={popupMessage} onClose={handleClosePopup} />}
    </>
  );
};

export default DashboardPage;
