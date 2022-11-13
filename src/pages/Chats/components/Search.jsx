import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../components/firebase";
import { ChatContext } from "../context/ChatContext";
import { AuthContext, useAuth } from "../../../components/contexts/AuthContext";
import { useLocation } from "react-router-dom";

const Search = () => {
  const [host, setHost] = useState(useLocation().state)
  const [username, setUsername] = useState("");
  // console.log(username);
  // const [findUser, setUser] = useState(null);
  // console.log(findUser)
  const [err, setErr] = useState(false);

  const [userlists, setUserLists] = useState({})

  const { user } = useAuth();

  const { dispatch } = useContext(ChatContext);


  // const 
  
 
  const handleSearch = async () => {

    let userl = {}
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      // console.log(querySnapshot.docs)
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data())
        if (host) {
          if(doc.data().uid === host.ID){
            // userl[doc.id] = [doc.data().name, doc.data().photoURL]
            const pengguna = [doc.id, [doc.data().name, doc.data().photoURL]]
            handleSelect(pengguna)
            const temp = new Object()
            temp.uid = pengguna[0]
            temp.displayName = pengguna[1][0]
            temp.name = pengguna[1][0]
            temp.photoURL = pengguna[1][1]
            changeChat(temp)
            window.history.replaceState({}, document.title)
          }
        } else {
          if(doc.data().name.toLowerCase().includes(username.toLowerCase())){
            userl[doc.id] = [doc.data().name, doc.data().photoURL]
          }
        }
        // setUser(findUser[doc.data().uid] = doc.data());
      });

      setUserLists({});
      // console.log(userl)
      // Object.entries(userlists).map((keys) => {
      //   console.log(keys)
      //   // setUser(key)
      // })
      // console.log(findUser)
    } catch (err) {
      setErr(true);
    }    
    setUserLists(userl)
    
    


  

    // Object.entries(userlists).map((pengguna) => {
    //   console.log(pengguna[1])
    //   // setUser(key)
    // })
    
  };

  // Object.entries(userlists).map((keys, values) => {
  //   console.log(keys)
  // })

  const handleKey = (e) => {
    // e.code === "onKeyPress" && handleSearch();
    handleSearch();
  };

  useEffect(() => {
    username.trim() ? handleSearch() : setUserLists({})
  }, [username])

  // search for chat if host exist
  useEffect(() => {
    host && setUsername(host.name)
  }, [])


  const handleSelect = async (pengguna) => {
    //check whether the group(chats in firestore) exists, if not create
    console.log(pengguna)
    const combinedId =
      user.uid > pengguna[0]
        ? user.uid + pengguna[0]
        : pengguna[0] + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      // console.log(combinedId)
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create findUser chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: pengguna[0],
            displayName: pengguna[1][0],
            photoURL: pengguna[1][1],
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", pengguna[0]), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    // setUser(null);
    setUsername("")
    setUserLists({});
  };

  const changeChat = async (u) => {
    // console.log(u)
    await dispatch({ type: "CHANGE_USER", payload: u });
    console.log(u)
  };


  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Enter a name"
          
          onChange={(e) => setUsername(e.target.value)}
          // onKeyDown={handleKey}
          value={username}
        />
      </div>
      {Object.entries(userlists).map((pengguna) => (
        <div id='userChat' className="userChat" onClick={() => {
          handleSelect(pengguna)
          const temp = new Object()
          temp.uid = pengguna[0]
          temp.displayName = pengguna[1][0]
          temp.name = pengguna[1][0]
          temp.photoURL = pengguna[1][1]
          changeChat(temp)
          }}>
          <img src={pengguna[1][1]} alt="" />
          <div className="userChatInfo">
            <span>{pengguna[1][0]}</span>
          </div>
        </div>
      ))}
      {/* {userlists.map((key) => (
        <span>{key}</span>
      ))} */}
    </div>
  );
};

export default Search;