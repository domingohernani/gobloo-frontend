import { Button } from "@/components/ui/button";
import { useReactMediaRecorder } from "react-media-recorder";
import { useEffect, useRef } from "react";

const Recording = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  return (
    <section>
      <p>{status}</p>
      <p>{mediaBlobUrl}</p>
      {status === "stopped" && (
        <div className="h-3/4 w-1/2">
          <video
            src={mediaBlobUrl}
            className="h-full w-full"
            controls
            autoPlay
            loop
          />
        </div>
      )}

      {status === "recording" && (
        <div className="h-3/4 w-1/2 mx-auto">
          <video
            ref={videoRef}
            className="h-full w-full"
            // controls
            autoPlay
            // loop
          />
        </div>
      )}

      <Button variant={"outline"} onClick={startRecording}>
        Start Recording
      </Button>
      <Button variant={"outline"} onClick={stopRecording}>
        Stop Recording
      </Button>
    </section>
  );
};

export default Recording;
