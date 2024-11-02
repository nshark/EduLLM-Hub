import { useEffect } from 'react';
// Mysterious code written by our overlord, CHATGPT

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
    // Handle the token, e.g., send it to your server for verification
    window.isLoggedIn=true;
    forceParentUpdate();
  };

  return (
    <div>
      <div id="buttonDiv"></div> {/* This is where the button will be rendered */}
    </div>
  );
};

export default LoginPage;
