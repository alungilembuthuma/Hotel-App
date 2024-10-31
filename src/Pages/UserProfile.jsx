import React from 'react';
import Footer from '../Components/Footer'

const UserProfileWithSidebar = () => {
    return (
      <>
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Menu</h2>
                <ul style={styles.sidebarList}>
                    <li style={styles.sidebarItem}><a href="#profile" style={styles.sidebarLink}>Profile</a></li>
                    <li style={styles.sidebarItem}><a href="/settings" style={styles.sidebarLink}>Settings</a></li>
                    <li style={styles.sidebarItem}><a href="#notifications" style={styles.sidebarLink}>Notifications</a></li>
                    <li style={styles.sidebarItem}><a href="#logout" style={styles.sidebarLink}>Logout</a></li>
                </ul>
            </div>

            {/* User Profile */}
            <div style={styles.userProfile}>
                <div style={styles.header}>
                    <img
                        src="https://via.placeholder.com/100"
                        alt="User Avatar"
                        style={styles.avatar}
                    />
                    <h2 style={styles.name}>Nhlakanipho Mhlongo</h2>
                </div>
                <div style={styles.info}>
                    <div style={styles.field}>
                        <strong>Email:nfbmhlongo@gmial.com</strong> 
                    </div>
                    <div style={styles.field}>
                        <strong>Phone: 0746993203</strong>
                    </div>
                    <div style={styles.field}>
                        <strong>Location:</strong> New York, USA
                    </div>
                </div>
            </div>
        </div>
         <div>
         <Footer/>
      </div>
     </>
    );
};

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
    userProfile: {
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
    },
    info: {
        fontSize: '1.2rem',
    },
    field: {
        margin: '10px 0',
    },
};

export default UserProfileWithSidebar;
