import './SellerNotifications.css'; 
import React, { useContext, useEffect, useState } from 'react';
import api from '../../utils/api';
import PropertyContext from '../context/Property/PropertyContext';

const SellerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedVisitId, setSelectedVisitId] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const { userData, getUserData } = useContext(PropertyContext);
  const [sellerId, setSellerId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No auth-token found. Redirecting to Login page.");
      navigate("/Login");
      return;
    }
    getUserData();
  }, []);

  useEffect(() => {
    if(userData && userData.role === "seller"){
      setSellerId(userData._id);
    }
  }, [userData]);

  useEffect(() => {
    if (!sellerId) return;
    const fetchData = async () => {
      const res = await api.get(`/api/visit/notifications/${sellerId}`);
      setNotifications(res.data);
    };
    fetchData();
  }, [sellerId]);

  const fetchAgents = async (visitId) => {
    setSelectedVisitId(visitId);
    const res = await api.post('/api/visit/assign-agent');
    setAgents(res.data);
  };

  const assignAgent = async () => {
    if (!selectedAgent || !selectedVisitId) return;

    await api.post('/api/visit/assign-agent', {
      visitId: selectedVisitId,
      agentId: selectedAgent,
    });

    alert('Agent Assigned!');
    setSelectedAgent('');
    setSelectedVisitId(null);
  };
return (
    <div className="seller-notifications">
      <h2>New Visit Notifications</h2>
      {notifications.map((note) => (
        <div key={note._id} className="notification-card">
          <p>{note.message}</p>
          <p><strong>Visitor:</strong> {note.visitId?.name}</p>
          <p><strong>Date:</strong> {note.visitId?.date}</p>
          <p><strong>Time:</strong> {note.visitId?.time}</p>
          <button onClick={() => fetchAgents(note.visitId._id)}>Assign Agent</button>
        </div>
      ))}

      {selectedVisitId && (
        <div className="assign-section">
          <h3>Select Agent</h3>
          <select onChange={(e) => setSelectedAgent(e.target.value)} value={selectedAgent}>
            <option value="">-- Select Agent --</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {agent.name}
              </option>
            ))}
          </select>
          <button onClick={assignAgent}>Assign</button>
        </div>
      )}
    </div>
  );
};

export default SellerNotifications;
