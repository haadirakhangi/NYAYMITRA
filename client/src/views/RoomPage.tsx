import React, { useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

interface RoomParams {
  roomId: string;
}

const RoomPage: React.FC = () => {
  // const { roomId } = useParams<RoomParams>();
  const meetingRef = useRef<HTMLDivElement>(null);
  const roomId ="24567";
  useEffect(() => {
    const myMeeting = async() => {
      const appID = 1845851736;
      const serverSecret = "bcb9b6f0593f862350b06b36c554d9e1";
      
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        "Mihir Panchal"
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      if (meetingRef.current) {
        zc.joinRoom({
          container: meetingRef.current,
          sharedLinks:[
            {
              name: 'Copy Link',
              url: `http://localhost:5173/room/${roomId}`,
            }
          ],
          scenario:{
            mode: ZegoUIKitPrebuilt.OneONoneCall
          },
          showScreenSharingButton: true,
        });
      }
    };
    myMeeting();
  }, [roomId]);

  return (
    <div>
      <div ref={meetingRef}/>
    </div>
  );
};

export default RoomPage;
