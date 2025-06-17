
import { useState } from "react";

interface ChatInputProps {
  onSend: (value: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || loading) return;
    setLoading(true);
    onSend(value.trim());
    setValue("");
    setTimeout(() => setLoading(false), 600);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex">
      <input
        type="text"
        className="w-full rounded-full px-6 py-4 border border-gray-200 bg-gray-100 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow"
        placeholder="Digite sua pergunta sobre notas fiscais e pressione Enter..."
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={loading}
        maxLength={500}
        autoFocus
      />
      {/* Botão de envio removido, envio só pelo Enter */}
    </form>
  );
}
