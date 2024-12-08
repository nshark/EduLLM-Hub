import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
// Mysterious code written by our overlord, CHATGPT
interface GoogleUser {
  name: string;
  email: string;
  // Add any other fields from Google's UserInfo if needed, like `picture`, `sub`, etc.
}
function getPersistedState<T>(key:string, defaultValue: T) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error('Error parsing localStorage value:', error);
    return defaultValue;
  }
}
//TODO move this to a new seperate file for weird functions
export function usePersistedState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  if (typeof window === 'undefined') {
    throw new Error('usePersistedState must be used within a client-side component');
  }
  let state, setState = null;
  try{
    [state, setState] = useState<T>(getPersistedState(key, defaultValue));
  }
  catch(error){
    console.log(error);
    [state, setState] = useState<T>(defaultValue);
  }
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error('Error setting localStorage value:', error);
    }
  }, [key, state]);

  return [state, setState];
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
        client_id: '1054276165051-cssopgikuc14vhqf0siotkg3pjsgsnkk.apps.googleusercontent.com',  // Replace with your Client ID
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
    window.setLoggedIn(true);
    console.log("User Name: " + decoded.name);
    console.log("User Email:" + decoded.email);
    window.setUserName(decoded.name);
    window.setUserEmail(decoded.email);
    forceParentUpdate();
  };

  return (
    <div id="buttonDiv"></div>
  );
};

export default LoginPage;
