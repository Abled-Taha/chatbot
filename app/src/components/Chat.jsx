import React, {  useState } from "react";
import Header from "./Header";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatVideoEmbedding from "./ChatVideoEmbedding";
import ChatStatusIndicator from "./ChatStatusIndicator";
import Loading from "./Loading";
import { useThread } from "../hooks/useThread";
import { useRunPolling } from "../hooks/useRunPolling";
import { useRunRequiredActionsProcessing } from "../hooks/useRunRequiredActionsProcessing";
import { useRunStatus } from "../hooks/useRunStatus";
import { postMessage } from "../services/api";
import Sidebar from "./sidebar";

const Chat = ({ selectedRole }) => {
  const [run, setRun] = useState(undefined);
  const { threadId, messages,setMessages, setActionMessages, clearThread } = useThread(
    run,
    setRun,
    selectedRole
  );

  useRunPolling(threadId, run, setRun);
  useRunRequiredActionsProcessing(run, setRun, setActionMessages);
  const { status, processing } = useRunStatus(run);

  let messageList = messages
    .toReversed()
    .filter((message) => message.hidden !== true)
    .map((message) => {
      if (message.role === "video_embedding") {
        return <ChatVideoEmbedding url={message.content} key={message.id} />;
      } else {
        return (
          <ChatMessage
            message={message.content}
            role={message.role}
            key={message.id}
            selectedRole={selectedRole}
          />
        );
      }
    });
  return (
    <div className=" h-screen chat-main flex">
      <div style={{ width: "20%" }}>
        <Sidebar onNewChat={clearThread} />
      </div>
      <div
        className="container flex flex-col chat-section"
        style={{ width: "80%" }}
      >
        <Header onNewChat={clearThread} />
        {run ? (
          <>
            <div className="flex flex-col-reverse grow chat-scroll custom-scrollbar">
              {status !== undefined && <ChatStatusIndicator status={status} />}
              {processing && <Loading />}
              {messageList}
            </div>

            <div className="my-4">
              <ChatInput
                onSend={(message) => {
                  postMessage(threadId, message).then(setRun);
                  setMessages([...messages, { content: message, role: "user", created_at: new Date().getTime() / 1000, id: "new" }]);
                }}
                disabled={processing}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col-reverse grow chat-scroll custom-scrollbar justify-center">
              <ChatStatusIndicator status={'Loading'} /> <Loading />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
