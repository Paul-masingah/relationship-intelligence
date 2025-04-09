import { useState, useEffect } from 'react';
import { Message, SentimentAnalysis } from '../types/types';
import { FiMic, FiStopCircle } from 'react-icons/fi';
import axios from 'axios';

interface Props {
  onNewMessage: (message: Message) => void;
}

export default function VoiceRecorder({ onNewMessage }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);
        });
    }
  }, []);

  const startRecording = () => {
    if (!mediaRecorder) return;

    const audioChunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
    
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      try {
        const response = await axios.post('/api/analyze', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        const { transcript, analysis, aiResponse } = response.data;
        
        onNewMessage({
          role: 'user',
          content: transcript,
          timestamp: new Date(),
          sentiment: analysis.sentiment
        });

        onNewMessage({
          role: 'ai',
          content: aiResponse,
          timestamp: new Date()
        });

      } catch (error) {
        console.error('Analysis error:', error);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  return (
    <div className="recorder-container">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`record-button ${isRecording ? 'recording' : ''}`}
      >
        {isRecording ? <FiStopCircle /> : <FiMic />}
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}
