import React from 'react';
import { useRouter } from 'next/router';
import { FaClipboardList, FaCalendarAlt, FaMoneyBill, FaStar, FaUserCheck } from 'react-icons/fa';

const AdminBasePage = ({ children }) => {
    const router = useRouter();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ width: '80%', maxWidth: '1200px', padding: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', borderRadius: '10px' }}>
                <header style={{ marginBottom: '20px' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', fontSize: '2rem', marginBottom: '20px' }}>Admin Dashboard</h1>
                    <nav style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <IconButton icon={<FaClipboardList />} label="Manage Bookings" onClick={() => router.push('/admin/manage-booking')} />
                        <IconButton icon={<FaCalendarAlt />} label="Manage Events" onClick={() => router.push('/admin/manage-events')} />
                        <IconButton icon={<FaMoneyBill />} label="Manage Payments" onClick={() => router.push('/admin/manage-payments')} />
                        <IconButton icon={<FaStar />} label="Manage Reviews" onClick={() => router.push('/admin/manage-reviews')} />
                        <IconButton icon={<FaUserCheck />} label="Verify Tour Guides" onClick={() => router.push('/admin/verify-tour-guide')} />
                    </nav>
                </header>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};

const IconButton = ({ icon, label, onClick }) => {
    return (
        <button onClick={onClick} style={buttonStyle}>
            <span style={{ marginRight: '5px' }}>{icon}</span>
            {label}
        </button>
    );
};

const buttonStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s',
    fontFamily: 'Arial, sans-serif',
};

export default AdminBasePage;