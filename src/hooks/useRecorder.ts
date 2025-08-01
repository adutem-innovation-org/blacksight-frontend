import { useRef, useState } from "react";
import { useStore } from "./useStore";

export const useRecorder = () => {
  const { dispatch, getState } = useStore();
  const [recording, setRecording] = useState(false);
  const [isRecorderOpen, setIsRecordOpen] = useState(false);
  const wasCancelledRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const { agentData } = getState("Agent");

  const launchRecorder = () => {
    setIsRecordOpen(true);
  };

  const startRecording = async () => {
    wasCancelledRef.current = false;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.fftSize = 512;

    drawBarWaveform();

    const mimeType = "audio/webm;codecs=opus";
    const isSupported = MediaRecorder.isTypeSupported(mimeType);

    const recorder = isSupported
      ? new MediaRecorder(stream, { mimeType })
      : new MediaRecorder(stream); // fallback to browser default

    audioChunksRef.current = [];

    recorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      if (wasCancelledRef.current) {
        audioChunksRef.current = []; // Just to be sure;
        return;
      }

      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const formData = new FormData();
      formData.append("speech-file", audioBlob, "voice.webm");
      formData.append("botId", agentData?._id!);

      // dispatch(speechToText(formData));
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setRecording(true);
  };

  const endRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    setRecording(false);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    analyserRef.current?.disconnect();
    sourceRef.current?.disconnect();
    audioContextRef.current?.close();
  };

  const cancelRecording = () => {
    wasCancelledRef.current = true;
    audioChunksRef.current = []; // Clear the chunks

    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop(); // Still need to stop to release stream
    }

    setRecording(false);
    setIsRecordOpen(false);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    analyserRef.current?.disconnect();
    sourceRef.current?.disconnect();
    audioContextRef.current?.close();
  };

  const drawBarWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyserRef.current!.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = 2;
      const gap = 1;
      const barCount = Math.floor(canvas.width / (barWidth + gap));
      const step = Math.floor(bufferLength / barCount);

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i * step];
        const barHeight = (value / 255) * canvas.height;
        const x = i * (barWidth + gap);
        // const y = canvas.height - barHeight;
        const y = canvas.height / 2 - barHeight / 2;

        ctx.fillStyle = "#ffffff"; // or any desired bar color
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animationRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  return {
    recording,
    isRecorderOpen,
    canvasRef,
    mediaRecorderRef,
    analyserRef,
    animationRef,
    audioChunksRef,
    audioContextRef,
    sourceRef,
    setRecording,
    setIsRecordOpen,
    wasCancelledRef,
    startRecording,
    endRecording,
    cancelRecording,
    launchRecorder,
  };
};
