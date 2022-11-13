import React, { useContext, useEffect, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../components/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../../../components/contexts/AuthContext";
import { zhCN } from "date-fns/locale";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { user } = useAuth();
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    // if(img)
    // {if ( text.length === 0 ) {
    //   const storageRef = ref(storage, uuid());

    //   const uploadTask = uploadBytesResumable(storageRef, img);

    //   uploadTask.on(
    //     (error) => {
    //       //TODO:Handle Error
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //         await updateDoc(doc(db, "chats", data.chatId), {
    //           messages: arrayUnion({
    //             id: uuid(),
    //             senderId: user.uid,
    //             date: Timestamp.now(),
    //             img: downloadURL,
    //           }),
    //         });
    //         setImg(downloadURL);
    //         console.log("PICTURE AFTER ASSIGNED" + toString(img));

    //       });
    //     }
    //   );
    //   await updateDoc(doc(db, "userChats", user.uid), {
    //     [data.chatId + ".lastMessage"]: {
    //       text,
    //       img
          
    //     },
    //     [data.chatId + ".date"]: serverTimestamp(),
    //   });
  
    //   await updateDoc(doc(db, "userChats", data.user.uid), {
    //     [data.chatId + ".lastMessage"]: {
    //       text,
    //       img
    //     },
    //     [data.chatId + ".date"]: serverTimestamp(),
    //   });
    // }
    // }else{
    //   const storageRef = ref(storage, uuid());

    //   const uploadTask = uploadBytesResumable(storageRef, img);

    //   uploadTask.on(
    //     (error) => {
    //       //TODO:Handle Error
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //         await updateDoc(doc(db, "chats", data.chatId), {
    //           messages: arrayUnion({
    //             id: uuid(),
    //             text,
    //             senderId: user.uid,
    //             date: Timestamp.now(),
    //             img: downloadURL,
    //           }),
    //         });
    //         setImg(downloadURL);
    //         console.log("PICTURE AFTER ASSIGNED" + toString(img));

    //       });
    //     }
    //   );
    //   await updateDoc(doc(db, "userChats", user.uid), {
    //     [data.chatId + ".lastMessage"]: {
    //       text,
    //       img
    //     },
    //     [data.chatId + ".date"]: serverTimestamp(),
    //   });
  
    //   await updateDoc(doc(db, "userChats", data.user.uid), {
    //     [data.chatId + ".lastMessage"]: {
    //       text,
    //       img
    //     },
    //     [data.chatId + ".date"]: serverTimestamp(),
    //   });
    // }
    
    // }
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
          img
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
          img
          },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    


    setText("");
    setImg(null);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  useEffect(() =>  {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                senderId: user.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
            setImg(downloadURL);
            await updateDoc(doc(db, "userChats", user.uid), {
              [data.chatId + ".lastMessage"]: {
                text: 'you sent a picture',
                img: null
              },
              [data.chatId + ".date"]: serverTimestamp(),
            });
        
            await updateDoc(doc(db, "userChats", data.user.uid), {
              [data.chatId + ".lastMessage"]: {
                text: 'sent you a picture',
                img: null
              },
              [data.chatId + ".date"]: serverTimestamp(),
            });
          });
        }
      );
    }
    setText("");
    setImg(null);
  }, [img])
  // console.log(data.user.uid)
  // updateDoc(doc(db, "userChats", user.uid), {
  //       [data.chatId + ".lastMessage"]: {
  //         text,
  //         img
  //       },
  //       [data.chatId + ".date"]: serverTimestamp(),
  //     });
  
  //     updateDoc(doc(db, "userChats", data.user.uid), {
  //       [data.chatId + ".lastMessage"]: {
  //         text,
  //         img
  //       },
  //       [data.chatId + ".date"]: serverTimestamp(),
  //     });

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        // onKeyDown={ text.trim() !== "" && handleKey}
        onKeyDown={ text.trim() !== "" ? handleKey : undefined}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {/* <input
          type ="image"
          id="file"
          alt="submit"
          onChange={(e) => setImg(e.target.files[0])}
        /> */}
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={ text.trim() !== "" ? handleSend : undefined}>Send</button>
      </div>
    </div>
  );
};

export default Input;