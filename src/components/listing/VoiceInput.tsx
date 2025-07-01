import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Square } from 'lucide-react';
import { toast } from 'sonner';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  className?: string;
}

export const VoiceInput = ({ onTranscript, disabled, className }: VoiceInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for Web Speech API support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsRecording(true);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          onTranscript(finalTranscript);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        if (event.error === 'not-allowed') {
          toast.error('Microphone access denied. Please enable microphone permissions.');
        } else if (event.error === 'no-speech') {
          toast.error('No speech detected. Please try again.');
        } else {
          toast.error('Voice input error. Please try again.');
        }
      };
      
      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript]);

  const startRecording = () => {
    if (!recognitionRef.current || disabled) return;
    
    try {
      recognitionRef.current.start();
      toast.success('Listening... Speak now!');
    } catch (error) {
      console.error('Error starting recognition:', error);
      toast.error('Could not start voice input');
    }
  };

  const stopRecording = () => {
    if (!recognitionRef.current) return;
    
    recognitionRef.current.stop();
    setIsRecording(false);
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={isRecording ? stopRecording : startRecording}
      disabled={disabled}
      className={`${className} ${
        isRecording 
          ? 'bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30' 
          : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
      }`}
    >
      {isRecording ? (
        <>
          <Square className="h-4 w-4 mr-2" />
          Stop Recording
        </>
      ) : (
        <>
          <Mic className="h-4 w-4 mr-2" />
          Voice Input
        </>
      )}
    </Button>
  );
};

// Add types for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}