import React from "react";

export default function ConfrirmDialog({ open, title, message, onCancel, onConfirm, confirmLabel = "Confirmar" }) {
    if (!open) return null;
    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3", display: "flex", alignItems:"center", justifyContent:"center", zIndex: 50}}>
            <div style={{background: "#fff", padding: 20, borderRadius:8, width:480, boxShadow: "0 6px 20px rgba(0,0,0,0.12"}}>
                <h3 style={{marginTop: 0}}>{title}</h3>
                <p>{message}</p>
                <div style={{display:"flex", justifyContent:"flex-end", gap:8}}>
                    <button onClick={onCancel} style={{padding:"8px 12px", borderRadius:6, background: "#e0e0e0", border:"none"}}>Cancelar</button>
                    <button onClick={onConfirm} style={{padding:"8px 12px", borderRadius:6, background: "#0b5cff", color: "#fff", border:"none"}}>{confirmLabel}</button>
                </div>
            </div>
        </div>
    );
}
