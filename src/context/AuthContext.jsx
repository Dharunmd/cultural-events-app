import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('cultural_auth_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('cultural_auth_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('cultural_auth_user');
        }
    }, [user]);

    const login = (email, password) => {
        // Simple mock auth
        if (email === 'admin@culturehub.com' && password === 'admin123') {
            const adminUser = { email, name: 'Admin User', role: 'admin' };
            setUser(adminUser);
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
