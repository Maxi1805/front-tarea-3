import { useState, useEffect, useRef } from 'react';

function Chat({selectedMovie, isConnected, backURL}) {
    const [messages, setMessages] = useState([
        { message: { content: 'Hola, dime que quieres saber ', date: new Date().toLocaleString(), name: 'Assistant' } },
    ]);
    const [newMessageText, setNewMessageText] = useState('');
    const [newMessage, setNewMessage] = useState(null);  
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const handleSendMessage = () => {
        setNewMessage({ message: { content: newMessageText, date: new Date().toLocaleString(), name:'User' } });
        if (!selectedMovie) {
            setNewMessage({ message: { content: 'Por favor selecciona una película.', date: new Date().toLocaleString(), name: 'Assistant' } })
            setNewMessageText('');
            return;
        }
        console.log({ query: newMessageText, movie: selectedMovie.script });
        setLoading(true);
        fetch(`${backURL}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: newMessageText, movie: selectedMovie.script }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setNewMessage({ message: { content: data.response.message.content, date: new Date().toLocaleString(), name: 'Assistant' } })
                setLoading(false);
            })
            .catch((error) => {
                setNewMessage({ message: { content: 'Lo siento, ha ocurrido un error.', date: new Date().toLocaleString(), name: 'Assistant' } })
                setLoading(false);
            }
        );
        setNewMessageText('');
    };

    useEffect(() => {
        if (!newMessage) return;
        console.log(newMessage);
        setMessages([...messages, newMessage]);
    }, [newMessage]);

    const scrollToBottom = () => {
      if (messagesEndRef.current) {
          messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (!isConnected) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Conectando...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full min-w-full bg-gray-100 p-4">
            <div className="flex-1 overflow-y-auto p-4 bg-white shadow rounded-lg mb-4 max-h-full" ref={messagesEndRef}>
                {messages.map((message, index) => (
                    <div key={index} className={`flex mb-2 ${message.message.name === "User" ? `justify-end` : 'justify-start'}`}>
                        <div className={
                            `flex flex-col space-y-2 max-w-xs px-4 py-2 rounded-lg 
                            ${message.message.name === "User" ? `bg-blue-500 text-white` : `bg-blue-800 text-white`}`}
                        >
                            <p className="text-sm">{message.message.name || 'Anonymous'}</p>
                            <p>{message.message.content}</p>
                            <div className="flex text-xs text-gray-200 justify-end">{message.message.date}</div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-center mt-6">
                        <p className="text-xs text-gray-500">Escribiendo...</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center">
                <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Escribe tu mensaje..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-75"
                    onClick={handleSendMessage}
                    disabled={loading}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default Chat;
