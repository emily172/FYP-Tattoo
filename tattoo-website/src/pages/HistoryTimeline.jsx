import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const HistoryTimeline = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  // Fetch history details from backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/history')
      .then((response) => {
        console.log('Fetched History:', response.data); // Debugging log
        setHistory(response.data); // Populate timeline with fetched data
      })
      .catch((err) => {
        console.error('Error fetching history:', err);
        setError('Failed to load history details.');
      });
  }, []);

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="p-8 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-8 text-indigo-800">Our History</h1>
      <VerticalTimeline>
        {history.map((entry, index) => (
          <VerticalTimelineElement
            key={index}
            date={entry.year}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          >
            <h3 className="text-xl font-bold">{entry.year}</h3>
            <p className="text-gray-600">{entry.event}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default HistoryTimeline;
