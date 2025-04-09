import express from 'express';
import multer from 'multer';
import { analyzeAudio } from '../utils/aiProcessor';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No audio file uploaded');
    
    // In production, use cloud storage
    const audioUrl = await uploadAudioToTempStorage(req.file.buffer);
    
    const analysis = await analyzeAudio(audioUrl);
    logConversation(analysis);
    
    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).send('Analysis failed');
  }
});

async function uploadAudioToTempStorage(buffer: Buffer): Promise<string> {
  // Implement simple file storage (replace with S3 in production)
  const filename = `audio-${uuidv4()}.webm`;
  const fs = require('fs/promises');
  await fs.writeFile(`uploads/${filename}`, buffer);
  return `${process.env.SERVER_URL}/uploads/${filename}`;
}

function logConversation(data: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    transcript: data.transcript,
    analysis: data.analysis,
    aiResponse: data.aiResponse
  };
  
  // Append to log file
  const fs = require('fs');
  fs.appendFileSync('conversations.log', JSON.stringify(logEntry) + '\n');
}

export default router;
