// AdminProfileWithSidebar.js
import React from 'react';

const AdminProfileWithSidebar = () => {
    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Admin Menu</h2>
                <ul style={styles.sidebarList}>
                    <li style={styles.sidebarItem}><a href="#dashboard" style={styles.sidebarLink}>Dashboard</a></li>
                    <li style={styles.sidebarItem}><a href="#manageUsers" style={styles.sidebarLink}>Manage Users</a></li>
                    <li style={styles.sidebarItem}><a href="#reports" style={styles.sidebarLink}>Reports</a></li>
                    <li style={styles.sidebarItem}><a href="#settings" style={styles.sidebarLink}>Settings</a></li>
                    <li style={styles.sidebarItem}><a href="#logout" style={styles.sidebarLink}>Logout</a></li>
                </ul>
            </div>

            {/* Admin Profile */}
            <div style={styles.adminProfile}>
                <div style={styles.header}>
                    <img
                        src="https://via.placeholder.com/100"
                        alt="Admin Avatar"
                        style={styles.avatar}
                    />
                    <div>
                        <h2 style={styles.name}>Admin Name</h2>
                        <p style={styles.role}>Administrator</p>
                    </div>
                </div>
                <div style={styles.info}>
                    <div style={styles.field}>
                        <strong>Email:</strong> admin@example.com
                    </div>
                    <div style={styles.field}>
                        <strong>Phone:</strong> +123456789
                    </div>
                    <div style={styles.field}>
                        <strong>Department:</strong> IT Management
                    </div>
                    <div style={styles.field}>
                        <strong>Location:</strong> Headquarters
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles as JavaScript object
const styles = {
    container: {
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f8',
        height: '100vh',
        marginTop: '8%'
    },
    sidebar: {
        width: '250px',
        height: '100%',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        padding: '20px',
        boxSizing: 'border-box',
    },
    sidebarTitle: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
    },
    sidebarList: {
        listStyleType: 'none',
        padding: 0,
    },
    sidebarItem: {
        margin: '15px 0',
    },
    sidebarLink: {
        color: '#ecf0f1',
        textDecoration: 'none',
        fontSize: '1.2rem',
    },
    adminProfile: {
        flex: 1,
        padding: '20px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    avatar: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        marginRight: '20px',
    },
    name: {
        fontSize: '2rem',
        margin: 0,
    },
    role: {
        fontSize: '1rem',
        color: '#555',
    },
    info: {
        fontSize: '1.2rem',
    },
    field: {
        margin: '10px 0',
    },
};

export default AdminProfileWithSidebar;
