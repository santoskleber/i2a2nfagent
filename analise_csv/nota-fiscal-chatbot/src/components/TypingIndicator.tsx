import React from "react"

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center">
        <span className="sr-only">Bot digitando</span>
      </div>
      <div className="flex space-x-1">
        <span className="block w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
        <span className="block w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.12s" }} />
        <span className="block w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.24s" }} />
      </div>
      <span className="ml-2 text-xs text-blue-600">I2A2 Agente de Notas Fiscais está digitando...</span>
    </div>
  )
}
