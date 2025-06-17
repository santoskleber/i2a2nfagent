
import { Bot, User } from "lucide-react";
import { formatDatetime } from "@/lib/time";
import clsx from "clsx";

export interface ChatMessageProps {
  id: number;
  author: string;
  avatarType: "user" | "bot";
  content: string;
  datetime: Date;
  isBot: boolean;
}

export default function ChatMessage({
  author,
  avatarType,
  content,
  datetime,
  isBot,
}: ChatMessageProps) {
  const isUser = !isBot;

  return (
    <div
      className={clsx(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex flex-col items-center mr-3">
          <div className="bg-blue-600 p-2 rounded-full flex items-center justify-center shadow">
            <Bot size={28} className="text-white" />
          </div>
        </div>
      )}
      <div
        className={clsx(
          "max-w-md",
          "flex flex-col",
          isUser ? "items-end" : "items-start"
        )}
      >
        <span
          className={clsx(
            "text-xs font-medium mb-0.5",
            isUser ? "text-green-600" : "text-blue-700"
          )}
        >
          {author}
        </span>
        <div
          className={clsx(
            "px-4 py-2 rounded-2xl shadow-sm border border-border whitespace-pre-line",
            "break-words text-base",
            isUser
              ? "bg-green-50 text-green-900 rounded-br-none animate-fade-in"
              : "bg-blue-50 text-blue-900 rounded-bl-none animate-fade-in"
          )}
        >
          {content}
        </div>
        <span className="text-xs text-gray-400 mt-1 mr-1">
          {formatDatetime(datetime)}
        </span>
      </div>
      {isUser && (
        <div className="flex flex-col items-center ml-3">
          <div className="bg-green-500 p-2 rounded-full flex items-center justify-center shadow">
            <User size={28} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
}
