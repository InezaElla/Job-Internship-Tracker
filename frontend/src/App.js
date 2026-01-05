import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [applications, setApplications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [notes, setNotes] = useState(''); 

  const getStatusColor = (status) => {
    const colors = {
      'Applied': { bg: '#FFF4E6', text: '#E67700', border: '#FFD699'},
      'Waiting': { bg: '#E3F2FD', text: '#1976D2', border: '#90CAF9'},
      'Interview': { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7'},
      'Offer': { bg: '#F3E5F5', text: '#7B1FA2', border: '#CE93D8'},
      'Rejected': { bg: '#FFEBEE', text: '#C62828', border: '#EF9A9A'}
    };
    return colors[status] || colors['Applied'];
  };

  const addApplication = () => {
    if (!company || !position || !location) {
      alert('Please fill in Company, Position, and Location!');
      return;
    }

    if (editingId) {
      setApplications(applications.map(app =>
        app.id === editingId
        ? { id: editingId, company, position, status, location, dateApplied, salaryRange, notes }
        : app
      ));
      setEditingId(null);
    } else {
      const newApp = {
        id: Date.now(),
        company, position, status, location, dateApplied, salaryRange, notes
      };
      setApplications([...applications, newApp]);
    }

    setCompany('');
    setPosition('');
    setStatus('Applied');
    setLocation('');
    setDateApplied('');
    setSalaryRange('');
    setNotes('');
  };

  const deleteApplication = (id) => {
    if (window.confirm('Really want to delete this application?')) {
      setApplications(applications.filter(app => app.id !== id));
    }
  };

  const editApplication = (app) => {
    setCompany(app.company);
    setPosition(app.position);
    setStatus(app.status);
    setLocation(app.location);
    setDateApplied(app.dateApplied);
    setSalaryRange(app.salaryRange);
    setNotes(app.notes);
    setEditingId(app.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'Applied').length,
    waiting: applications.filter(a => a.status === 'Waiting').length,
    interview: applications.filter(a => a.status === 'Interview').length,
    offer: applications.filter(a => a.status === 'Offer').length,
    rejected: applications.filter(a => a.status === 'Rejected').length
  };

  return(
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '10px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
       <h1 style={{
        margin: '0 0 10px 0',
        color: '#1d318dff',
        fontSize: 'clamp(1.5em, 5vw, 2.5em)',
        textAlign: 'center'
       }}>
        Let's Track It!!
       </h1>
       <p style={{ color: '#999', margin: '0 0 20px 0', textAlign: 'center', fontSize: 'clamp(0.9em, 3vw, 1em)' }}>
        Track all your applications with us!
       </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #e9ecef'
          }}>
            <div style={{ fontSize: 'clamp(1.5em, 4vw, 2em)', fontWeight: 'bold', color: '#495057' }}>
              {stats.total}
            </div>
            <div style={{ color: '#6c757d', fontSize: 'clamp(0.75em, 2.5vw, 0.9em)' }}>Total</div>
          </div>

          <div style={{ 
            backgroundColor: '#FFF4E6', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #FFD699'
          }}>
            <div style={{ fontSize: 'clamp(1.5em, 4vw, 2em)', fontWeight: 'bold', color: '#E67700' }}>
              {stats.applied}
            </div>
            <div style={{ color: '#E67700', fontSize: 'clamp(0.75em, 2.5vw, 0.9em)' }}>Applied</div>
          </div>

          <div style={{ 
            backgroundColor: '#E3F2FD', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #90CAF9'
          }}>
            <div style={{ fontSize: 'clamp(1.5em, 4vw, 2em)', fontWeight: 'bold', color: '#1976D2' }}>
              {stats.waiting}
            </div>
            <div style={{ color: '#1976D2', fontSize: 'clamp(0.75em, 2.5vw, 0.9em)' }}>Waiting</div>
          </div>

          <div style={{ 
            backgroundColor: '#E8F5E9', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #A5D6A7'
          }}>
            <div style={{ fontSize: 'clamp(1.5em, 4vw, 2em)', fontWeight: 'bold', color: '#2E7D32' }}>
              {stats.interview}
            </div>
            <div style={{ color: '#2E7D32', fontSize: 'clamp(0.75em, 2.5vw, 0.9em)' }}>Interview</div>
          </div>

          <div style={{ 
            backgroundColor: '#F3E5F5', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #CE93D8'
          }}>
            <div style={{ fontSize: 'clamp(1.5em, 4vw, 2em)', fontWeight: 'bold', color: '#7B1FA2' }}>
              {stats.offer}
            </div>
            <div style={{ color: '#7B1FA2', fontSize: 'clamp(0.75em, 2.5vw, 0.9em)' }}>Offers</div>
          </div>

          <div style={{ 
            backgroundColor: '#FFEBEE', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #EF9A9A'
          }}>
            <div style={{ fontSize: 'clamp(1.5em, 4vw, 2em)', fontWeight: 'bold', color: '#C62828' }}>
              {stats.rejected}
            </div>
            <div style={{ color: '#C62828', fontSize: 'clamp(0.75em, 2.5vw, 0.9em)' }}>Rejected</div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px 15px',
          borderRadius: '15px',
          marginBottom: '20px',
          border: '2px solid #dee2e6'
        }}>
          <h3 style={{ marginTop: 0, color: '#495057', fontSize: 'clamp(1.1em, 4vw, 1.3em)' }}>
            {editingId ? '✏️ Edit Application' : '➕ Add New Application'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Company name *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{ 
                padding: '12px', 
                border: '2px solid #dee2e6', 
                borderRadius: '8px',
                fontSize: 'clamp(0.9em, 3vw, 1em)',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            
            <input
              type="text"
              placeholder="Position *"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={{ 
                padding: '12px', 
                border: '2px solid #dee2e6', 
                borderRadius: '8px',
                fontSize: 'clamp(0.9em, 3vw, 1em)',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ 
                padding: '12px', 
                border: '2px solid #dee2e6', 
                borderRadius: '8px',
                fontSize: 'clamp(0.9em, 3vw, 1em)',
                cursor: 'pointer',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select Application Status</option>
              <option value="Applied">📝 Applied</option>
              <option value="Waiting">⏳ Waiting</option>
              <option value="Interview">💼 Interview</option>
              <option value="Offer">🎉 Offer</option>
              <option value="Rejected">❌ Rejected</option>
            </select>
            
            <input
              type="text"
              placeholder="Location (e.g., Remote, San Jose) *"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ 
                padding: '12px', 
                border: '2px solid #dee2e6', 
                borderRadius: '8px',
                fontSize: 'clamp(0.9em, 3vw, 1em)',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />

            <input
              type="date"
              value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)}
              style={{ 
                padding: '12px', 
                border: '2px solid #dee2e6', 
                borderRadius: '8px',
                fontSize: 'clamp(0.9em, 3vw, 1em)',
                width: '100%',
                boxSizing: 'border-box',
                maxWidth: '100%'
              }}
            />
            
            <input
              type="text"
              placeholder="Salary Range (e.g., $7000-$12000)"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              style={{ 
                padding: '12px', 
                border: '2px solid #dee2e6', 
                borderRadius: '8px',
                fontSize: 'clamp(0.9em, 3vw, 1em)',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          
            <textarea
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ 
                padding: '12px', 
                border: '2px solid #dee2e6', 
                borderRadius: '8px',
                width: '100%',
                boxSizing: 'border-box',
                height: '80px',
                fontSize: 'clamp(0.9em, 3vw, 1em)',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          
            <button 
              onClick={addApplication}
              style={{ 
                padding: '14px 20px', 
                backgroundColor: '#667eea', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: 'clamp(1em, 3.5vw, 1.1em)',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                width: '100%'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5568d3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
            >
              {editingId ? '✏️ Update Application' : '✨ Add Application'}
            </button>
          </div>
        </div>

        <h3 style={{ color: '#495057', fontSize: 'clamp(1.1em, 4vw, 1.3em)', marginBottom: '15px' }}>
          📋 My Applications ({applications.length})
        </h3>
        
        {applications.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '30px 20px', 
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            color: '#6c757d'
          }}>
            <p style={{ fontSize: 'clamp(1em, 3.5vw, 1.2em)', margin: 0 }}>
              No applications yet. Add your first one above! 🚀
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {applications.map((app) => {
              const colors = getStatusColor(app.status);
              return (
                <div 
                  key={app.id}
                  style={{
                    backgroundColor: 'white',
                    border: `3px solid ${colors.border}`,
                    padding: '15px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px', gap: '10px' }}>
                      <h4 style={{ margin: 0, color: '#212529', fontSize: 'clamp(1.1em, 4vw, 1.3em)', wordBreak: 'break-word', flex: 1 }}>
                        {app.company}
                      </h4>
                      <span style={{ 
                        backgroundColor: colors.bg,
                        color: colors.text,
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: 'clamp(0.75em, 2.5vw, 0.9em)',
                        fontWeight: 'bold',
                        border: `2px solid ${colors.border}`,
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}>
                        {app.status}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: '#6c757d', fontSize: 'clamp(0.85em, 3vw, 0.95em)', wordBreak: 'break-word' }}>
                      {app.position}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'clamp(0.85em, 2.8vw, 0.95em)' }}>
                    <div>
                      <strong style={{ color: '#495057' }}>📍 Location:</strong> {app.location}
                    </div>
                    <div style={{ wordBreak: 'break-all' }}>
                      <strong style={{ color: '#495057' }}>📅 Date:</strong> {app.dateApplied || 'Not set'}
                    </div>
                    {app.salaryRange && (
                      <div>
                        <strong style={{ color: '#495057' }}>💰 Salary:</strong> {app.salaryRange}
                      </div>
                    )}
                  </div>
                  
                  {app.notes && (
                    <div style={{ 
                      marginTop: '12px', 
                      padding: '10px', 
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      fontSize: 'clamp(0.85em, 2.8vw, 0.95em)',
                      wordBreak: 'break-word'
                    }}>
                      <strong style={{ color: '#495057' }}>📝 Notes:</strong> {app.notes}
                    </div>
                  )}

                  <div style={{
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '2px solid #f0f0f0',
                    display: 'flex',
                    gap: '10px'
                  }}>
                    <button 
                      onClick={() => editApplication(app)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: 'clamp(0.9em, 3vw, 1em)',
                        fontWeight: 'bold',
                        minHeight: '44px'
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteApplication(app.id)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: 'clamp(0.9em, 3vw, 1em)',
                        fontWeight: 'bold',
                        minHeight: '44px'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;