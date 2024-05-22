import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      createdAt: new Date(),
      uid,
      displayName,
    });

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-svh">
      <div className="flex-grow overflow-y-hidden  over px-4 py-2">
        {messages.map((message) => (
          <div key={message.id} className="mb-2 bg-gray-300 w-fit px-3 border outline rounded-lg mt-4">
            <strong>{message.displayName}</strong>: {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex justify-between items-center px-4 py-2">
        <input
          className="flex-grow mr-2 border rounded px-2 py-1"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
