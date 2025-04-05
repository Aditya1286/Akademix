import React, { useState } from 'react';
import { Bell, User, Calendar, ChevronRight, Mail } from 'lucide-react';

const RecentMessages = () => {
  // Sample message data - this would come from your API in a real app
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Prof. Johnson',
      subject: 'Assignment Deadline Extended',
      preview: 'Dear students, I am writing to inform you that the deadline for the research paper has been extended to...',
      date: '2025-04-05T10:30:00',
      read: false,
      senderRole: 'faculty'
    },
    {
      id: 2,
      sender: 'Student Services',
      subject: 'Campus Event: Career Fair',
      preview: 'Join us for the Annual Spring Career Fair! Over 50 companies will be present to discuss internships and...',
      date: '2025-04-04T16:45:00',
      read: true,
      senderRole: 'admin'
    },
    {
      id: 3,
      sender: 'Library',
      subject: 'Books Due Reminder',
      preview: 'This is a courtesy reminder that you have 3 books due for return by April 10th. Please return them to...',
      date: '2025-04-03T09:15:00',
      read: true,
      senderRole: 'admin'
    },
    {
      id: 4,
      sender: 'Dr. Smith',
      subject: 'Research Opportunity',
      preview: 'I am looking for dedicated students interested in participating in my upcoming research project on...',
      date: '2025-04-02T14:20:00',
      read: false,
      senderRole: 'faculty'
    },
    {
      id: 5,
      sender: 'IT Department',
      subject: 'Scheduled Maintenance',
      preview: 'Please be advised that the college portal will be undergoing scheduled maintenance this weekend...',
      date: '2025-04-01T11:00:00',
      read: true,
      senderRole: 'admin'
    }
  ]);

  // Format the date to display in a readable format
  const formatDate = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // If the message is from today, show the time
    if (messageDate.toDateString() === today.toDateString()) {
      return `Today at ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    // If the message is from yesterday, show "Yesterday"
    else if (messageDate.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    // Otherwise show the full date
    else {
      return messageDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Mark a message as read
  const markAsRead = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    ));
  };

  // Get the appropriate icon based on sender role
  const getSenderIcon = (role) => {
    switch(role) {
      case 'faculty':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'admin':
        return <Bell className="h-4 w-4 text-purple-500" />;
      default:
        return <Mail className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-4 h-full overflow-hidden flex flex-col">    
      
      <div className="overflow-y-auto flex-grow">
        {messages.length > 0 ? (
          <ul className="space-y-2">
            {messages.map(message => (
              <li 
                key={message.id} 
                className={`p-3 rounded-md transition-colors duration-200 hover:bg-gray-50 cursor-pointer border-l-4 ${
                  message.read ? 'border-gray-200' : 'border-blue-500'
                }`}
                onClick={() => markAsRead(message.id)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 mr-2">
                      {getSenderIcon(message.senderRole)}
                    </span>
                    <span className={`font-medium ${message.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {message.sender}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(message.date)}
                  </div>
                </div>
                <h4 className={`text-sm mb-1 ${message.read ? 'font-normal text-gray-700' : 'font-semibold text-gray-900'}`}>
                  {message.subject}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {message.preview}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
            <Mail className="h-12 w-12 mb-3 text-gray-300" />
            <p>No recent messages</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {messages.filter(m => !m.read).length} unread messages
        </div>
        <button className="text-xs text-blue-600 hover:text-blue-800 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default RecentMessages;