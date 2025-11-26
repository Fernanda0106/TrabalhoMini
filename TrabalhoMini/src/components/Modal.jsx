export default function Modal({Open, onClose, children}) {
    if(!Open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center ">
            <div className="bg-white rounded p-6 shadow-lg min-w=[300] relative">
                <button 
                    className="absolute top-2 right-2 text-lg font-bold"
                    onClick={onClose}>
                   ×
                </button>
                {children}
            </div>
        </div>
    );
}