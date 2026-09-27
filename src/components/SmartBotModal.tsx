import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, HelpCircle } from 'lucide-react';

interface SmartBotModalProps {
  onShowToast: (summary: string, detail: string) => void;
}

export const SmartBotModal: React.FC<SmartBotModalProps> = ({ onShowToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Hello Super Executive! I am SmartBot. How can I assist you with Back Office Promotion Types and Multi-City campaigns today?',
      time: 'Just now',
    },
  ]);

  const quickQuestions = [
    'How are promotion values configured in SAR?',
    'What promotions are active in Bqaiq?',
    'What does the "Referred" key indicate?',
    'How do I export promotion data to Excel?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsgList = [...messages, { sender: 'user' as const, text, time: timeStr }];
    setMessages(newMsgList);
    setInputMsg('');

    // Formulate helpful AI answer based on user query
    setTimeout(() => {
      let botReply = 'I have noted your request. You can filter by city, search by keyword, or download Excel/PDF reports using the top action buttons.';
      const lower = text.toLowerCase();

      if (lower.includes('bqaiq')) {
        botReply = 'Bqaiq currently has sequential order reward promotions (1st Order: 10 SAR, 2nd Order: 20 SAR, 3rd Order: 30 SAR, 4th Order: 40 SAR, 5th Order: 50 SAR) as well as the National Day 2024 reward.';
      } else if (lower.includes('sar') || lower.includes('value') || lower.includes('currency')) {
        botReply = 'Promotion values are standardized in Saudi Riyals (SAR) or other regional currencies (AED, BHD, KWD) through the multi-city filter dropdown above.';
      } else if (lower.includes('referred') || lower.includes('referral') || lower.includes('friend')) {
        botReply = 'The "Referred" key awards registration bonuses to newly invited users (typically 10 SAR), whereas the "Referer" key rewards the referring member once an order is completed.';
      } else if (lower.includes('excel') || lower.includes('export') || lower.includes('download')) {
        botReply = 'Click the green "Export Excel" button at the top right to download a CSV/Excel file of all 35 filtered promotion records.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 400);
  };

  return (
    <>
      {/* Floating SmartBot Button */}
      <div className="fixed bottom-5 right-5 z-[9990] flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="chatbot-pulse w-[68px] h-[68px] rounded-full bg-gradient-to-tr from-[#1b5e43] via-[#389472] to-[#4caf50] border-2 border-white text-white flex flex-col items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-all duration-200"
          title="Ask SmartBot"
        >
          <Bot className="w-8 h-8 text-white drop-shadow-sm" />
          <span className="text-[10px] font-bold text-white tracking-wider mt-0.5">SMARTBOT</span>
        </button>
      </div>

      {/* Chatbot Popup Dialog */}
      {isOpen && (
        <div className="fixed bottom-[100px] right-5 w-[380px] max-w-[90vw] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-[9995] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#010915] text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#389472] flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  SmartBot Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                </h4>
                <p className="text-[11px] text-gray-400">Back Office Executive Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#f9fafb]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#010915] text-white rounded-br-none shadow-xs'
                      : 'bg-white text-gray-800 border border-gray-200/80 rounded-bl-none shadow-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#389472]" />
                  Suggested Questions:
                </p>
                <div className="space-y-1.5">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="w-full text-left text-[11px] text-gray-700 bg-white hover:bg-[#38947215] hover:text-[#2d765b] border border-gray-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input field */}
          <div className="p-2.5 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question about promotions..."
              className="flex-1 h-9 px-3 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#389472] focus:bg-white text-gray-800"
            />
            <button
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-lg bg-[#389472] hover:bg-[#2d765b] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
