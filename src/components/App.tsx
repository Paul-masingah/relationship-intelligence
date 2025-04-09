import { useState } from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import { Message } from './types/types';

export default function App() {
  const [conversation, setConversation] = useState<Message[]>([]);

  const handleNewMessage = (message: Message) => {
    setConversation(prev => [...prev, message]);
  };

  return (
    <div className="app-container">
      <h1>Relationship Intelligence</h1>
      <div className="conversation-panel">
        {conversation.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div className="message-header">
              <strong>{msg.role.toUpperCase()}</strong>
              {msg.sentiment && <span className="sentiment">{msg.sentiment}</span>}
            </div>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <VoiceRecorder onNewMessage={handleNewMessage} />
    </div>
  );
}
