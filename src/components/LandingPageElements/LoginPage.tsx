import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
// Mysterious code written by our overlord, CHATGPT
interface GoogleUser {
  name: string;
  email: string;
  // Add any other fields from Google's UserInfo if needed, like `picture`, `sub`, etc.
}

function LoginPage({forceParentUpdate} : {forceParentUpdate:()=>void}) {
  useEffect(() => {
    // Load the Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize Google Sign-In when the script loads
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '',  // Replace with your Client ID
        callback: handleCredentialResponse
      });

      window.google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'large' }  // Customization options
      );
    };

    return () => {
      // Clean-up on component unmount
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response: any) => {
    console.log("Encoded JWT ID token: " + response.credential);
    let decoded : GoogleUser = {name: 'Example User', email: 'bob@gmail.com'};
    try {
      decoded = jwtDecode<GoogleUser>(response.credential);
    }
    catch (error){
      console.log("Jwt decoding failed: " + error)
    }
    // Handle the token, e.g., send it to your server for verification
    window.isLoggedIn=true;
    console.log("User Name: " + decoded.name);
    console.log("User Email:" + decoded.email);
    window.username = decoded.name;
    window.useremail = decoded.email;
    forceParentUpdate();
  };

  return (
    <div>
      <div id="buttonDiv"></div> {/* This is where the button will be rendered */}
    </div>
  );
};

export default LoginPage;
