'use client';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function VideoModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/4iBgyCSh3Pw"
          title="Banda Icadio"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
