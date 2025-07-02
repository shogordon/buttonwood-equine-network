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
  const [timeRemaining, setTimeRemaining] = useState(30);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onTranscript]);

  const startRecording = () => {
    if (!recognitionRef.current || disabled) return;
    
    try {
      recognitionRef.current.start();
      setTimeRemaining(30);
      
      // Start countdown timer
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            stopRecording();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Auto-restart recording every 30 seconds to prevent timeout
      timeoutRef.current = setTimeout(() => {
        if (isRecording) {
          recognitionRef.current.stop();
          setTimeout(() => startRecording(), 100);
        }
      }, 29000);
      
      toast.success('Listening... Speak now!');
    } catch (error) {
      console.error('Error starting recognition:', error);
      toast.error('Could not start voice input');
    }
  };

  const stopRecording = () => {
    if (!recognitionRef.current) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    recognitionRef.current.stop();
    setIsRecording(false);
    setTimeRemaining(30);
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <div className="flex flex-col items-center gap-2">
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
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse" />
              <Square className="h-4 w-4" />
              <span>Stop ({timeRemaining}s)</span>
            </div>
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 mr-2" />
            Voice Input
          </>
        )}
      </Button>
      {isRecording && (
        <div className="text-xs text-white/60">
          Recording... {timeRemaining}s remaining
        </div>
      )}
    </div>
  );
};

// Add types for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}