import { NoteTaker } from "../src";
import { MeetingResult } from "../src/interfaces";

async function main() {
  const client = new NoteTaker({
    name: "My Assistant",
    googleMeetUrl: "https://meet.google.com/hto-hnid-czw",
    language: "id-ID",
    geminiApiKey: "AIzaSyBa67WrZWhG7XFbO3E87bNdizQWDBOcrLo",
    debug: true,
    recordMeeting: true,
    recordingLocation: './out',
    prompt: 'You are an Assistant Note Taker, based on the meeting results in the form of the transcript below, please make a summary of the meeting\n',
    streamConfig: {
      audio: true,
      video: true,
      audioBitsPerSecond: 128000, // 128kbps
      videoBitsPerSecond: 2500000, // 2.5Mbps
      videoConstraints: {
        mandatory: {
          width: { max: 1280 },
          height: { max: 720 },
          frameRate: { max: 15 },
        },
      },
    },
  });

  await client.listen();

  client.on("end", (result: MeetingResult) => {
    console.log("Summary:");
    console.log(result.transribe);
    console.log(result.summary);
  });
}

main();
