import React, { useState } from "react";
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VoiceControlsProps {
  isListening?: boolean;
  isProcessing?: boolean;
  isSpeaking?: boolean;
  volume?: number;
  onStartListening?: () => void;
  onStopListening?: () => void;
  onVolumeChange?: (value: number[]) => void;
  onMuteToggle?: () => void;
}

const VoiceControls = ({
  isListening = false,
  isProcessing = false,
  isSpeaking = false,
  volume = 75,
  onStartListening = () => {},
  onStopListening = () => {},
  onVolumeChange = () => {},
  onMuteToggle = () => {},
}: VoiceControlsProps) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleMicrophoneToggle = () => {
    if (isListening) {
      onStopListening();
    } else {
      onStartListening();
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    onMuteToggle();
  };

  return (
    <Card className="p-4 bg-background w-full max-w-md mx-auto shadow-md">
      <div className="flex items-center justify-between gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isListening ? "destructive" : "default"}
                size="lg"
                className={`rounded-full w-14 h-14 flex items-center justify-center ${isListening ? "animate-pulse" : ""}`}
                onClick={handleMicrophoneToggle}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : isListening ? (
                  <Mic className="h-6 w-6" />
                ) : (
                  <MicOff className="h-6 w-6" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isListening ? "Stop recording" : "Start recording"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex-1 flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMuteToggle}
                  className="h-10 w-10"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isMuted ? "Unmute" : "Mute"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={100}
            step={1}
            className="flex-1"
            onValueChange={onVolumeChange}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <div className="text-sm text-muted-foreground">
          {isProcessing
            ? "Processing..."
            : isListening
              ? "Listening..."
              : isSpeaking
                ? "Speaking..."
                : "Ready"}
        </div>
      </div>
    </Card>
  );
};

export default VoiceControls;
