import { useRef, useState, useEffect } from "react"
import ChatMessage, { ChatMessageProps } from "./ChatMessage"
import ChatInput from "./ChatInput"
import TypingIndicator from "./TypingIndicator"
import { v4 as uuidv4 } from "uuid"

const initialMessages: ChatMessageProps[] = [
  {
    id: 1,
    author: "I2A2 Agente de Notas Fiscais",
    avatarType: "bot",
    content: "Olá! Sou o I2A2 Agente de Notas Fiscais. Posso responder dúvidas sobre notas fiscais. Em que posso ajudar?",
    datetime: new Date(),
    isBot: true,
  },
]

export default function Chat() {
  const [sessionId] = useState(uuidv4())
  const [messages, setMessages] = useState<ChatMessageProps[]>(initialMessages)
  const [isBotTyping, setIsBotTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isBotTyping])

  async function handleSend(question: string) {
    const now = new Date()
    const userMsg: ChatMessageProps = {
      id: Date.now(),
      author: "Usuário",
      avatarType: "user",
      content: question,
      datetime: now,
      isBot: false,
    }
    setMessages((prev) => [...prev, userMsg])
    setIsBotTyping(true)

    const payload = {
      sessionId: sessionId,
      content: question,
    }

    const response = await fetch(`${import.meta.env.VITE_N8N_API_ADDRESS}/api/i2a2-nf-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    let botMsg: ChatMessageProps

    if (!response.ok) {
      const errorMessage = `Erro ao enviar a mensagem: ${response.statusText}`

      botMsg = {
        id: Date.now() + Math.random(),
        author: "I2A2 Agente de Notas Fiscais",
        avatarType: "bot",
        content: errorMessage,
        datetime: new Date(),
        isBot: true,
      }
    } else {
      const responseData = await response.json()

      botMsg = {
        id: Date.now() + Math.random(),
        author: "I2A2 Agente de Notas Fiscais",
        avatarType: "bot",
        content: responseData.content,
        datetime: new Date(),
        isBot: true,
      }
    }

    setMessages((prev) => [...prev, botMsg])
    setIsBotTyping(false)
  }

  return (
    <div className="flex flex-col flex-1 h-full min-h-0">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-5 bg-gray-50 transition-colors" style={{ minHeight: 0 }}>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} {...msg} />
        ))}
        {isBotTyping && (
          <div className="flex justify-start">
            <div className="max-w-md flex flex-col items-start">
              <div className="flex items-center mb-1">
                <span className="text-xs font-medium text-blue-700 mr-1">I2A2 NF</span>
                <span className="text-xs text-gray-400">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <div className="px-4 py-2 rounded-2xl shadow-sm border border-border bg-blue-50">
                <TypingIndicator />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-border bg-white px-4 py-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}
