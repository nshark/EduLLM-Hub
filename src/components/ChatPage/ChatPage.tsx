import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

interface Message {
  role: string;
  content: string;
}

export default function ChatPage() {
    const id = useParams()['id'];
    var nameOfClass = ""
    //TODO replace witb call to backend
    const listOfDoom = [{ text: "Linear Algebra", id: "2md3m43k" }, { text: "Advanced AI", id: "24kjro5" }]
    listOfDoom.forEach(element => {
        if(element.id == id){
            nameOfClass = element.text;
        }
    });
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'You are a helpful assistant. Only help with ' + nameOfClass},
  ]);
  const [userInput, setUserInput] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(updatedMessages);
    setUserInput('');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: updatedMessages,
      }),
    });

    const data = await response.json();
    const assistantReply = data.choices[0].message.content;

    setMessages([...updatedMessages, { role: 'assistant', content: assistantReply }]);
  };

  return (
    <div style={{ margin: '2rem auto', maxWidth: '600px' }}>
      <h1>ChatGPT</h1>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          minHeight: '300px',
          overflowY: 'auto',
          marginBottom: '1rem',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
