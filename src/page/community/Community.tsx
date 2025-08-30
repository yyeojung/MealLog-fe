import { LoadingDot } from "@/components/shared";
import useApi from "@/hooks/useApi";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;
const PROD_BACKEND = import.meta.env.VITE_PROD_BACKEND;
const NODE_ENV = import.meta.env.MODE;
const URL = NODE_ENV === "production" ? PROD_BACKEND : LOCAL_BACKEND;

interface Message {
  _id: string;
  userId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const Community = () => {
  const chatHistory = useApi();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 채팅 내용 불러오기
  useEffect(() => {
    chatHistory.request({
      method: "get",
      url: "/chat",
      onSuccess: (data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setMessages(data.data);
        } else {
          setMessages([]);
        }
      },
      onError: () => {
        setMessages([]);
      },
    });
  }, []);

  const requestSendMessage = async (newMessage: string, aiMessageId: string) => {
    const response = await fetch(URL + "/openai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ message: newMessage }),
    });

    if (!response.body) {
      throw new Error("ReadableStream not supported in this environment.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";
    let firstChunk = true;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const text = line.slice(6);

          if (text === "[DONE]") {
            return;
          } else if (text.startsWith("[ERROR]")) {
            console.error("에러:", text);
            return;
          } else if (text) {
            if (firstChunk) {
              setLoadingId(null);
              firstChunk = false;
            }
            setMessages((prev) =>
              prev.map((msg) => (msg._id === aiMessageId ? { ...msg, content: (msg.content ?? "") + text } : msg)),
            );
          }
        }
      }
    }
  };

  // 채팅 전송
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        _id: Date.now().toString(),
        userId: "current-user",
        role: "user",
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");

      // AI 응답을 위한 임시 메시지 생성
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        _id: aiMessageId,
        userId: "ai-assistant",
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoadingId(aiMessageId);

      // 요청
      requestSendMessage(newMessage, aiMessageId);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatDate = (dateString: string) => {
    const now = new Date();
    const messageDate = new Date(dateString);

    const isToday = now.toDateString() === messageDate.toDateString();

    if (isToday) {
      return "오늘";
    } else {
      return `${messageDate.getFullYear()}년 ${messageDate.getMonth() + 1}월 ${messageDate.getDate()}일 (${messageDate.toLocaleDateString("ko-KR", { weekday: "short" })})`;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 메시지를 날짜별로 그룹화
  const groupMessagesByDate = () => {
    if (!Array.isArray(messages) || messages.length === 0) {
      return [];
    }

    const groups: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      const dateKey = new Date(message.timestamp).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });

    // 각 그룹 내에서 메시지를 시간순으로 정렬
    Object.values(groups).forEach((group) => {
      group.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    });

    // 날짜 그룹을 시간순으로 정렬 (오래된 날짜부터 최신 날짜까지)
    return Object.entries(groups).sort(([dateKeyA], [dateKeyB]) => {
      const dateA = new Date(dateKeyA);
      const dateB = new Date(dateKeyB);
      return dateA.getTime() - dateB.getTime();
    });
  };

  return (
    <div className="flex flex-col bg-gray-50" style={{ height: "calc(100vh - 65px - 85px)" }}>
      {/* 헤더 */}
      <div className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
            <span className="text-lg font-semibold text-white">💬</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">식단 상담</h1>
            <p className="text-sm text-gray-500">
              <strong className="bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
                최근 3개월 식단
              </strong>
              기록을 기반으로{" "}
              <strong className="bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
                AI 영양사
              </strong>
              와 상담하세요
            </p>
          </div>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {groupMessagesByDate().map(([dateKey, dateMessages]) => (
          <div key={dateKey} className="space-y-4">
            {/* 날짜 구분선 */}
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
                {formatDate(dateMessages[0].timestamp)}
              </div>
            </div>

            {/* 해당 날짜의 메시지들 */}
            {dateMessages.map((message) => (
              <div key={message._id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs rounded-2xl px-4 py-3 shadow-sm lg:max-w-md ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "border border-gray-200 bg-white text-gray-900"
                  }`}
                >
                  <div className="text-sm leading-relaxed break-words">
                    {message.content ? (
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    ) : (
                      loadingId === message._id && <LoadingDot />
                    )}
                  </div>
                  <p className={`mt-2 text-xs ${message.role === "user" ? "text-blue-100" : "text-gray-400"}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* 스크롤을 맨 아래로 이동시키기 위한 빈 div */}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="flex items-end space-x-3">
          <div className="flex-1 rounded-2xl bg-gray-100 px-4 py-3">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="w-full resize-none border-none bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none"
              rows={1}
              style={{ minHeight: "20px", maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-3 text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400 disabled:shadow-none"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
