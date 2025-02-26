"use client";
import { useState } from "react";
import { Star, PlusCircle, X, MoreVertical } from "lucide-react";
import Sidebar from "../components/Farmer-Sidebar";
import { MdOutlineReport } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

interface Message {
  id: number;
  sender: string;
  username: string;
  text: string;
  time: string;
  starred: boolean;
  reported: boolean;
  deleted: boolean;
  replies: { sender: string; text: string; time: string }[];
  profilePic: string;
  email: string;
  bio: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "Alice",
    username: "Alce0332",
    text: "Hey, how's it going?",
    time: "2:45",
    starred: false,
    reported: false,
    deleted: false,
    replies: [],
    profilePic: "/picturesForInbox/pic1.jpg",
    email: "",
    bio: "I am a farmer who is interested in purchasing potatoes from your farm.",
  },
  {
    id: 2,
    sender: "Bob",
    username: "myNameosUnkonw23233",
    text: "Did you check out the new project updates?",
    time: "1:30",
    starred: false,
    reported: false,
    deleted: false,
    replies: [],
    profilePic: "/picturesForInbox/pic2.jpg",
    email: "",
    bio: "I am a farmer who is interested in purchasing potatoes from your farm.",
  },
  {
    id: 3,
    sender: "Manny",
    username: "mantHeKins002",
    text: "Do you guys accept collection, i would like to personally collect the products I bought, rather than having them be delivered.",
    time: "12:25",
    starred: false,
    reported: false,
    deleted: false,
    replies: [],
    profilePic: "/picturesForInbox/pic8.jpg",
    email: "",
    bio: "I am a farmer who is interested in purchasing potatoes from your farm.",
  },
  {
    id: 4,
    sender: "Aron",
    username: "AronRogers123",
    text: "Hey, how's it going?",
    time: "11:03",
    starred: false,
    reported: false,
    deleted: false,
    replies: [],
    profilePic: "/picturesForInbox/pic4.jpg",
    email: "",
    bio: "I am a farmer who is interested in purchasing potatoes from your farm.",
  },
  {
    id: 5,
    sender: "Jack",
    username: "steveG0",
    text: "Hey, do you have potatoes available at the farm? I would like to purchase some, but I don't see them listed on the page.",
    time: "20:45",
    starred: false,
    reported: false,
    deleted: false,
    replies: [],
    profilePic: "/picturesForInbox/pic5.jpg", // Corrected path
    email: "",
    bio: "I am a farmer who is interested in purchasing potatoes from your farm.",
  },
];

