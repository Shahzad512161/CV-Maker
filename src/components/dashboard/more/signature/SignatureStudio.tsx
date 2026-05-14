'use client';

import React, { useState, useRef } from 'react';
import { PenTool, Type, Upload as UploadIcon, Download, Save, RotateCcw, Check, MoreVertical, Edit3, Trash2, Clock, ChevronRight } from 'lucide-react';
import { ModeDraw } from './ModeDraw';
import { ModeType } from './ModeType';
import { ModeUpload } from './ModeUpload';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { InputModal } from '@/components/ui/InputModal';

type SignatureMode = 'draw' | 'type' | 'upload';

export const SignatureStudio = () => {
    const { user, openModal } = useAuth();
    const [mode, setMode] = useState<SignatureMode>('draw');
    const [signature, setSignature] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [savedSuccess, setSavedSuccess] = useState(false);
    const [savedSignatures, setSavedSignatures] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; sigId: string | null }>({
        isOpen: false,
        sigId: null
    });
    const [saveModal, setSaveModal] = useState({
        isOpen: false
    });
    const [renameModal, setRenameModal] = useState<{ isOpen: boolean; sigId: string | null; currentName: string }>({
        isOpen: false,
        sigId: null,
        currentName: ""
    });

    // Fetch Saved Signatures
    React.useEffect(() => {
        const fetchSignatures = async () => {
            if (!user) {
                setSavedSignatures([]);
                setIsLoading(false);
                return;
            }
            try {
                const q = query(
                    collection(db, 'signatures'),
                    where('userId', '==', user.uid),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q).catch(async () => {
                    // Fallback for missing index
                    const qBasic = query(
                        collection(db, 'signatures'),
                        where('userId', '==', user.uid)
                    );
                    return await getDocs(qBasic);
                });

                const fetched = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort fallback if needed
                const sorted = [...fetched].sort((a: any, b: any) => {
                    const timeA = a.createdAt?.toMillis?.() || 0;
                    const timeB = b.createdAt?.toMillis?.() || 0;
                    return timeB - timeA;
                });

                setSavedSignatures(sorted);
            } catch (error) {
                console.error("Error fetching signatures:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSignatures();
    }, [user]);

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeMenuId && !(event.target as HTMLElement).closest('.dropdown-container')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenuId]);

    const handleDownload = (url: string, name?: string) => {
        const link = document.createElement('a');
        link.download = name ? `${name}.png` : 'signature.png';
        link.href = url;
        link.click();
    };

    const handleSave = () => {
        if (!user) {
            openModal('login');
            return;
        }
        if (!signature) return;

        setSaveModal({ isOpen: true });
    };

    const confirmSave = async (name: string) => {
        if (!user || !signature) return;

        setIsSaving(true);
        try {
            // 1. Storage is currently disabled, so we save the data URL directly to Firestore
            /* 
            const storageRef = ref(storage, `signatures/${user.uid}/${Date.now()}.png`);
            await uploadString(storageRef, signature, 'data_url');
            const downloadURL = await getDownloadURL(storageRef);
            */
            const finalUrl = signature; // Use data URL directly

            // 2. Save reference to Firestore
            const docRef = await addDoc(collection(db, 'signatures'), {
                userId: user.uid,
                url: finalUrl,
                name: name || "Untitled Signature",
                mode: mode,
                createdAt: serverTimestamp(),
            });

            const newSig = {
                id: docRef.id,
                userId: user.uid,
                url: finalUrl,
                name: name || "Untitled Signature",
                mode: mode,
                createdAt: { toMillis: () => Date.now() }
            };

            setSavedSignatures(prev => [newSig, ...prev]);
            setSavedSuccess(true);
            setTimeout(() => setSavedSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving signature:', error);
            alert('Failed to save signature. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (sigId: string) => {
        setDeleteModal({ isOpen: true, sigId });
    };

    const confirmDelete = async () => {
        if (!deleteModal.sigId) return;
        try {
            await deleteDoc(doc(db, 'signatures', deleteModal.sigId));
            setSavedSignatures(prev => prev.filter(s => s.id !== deleteModal.sigId));
        } catch (error) {
            console.error("Error deleting signature:", error);
        }
    };

    const handleRename = (sigId: string, currentName: string) => {
        setRenameModal({ isOpen: true, sigId, currentName });
    };

    const confirmRename = async (newName: string) => {
        const { sigId, currentName } = renameModal;
        if (!sigId || !newName || newName === currentName) return;

        try {
            await updateDoc(doc(db, 'signatures', sigId), {
                name: newName
            });
            setSavedSignatures(prev => prev.map(s => s.id === sigId ? { ...s, name: newName } : s));
        } catch (error) {
            console.error("Error renaming signature:", error);
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
            {/* Left Column: Creator Controls */}
            <div className="xl:col-span-8 space-y-8">
                {/* Mode Selector Tabs */}
                <div className="bg-white p-2 rounded-3xl border border-black/[0.05] shadow-sm flex gap-2">
                    <button
                        onClick={() => setMode('draw')}
                        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'draw'
                            ? 'bg-[#1A1A1A] text-white shadow-xl'
                            : 'text-slate-400 hover:bg-gray-50 hover:text-black'
                            }`}
                    >
                        <PenTool className="w-5 h-5" />
                        Draw
                    </button>
                    <button
                        onClick={() => setMode('type')}
                        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'type'
                            ? 'bg-[#1A1A1A] text-white shadow-xl'
                            : 'text-slate-400 hover:bg-gray-50 hover:text-black'
                            }`}
                    >
                        <Type className="w-5 h-5" />
                        Type
                    </button>
                    <button
                        onClick={() => setMode('upload')}
                        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'upload'
                            ? 'bg-[#1A1A1A] text-white shadow-xl'
                            : 'text-slate-400 hover:bg-gray-50 hover:text-black'
                            }`}
                    >
                        <UploadIcon className="w-5 h-5" />
                        Upload
                    </button>
                </div>

                {/* Creator Workspace */}
                <div className="bg-white rounded-[2.5rem] border border-black/[0.05] shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                    <div className="flex-1 p-8 sm:p-12 flex items-center justify-center bg-[#F9F8F6]/50">
                        {mode === 'draw' && <ModeDraw onCapture={setSignature} />}
                        {mode === 'type' && <ModeType onCapture={setSignature} />}
                        {mode === 'upload' && <ModeUpload onCapture={setSignature} />}
                    </div>
                </div>
            </div>

            {/* Right Column: Preview & Actions */}
            <div className="xl:col-span-4 space-y-8 sticky top-8">
                <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-black/[0.05] shadow-lg flex flex-col">
                    <h3 className="text-xl font-black text-[#1a1b3a] tracking-tight mb-8">Final Preview</h3>

                    {/* Live Preview Area */}
                    <div className="aspect-[4/3] bg-[#F9F8F6] rounded-3xl border-2 border-dashed border-black/10 flex items-center justify-center p-8 mb-8 overflow-hidden relative group">
                        {signature ? (
                            <img
                                src={signature}
                                alt="Signature Preview"
                                className="max-w-full max-h-full object-contain filter drop-shadow-md"
                            />
                        ) : (
                            <div className="text-center">
                                <RotateCcw className="w-10 h-10 text-slate-300 mx-auto mb-4 animate-spin-slow" />
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Awaiting design...</p>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <button
                            disabled={!signature}
                            onClick={() => handleDownload(signature as string)}
                            className={`w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${signature
                                ? 'bg-[#F3F1EC] text-[#1A1A1A] border-2 border-black hover:bg-black hover:text-white shadow-lg active:scale-[0.98]'
                                : 'bg-gray-100 text-gray-400 border-2 border-transparent cursor-not-allowed'
                                }`}
                        >
                            <Download className="w-5 h-5" />
                            Download Transparent PNG
                        </button>

                        <button
                            disabled={!signature || isSaving}
                            onClick={handleSave}
                            className={`w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${signature && !isSaving
                                ? savedSuccess
                                    ? 'bg-emerald-500 text-white shadow-xl'
                                    : 'bg-[#1A1A1A] text-white shadow-xl hover:bg-black hover:scale-[1.02] active:scale-[0.98]'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {isSaving ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : savedSuccess ? (
                                <Check className="w-5 h-5" />
                            ) : (
                                <Save className="w-5 h-5" />
                            )}
                            {savedSuccess ? 'Saved Successfully' : 'Save to My Account'}
                        </button>
                    </div>

                    <div className="mt-10 pt-10 border-t border-black/[0.05]">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                            Your signatures are securely stored and can be reused in any of your resumes or documents.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Saved Signatures Grid */}
            <div className="xl:col-span-12 mt-16 pb-20">
                <div className="flex items-center gap-3 mb-8 pl-1">
                    <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-[#1a1b3a] tracking-tight leading-tight">
                            Your Saved Signatures
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            Reusable assets for your designs
                        </p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-black/[0.05]">
                        <div className="w-10 h-10 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                        <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading studio assets...</p>
                    </div>
                ) : savedSignatures.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {savedSignatures.map((sig) => (
                            <div key={sig.id} className="group bg-white rounded-[2rem] p-4 border border-black/[0.03] shadow-sm hover:shadow-xl transition-all duration-500 relative">
                                <div className="aspect-[3/2] bg-[#F9F8F6] rounded-2xl mb-4 flex items-center justify-center p-6 overflow-hidden relative border border-black/[0.02]">
                                    <img
                                        src={sig.url}
                                        alt={sig.name}
                                        className="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Quick Actions Overlay */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                        <button
                                            onClick={() => handleDownload(sig.url, sig.name)}
                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                                        >
                                            <Download className="w-5 h-5 text-black" />
                                        </button>
                                    </div>
                                </div>

                                <div className="px-1 flex justify-between items-start">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-black text-[#1a1b3a] truncate mb-1 pr-2">
                                            {sig.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-slate-400">
                                            <Clock className="w-3 h-3" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                                {sig.createdAt?.toDate ? sig.createdAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Recently'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative dropdown-container">
                                        <button
                                            onClick={() => setActiveMenuId(activeMenuId === sig.id ? null : sig.id)}
                                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-slate-400 hover:text-[#1a1b3a]"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>

                                        {activeMenuId === sig.id && (
                                            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-2xl border border-black/[0.05] z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                <button
                                                    onClick={() => { handleRename(sig.id, sig.name); setActiveMenuId(null); }}
                                                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-600 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                    Rename
                                                </button>
                                                <div className="h-px bg-black/[0.05] my-1" />
                                                <button
                                                    onClick={() => { handleDelete(sig.id); setActiveMenuId(null); }}
                                                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 bg-white/50 rounded-[2.5rem] border-2 border-dashed border-black/5 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-200 mb-4">
                            <PenTool className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-black text-slate-400 tracking-tight">No saved signatures yet</h4>
                        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mt-2">Start creating your first signature above</p>
                    </div>
                )}

                <ConfirmModal
                    isOpen={deleteModal.isOpen}
                    onClose={() => setDeleteModal({ isOpen: false, sigId: null })}
                    onConfirm={confirmDelete}
                    title="Delete Signature?"
                    message="Are you sure you want to delete this signature? This will remove it from your studio assets."
                    confirmLabel="Delete Forever"
                    isDestructive={true}
                />

                <InputModal
                    isOpen={saveModal.isOpen}
                    onClose={() => setSaveModal({ isOpen: false })}
                    onConfirm={confirmSave}
                    title="Name Signature"
                    defaultValue="My Signature"
                    placeholder="Enter name for your signature..."
                    confirmLabel="Save to Account"
                />

                <InputModal
                    isOpen={renameModal.isOpen}
                    onClose={() => setRenameModal({ isOpen: false, sigId: null, currentName: "" })}
                    onConfirm={confirmRename}
                    title="Rename Signature"
                    defaultValue={renameModal.currentName}
                    placeholder="Enter new name..."
                    confirmLabel="Update Name"
                />
            </div>
        </div>
    );
};
