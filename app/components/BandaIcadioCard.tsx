'use client';

import { useState } from 'react';
import VideoModal from './VideoModal';

export default function BandaIcadioCard() {
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <>
      <div
        className="lineup-card"
        onClick={() => setOpenVideo(true)}
        style={{ cursor: 'pointer' }}
      >
        <span className="lineup-tag">✦ Abertura ✦</span>

        <h3 className="lineup-card-name">Banda Icadio 🎸</h3>

        <p className="lineup-card-desc">
          Clique para conhecer a atração de abertura.
        </p>
      </div>

      <VideoModal open={openVideo} onClose={() => setOpenVideo(false)} />
    </>
  );
}
