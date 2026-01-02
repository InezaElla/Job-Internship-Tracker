import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; //we use state to store data that can change

function App() {
  //This creates a "state" variable to store our applications
  const [applications, setApplications] = useState([]); //We need a place to store applications before adding any
  
    // State to track what the user is typing
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [dateApplied, setDateApplied] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [notes, setNotes] = useState(''); 

    // Function to get color for each status
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

  // Function to add a new application
  const addApplication = () => {
    if (!company || !position || !location) {
      alert('Please fill in Company, Position, and Location!');
      return;
    }

    const newApp = {
      id: Date.now(), //Use timestamp as a unique ID
      company: company,
      position: position,
      status: status,
      location: location,
      dateApplied: dateApplied,
      salaryRange: salaryRange,
      notes: notes
    };

    setApplications([...applications, newApp]);

    // Clear the inputs after adding
    setCompany('');
    setPosition('');
    setStatus('');
    setLocation('');
    setDateApplied('');
    setSalaryRange('');
    setNotes('');
  };

  // Calculate statistics
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
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
       <h1 style={{
        margin: '0 0 10px 0',
        color: '#1d318dff',
        fontSize: '2.5em',
        textAlign: 'center'
       }}>
        Let's Track It!!
       </h1>
       <p style={{ color: '#999', margin: '0 0 30px 0', textAlign: 'center' }}>
        Track all your applications with us!
       </p>

       {/* Statistics Dashboard */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #e9ecef'
          }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#495057' }}>
              {stats.total}
            </div>
            <div style={{ color: '#6c757d', fontSize: '0.9em' }}>Total</div>
          </div>

          <div style={{ 
            backgroundColor: '#FFF4E6', 
            padding: '20px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #FFD699'
          }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#E67700' }}>
              {stats.applied}
            </div>
            <div style={{ color: '#E67700', fontSize: '0.9em' }}>Applied</div>
          </div>

          <div style={{ 
            backgroundColor: '#E3F2FD', 
            padding: '20px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #90CAF9'
          }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#1976D2' }}>
              {stats.waiting}
            </div>
            <div style={{ color: '#1976D2', fontSize: '0.9em' }}>Waiting</div>
          </div>

          <div style={{ 
            backgroundColor: '#E8F5E9', 
            padding: '20px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #A5D6A7'
          }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#2E7D32' }}>
              {stats.interview}
            </div>
            <div style={{ color: '#2E7D32', fontSize: '0.9em' }}>Interview</div>
          </div>

          <div style={{ 
            backgroundColor: '#F3E5F5', 
            padding: '20px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #CE93D8'
          }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#7B1FA2' }}>
              {stats.offer}
            </div>
            <div style={{ color: '#7B1FA2', fontSize: '0.9em' }}>Offers</div>
          </div>

          <div style={{ 
            backgroundColor: '#FFEBEE', 
            padding: '20px', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #EF9A9A'
          }}>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#C62828' }}>
              {stats.rejected}
            </div>
            <div style={{ color: '#C62828', fontSize: '0.9em' }}>Rejected</div>
          </div>
        </div>

        {/* Add Application Form */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '25px',
          borderRadius: '15px',
          marginBottom: '30px',
          border: '2px solid #dee2e6'
        }}>
          <h3 style={{  marginTop: 0, color: '#495057' }}>➕ Add New Application</h3>

          <div style={{ display:  'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Company name *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{ 
                padding: '12px', 
                border: '2px solid #dee2e6', 
                borderRadius: '8px',
                fontSize: '1em'
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
                fontSize: '1em'
              }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ 
                padding: '12px', 
                border: '2px solid #dee2e6', 
                borderRadius: '8px',
                fontSize: '1em',
                cursor: 'pointer'
              }}
            >
              <option value="text">Select Application Status</option>
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
                fontSize: '1em'
              }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input
              type="date"
              value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)}
              style={{ 
                padding: '12px', 
                border: '2px solid #dee2e6', 
                borderRadius: '8px',
                fontSize: '1em'
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
                fontSize: '1em'
              }}
            />
          </div>
          
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
              fontSize: '1em',
              marginBottom: '15px',
              fontFamily: 'inherit'
            }}
          />
          
          <button 
            onClick={addApplication}
            style={{ 
              padding: '12px 30px', 
              backgroundColor: '#667eea', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.1em',
              fontWeight: 'bold',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5568d3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
          >
            ✨ Add Application
          </button>
        </div>

        {/* Applications List */}
        <h3 style={{ color: '#495057' }}>📋 My Applications ({applications.length})</h3>
        
        {applications.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            color: '#6c757d'
          }}>
            <p style={{ fontSize: '1.2em' }}>No applications yet. Add your first one above! 🚀</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {applications.map((app) => {
              const colors = getStatusColor(app.status);
              return (
                <div 
                  key={app.id}
                  style={{
                    backgroundColor: 'white',
                    border: `3px solid ${colors.border}`,
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', color: '#212529', fontSize: '1.3em' }}>
                        {app.company}
                      </h4>
                      <p style={{ margin: 0, color: '#6c757d' }}>{app.position}</p>
                    </div>
                    <span style={{ 
                      backgroundColor: colors.bg,
                      color: colors.text,
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9em',
                      fontWeight: 'bold',
                      border: `2px solid ${colors.border}`
                    }}>
                      {app.status}
                    </span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.95em' }}>
                    <div>
                      <strong style={{ color: '#495057' }}>📍 Location:</strong> {app.location}
                    </div>
                    <div>
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
                      marginTop: '15px', 
                      padding: '12px', 
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      fontSize: '0.95em'
                    }}>
                      <strong style={{ color: '#495057' }}>📝 Notes:</strong> {app.notes}
                    </div>
                  )}
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
