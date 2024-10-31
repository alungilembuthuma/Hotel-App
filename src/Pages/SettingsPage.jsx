import React, { useState } from 'react';
import Footer from '../Components/Footer';

const SettingsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission,
        // such as sending the data to an API.
        console.log('Form submitted:', formData);
        // Reset the form or show a success message
        setFormData({
            name: '',
            email: '',
            password: '',
        });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>User Settings</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Save Changes</button>
            </form>
            <div style={{marginTop:"8%", width:"100vw", marginLeft:"-3%"}}>
            <Footer/>
            </div> 
        </div>
    );
};

// Styles as JavaScript object
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9fafb',
        marginTop: '8%'
    },
    title: {
        fontSize: '2rem',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        maxWidth: '500px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '1rem',
        marginBottom: '5px',
        color: '#555',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        outline: 'none',
    },
    button: {
        padding: '10px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

// Optional: Change button color on hover
styles.buttonHover = {
    backgroundColor: '#0056b3',
};

export default SettingsPage;
