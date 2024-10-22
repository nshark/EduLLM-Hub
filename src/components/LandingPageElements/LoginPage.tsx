import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    // Load the Google Identity Services script dynamically
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      /* global google */
      window.google.accounts.id.initialize({
        client_id: '1054276165051-cssopgikuc14vhqf0siotkg3pjsgsnkk.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.prompt(); // Display the One Tap prompt
    };
    document.body.appendChild(script);

    return () => {
      // Remove the script from the document on cleanup
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response: any) => {
    // Handle the response
    console.log('Encoded JWT ID token: ' + response.credential);
  };

  function handleLoginCallback(response: any) {
    // Handle the response
    console.log('Encoded JWT ID token: ' + response.credential);
  };
  return (
    <>
    <div id="g_id_onload"
     data-client_id="590183432119-spqbpnqnnnd18sts704if0hav5q5pl6f.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback={handleLoginCallback}
     data-itp_support="true">
</div>

<div className="g_id_signin"
     data-type="standard"
     data-shape="pill"
     data-theme="filled_black"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left">
</div>
</>
  );
};
