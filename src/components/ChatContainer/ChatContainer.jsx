import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import io from "socket.io-client";
import { time, timeandDate } from "../../services/common";
import {
  getMessages,
  uploadVideo,
  getAllVideos,
} from "../../services/serviceCalls";

const socket = io.connect("http://localhost:8080");

const ChatContainer = () => {
  const [msgs, setMsgs] = useState([]);
  const [sentMsg, setSentMsg] = useState([]);
  const [message, setMessage] = useState("");
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [alertMessage, setAlertmessage] = useState(null);
  const [userMessages, setUserMessages] = useState([]);
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const sendMessage = () => {
    if (message) {
      setSentMsg((prev) => [...prev, message]);
      socket.emit("join", {
        user: userDetails?.email,
        message: message,
        timeStamp: time(),
      });
    }
  };
  const handleUpload = async () => {
    setAlertmessage(null);
    const resp = await uploadVideo(video, userDetails?.email);
    if (resp.status) {
      setAlertmessage(resp?.message);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    const listener = (data) => {
      setMessage("");
      setMsgs((prev) => [...prev, data]);
    };
    socket.on("new_msg", listener);
    return () => {
      socket.off("new_msg", listener);
    };
  });

  useEffect(() => {
    getMessages(userDetails?.email).then((resp) => {
      resp.status && setUserMessages(resp?.messages);
    });
    getAllVideos(userDetails?.email).then((resp) => {
      if (resp.status) {
        setVideos(resp?.videos);
        setSelectedVideo(resp?.videos[0]?.name);
      }
    });
  }, [sentMsg, alertMessage]);
  return (
    <div className="border-1 border-success">
      <Card className="text-center">
        <Card.Header>
          Welcome <b>{userDetails?.name}</b>
        </Card.Header>
        <Card.Body>
          <Card.Title>Start your chat</Card.Title>
          <Card.Text className={"h-50"}>
            {msgs?.map((data, ind) => {
              return (
                <>
                  <p className="text-capitalize" key={ind}>
                    {data?.msg}
                  </p>
                </>
              );
            })}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <input
            type="text"
            value={message ?? ""}
            onChange={(e) => {
              setMessage(e?.target?.value);
            }}
            placeholder="Enter your message"
          />
          <button onClick={sendMessage}>Send </button>
        </Card.Footer>
      </Card>
      <div className="d-flex p-2">
        <Card className="w-50 mx-2">
          <Card.Header>
            <b>{userDetails?.name},</b>Your Previous chats
          </Card.Header>
          <Card.Body>
            {userMessages?.map((data, ind) => {
              return (
                <div className="text-left" key={ind}>
                  <p className="text-capitalize">
                    {data?.message}{" "}
                    <span className="text-secondary">
                      {timeandDate(Number(data?.timeStamp))}
                    </span>
                  </p>
                </div>
              );
            })}
          </Card.Body>
        </Card>
        <Card className={"w-50"}>
          <Card.Header>Video From Server</Card.Header>
          <Card.Body>
            {
              <VideoPlayer
                videos={videos}
                selectedVideo={selectedVideo}
                setSelectedVideo={setSelectedVideo}
              />
            }
          </Card.Body>
          <Card.Footer className="text-muted border">
            <div
              className={`alert alert-success ${
                alertMessage ? "d-block" : "d-none"
              }`}
              role="alert"
            >
              {alertMessage}
            </div>
            <input
              type="file"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setVideo(e.target.files[0]);
              }}
              placeholder="Enter your message"
            />
            <button onClick={video && handleUpload}>Upload</button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

const VideoPlayer = ({ selectedVideo, videos, setSelectedVideo }) => {
  console.log("selected", selectedVideo);
  let videoUrl = `http://localhost:8080/video/${selectedVideo}`;
  return (
    <>
      <div className="d-flex flex-wrap">
        {videos?.map((data) => {
          return (
            data?.name && (
              <p
                className="btn text-primary"
                id={data?.id}
                onClick={() => {
                  setSelectedVideo(data?.name);
                }}
              >
                {data?.name}
                <span className="text-secondary">
                  {timeandDate(Number(data?.timeStamp))}
                </span>
              </p>
            )
          );
        })}
      </div>
      {selectedVideo && (
        <video width="320" height="240" controls muted autoPlay={false}>
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
};

export default ChatContainer;
