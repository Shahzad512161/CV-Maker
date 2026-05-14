import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

type AuthMode = 'login' | 'signup';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isModalOpen: boolean;
    modalMode: AuthMode;
    openModal: (mode: AuthMode) => void;
    closeModal: () => void;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<AuthMode>('signup');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const openModal = (mode: AuthMode) => {
        setModalMode(mode);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            closeModal();
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isModalOpen,
            modalMode,
            openModal,
            closeModal,
            loginWithGoogle,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
