import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const user = "User " + Math.floor(Math.random() * 100);

  useEffect(() => {
    const getData = async () => {
      // VERSIONE REALTIME - ripete la callback ogni volta che la collection cambia
      onSnapshot(collection(db, "messages"), (collection) => {
        const currentMessages = collection.docs.map((doc) => {
          const obj = {
            id: doc.id,
            ...doc.data(),
          };
          return obj;
        });
        setMessages(currentMessages);
      });

      // VERSIONE "STATICA" - legge 1 sola volta i dati
      // const querySnapshot = await getDocs(collection(db, "messages"));
      // console.log(querySnapshot);
      // const currentMessages = querySnapshot.docs.map((doc) => {
      //   const obj = {
      //     id: doc.id,
      //     ...doc.data(),
      //   };
      //   return obj;
      // });
      // console.log(currentMessages);
      // setMessages(currentMessages);
    };
    getData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = { user, text };
    console.log(newMessage);
    addDoc(collection(db, "messages"), newMessage);
    setText("");
  };

  return (
    <div className="App">
      <h1>Learning firebase</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <h4>{message.user}</h4>
            <p>{message.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
