import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { Send, MessageCircle, Shield } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "system";
  timestamp: Date;
}

export function Chat() {
  const ref = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Добро пожаловать в чат психологической поддержки. Здесь вы можете конфиденциально общаться с психологом. Все сообщения анонимны и защищены.",
      sender: "system",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [username] = useState(`Боец_${Math.floor(Math.random() * 1000)}`);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // Демонстрационный автоответ
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Спасибо за ваше сообщение. В реальной версии здесь будет подключен профессиональный психолог.",
        sender: "system",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1000);
  };

  return (
    <section id="chat" ref={ref} className="py-20 px-6 bg-stone-100">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-10 h-10 text-green-800" />
            <h2 className="text-stone-900">Анонимный чат</h2>
          </div>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Психологическая поддержка в режиме реального времени
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Заголовок чата */}
          <div className="bg-green-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" />
              <div>
                <p>Вы в чате как: {username}</p>
                <p className="text-green-100">Чат с психологом — анонимно и конфиденциально</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Онлайн</span>
            </div>
          </div>

          {/* Область сообщений */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-stone-50">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-green-800 text-white rounded-br-none"
                      : "bg-white text-stone-800 border border-stone-200 rounded-bl-none"
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`mt-1 ${
                      message.sender === "user" ? "text-green-100" : "text-stone-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Форма отправки */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-stone-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Напишите сообщение..."
                className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Отправить</span>
              </motion.button>
            </div>
          </form>

          {/* Предупреждение о конфиденциальности */}
          <div className="bg-amber-50 border-t border-amber-200 p-4">
            <p className="text-amber-800 text-center">
              🔒 Все сообщения защищены. Мы не храним личные данные и IP-адреса участников.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}