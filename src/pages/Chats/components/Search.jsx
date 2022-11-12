import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../components/firebase";
import { ChatContext } from "../context/ChatContext";
import { useAuth } from "../../../components/contexts/AuthContext";
const Search = () => {
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
        if(doc.data().name.toLowerCase().includes(username.toLowerCase())){

          userl[doc.id] = [doc.data().name, doc.data().photoURL]
        }
        
        // setUser(findUser[doc.data().uid] = doc.data());
      });
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

  const handleSelect = async (pengguna) => {
    //check whether the group(chats in firestore) exists, if not create
    // console.log(pengguna)
    const combinedId =
      user.uid > pengguna[0]
        ? user.uid + pengguna[0]
        : pengguna[0] + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(combinedId)
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
    dispatch({ type: "CHANGE_USER", payload: pengguna });
    // setUser(null);
    setUsername("")

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
      {err && <span>User not found!</span>}
      {Object.entries(userlists).map((pengguna) => (
        <div className="userChat" onClick={() => handleSelect(pengguna)}>
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