export default function MessagingPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<
    (typeof initialMessages)[0] | null
  >(null);
  const [filter, setFilter] = useState("all");
  const [isComposing, setIsComposing] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [reply, setReply] = useState("");

  function toggleMessageProperty(
    id: number,
    property: keyof (typeof initialMessages)[0]
  ) {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, [property]: !msg[property] } : msg
      )
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && recipient.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        username: "yourUsername",
        text: newMessage,
        time: new Date().toLocaleTimeString(),
        starred: false,
        reported: false,
        deleted: false,
        replies: [],
        profilePic: "/picturesForInbox/pic1.jpg",
        email: "", // Added email field
        bio: "", // Added bio field
      };
      setMessages([newMsg, ...messages]);
      setNewMessage("");
      setRecipient("");
      setIsComposing(false);
    }
  };

  const handleReplyMessage = () => {
    if (reply.trim() !== "" && selectedMessage) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === selectedMessage.id
            ? {
                ...msg,
                replies: [
                  ...(msg.replies || []),
                  {
                    sender: "You",
                    text: reply,
                    time: new Date().toLocaleTimeString(),
                  },
                ],
              }
            : msg
        )
      );
      setReply("");
    }
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = messages.filter((message) => {
    if (filter === "starred") return message.starred;
    if (filter === "reported") return message.reported;
    if (filter === "deleted") return message.deleted;
    return true;
  });
  const filterOptions = ["all", "starred", "reported", "deleted"];
  // Apply search AFTER filtering
  const displayedMessages = filteredMessages.filter((message) =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      {/* Main Screen */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        <div className="w-1/4 bg-white border-r p-4">
          {/* Title & Compose */}
          <div className="flex items-center justify-between m-5 ml-2">
            <h2 className="text-2xl font-semibold">Inbox</h2>
            <button
              className="text-customDarkText px-4 py-2 rounded-md flex items-center gap-2 bg-gray-200"
              onClick={() => setIsComposing(true)}
            >
              <PlusCircle size={16} /> New Chat
            </button>
          </div>

          {/* Compose Message Box (Modal) */}
          {isComposing && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">New Message</h3>
                  <button onClick={() => setIsComposing(false)}>
                    <X size={20} />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Recipient"
                  className="w-full p-2 border rounded mb-3"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />

                <textarea
                  placeholder="Write your message..."
                  className="w-full p-2 border rounded mb-3"
                  rows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setIsComposing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="ml-2 mt-1">
            <input
              type="text"
              placeholder="Search by sender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 bg-gray-200 rounded-xl mb-4 text-customDarkText"
            />
          </div>

          {/* filters */}
          <div className="flex space-x-2 ml-3 mb-4">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 rounded-3xl ${
                  filter === option
                    ? "bg-customLightGreen text-white"
                    : "bg-gray-200 text-black"
                } transition duration-200`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>

          {/* Messages List */}
          <ul>
            {displayedMessages.map((message) => (
              <li
                key={message.id}
                className="p-3 border-b cursor-pointer hover:bg-gray-100 flex items-center gap-3"
                onClick={() => setSelectedMessage(message)}
              >
                {/* Profile Picture */}
                <img
                  src={message.profilePic}
                  alt={`${message.sender}'s profile`}
                  className="w-10 h-10 rounded-full object-cover "
                />

                <div className="flex-1">
                  <div className="flex gap-2">
                    <h3 className="font-medium">{message.sender}</h3>
                    <h3 className="font-light text-gray-600">
                      | {message.username}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {message.text}
                  </p>
                  <p className="text-xs text-gray-500">{message.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Display Section */}
        <div className="flex-1 bg-white flex flex-col">
          {selectedMessage && (
            <div className="flex-1 flex flex-col">
              <div className="w-full h-20 bg-white border flex items-center px-4">
                {/* Profile Picture in Chat Header */}
                <img
                  src={selectedMessage.profilePic}
                  alt={`${selectedMessage.sender}'s profile`}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                  onClick={() => setIsProfileOpen(true)}
                />
                <h2 className="text-lg font-semibold">
                  {selectedMessage.sender}
                </h2>

                {/* Three Dots Dropdown Menu */}
                <div className="relative ml-auto">
                  <button
                    className="p-2 rounded-full hover:bg-gray-200 "
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <MoreVertical />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md border rounded-md z-50 transition-all duration-200 ease-in-out transform">
                      <ul>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setIsProfileOpen(true);
                            setIsDropdownOpen(false);
                          }}
                        >
                          Contact Info
                        </li>

                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setSelectedMessage(null)}
                        >
                          Close Chat
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            if (selectedMessage)
                              toggleMessageProperty(
                                selectedMessage.id,
                                "starred"
                              );
                            setIsDropdownOpen(false);
                          }}
                        >
                          {selectedMessage?.starred
                            ? "Unstar Message"
                            : "Star Message"}
                        </li>

                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            if (selectedMessage)
                              toggleMessageProperty(
                                selectedMessage.id,
                                "reported"
                              );
                            setIsDropdownOpen(false);
                          }}
                        >
                          {selectedMessage?.reported ? "Unreport" : "Report"}
                        </li>

                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            if (selectedMessage)
                              toggleMessageProperty(
                                selectedMessage.id,
                                "deleted"
                              );
                            setIsDropdownOpen(false);
                          }}
                        >
                          {selectedMessage?.deleted
                            ? "Restore Message"
                            : "Delete"}
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-0">
                {/* Sender's Message */}
                <div className="flex items-start gap-3 mt-7 pl-7">
                  <img
                    src={selectedMessage.profilePic}
                    alt={`${selectedMessage.sender}'s profile`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="bg-[#07cd00] text-white p-3 rounded-lg max-w-xs">
                    <p>{selectedMessage.text}</p>
                    <p className="text-xs  text-right">
                      {selectedMessage.time}
                    </p>
                  </div>
                </div>

                {/* Replies */}
                {selectedMessage.replies.map((reply, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg max-w-xs flex gap-3 ${
                      reply.sender === "You"
                        ? "self-end bg-[#9bb1ff] text-white flex-row-reverse mr-7"
                        : "self-start bg-gray-200"
                    }`}
                  >
                    {/* Profile Picture for Replies */}
                    <div>
                      <p>{reply.text}</p>
                      <p className="text-xs  text-right">{reply.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Input */}
              <div className="mt-auto flex gap-2 p-2 border-t">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Write a reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleReplyMessage}
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Side Panel */}
        {isProfileOpen && selectedMessage && (
          <div className="fixed inset-y-0 right-0 w-120 bg-white shadow-lg p-4 border-l flex flex-col">
            <div className="flex">
              <button
                className="self-start text-gray-500 text-2xl font-semibold"
                onClick={() => setIsProfileOpen(false)}
              >
                ✕
              </button>
              <h3 className="pl-6 pt-1 font-semibold text-gray-500">
                Contact info
              </h3>
            </div>
            <img
              src={
                selectedMessage.profilePic || "https://via.placeholder.com/80"
              }
              alt={`${selectedMessage.sender}'s profile`}
              className="w-60 h-60 rounded-full mx-auto mt-4 object-cover"
            />

            <h3 className="text-3xl font-semibold text-center mt-5">
              {selectedMessage.sender}
            </h3>
            <p className="text-center text-gray-500">
              @{selectedMessage.username}
            </p>

            {/* gap space*/}
            <div className="w-full h-3 bg-gray-200"></div>

            {/* User Info */}
            <div className="mt-4">
              <p className="text-lg text-gray-700 ml-5 mt-5">
                <strong>Email:</strong>{" "}
                {selectedMessage.email || "Not available"}
              </p>
              <p className="text-lg text-gray-700 mt-5 ml-5">
                <strong>Bio:</strong>{" "}
                {selectedMessage.bio || "No bio available"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
