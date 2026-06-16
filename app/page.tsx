import Image from 'next/image';
import RSVPForm from './components/RSVPForm';
import Sparkles from './components/Sparkles';

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <Sparkles count={70} />

        <div className="hero-content">
          <p className="hero-eyebrow">✦ All Access Pass ✦</p>
          <h1 className="hero-title">Paulapalooza</h1>
          <div className="hero-date-banner">18 de Julho de 2026</div>
          <p className="hero-edition">33ª Edição da Minha Vida</p>
          <a href="#rsvp" className="hero-cta">
            Confirmar Presença
          </a>
        </div>
      </section>

      {/* HEADLINER */}
      <section className="headliner-section section-wrap">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <span className="headliner-badge">✦ Headliner ✦</span>
          <h2 className="headliner-name">Paula Lie Sato</h2>
          <p className="headliner-since">Headliner desde 1993</p>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">33</div>
              <div className="stat-label">Anos de história</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">18</div>
              <div className="stat-label">Julho 2026</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Amor & energia</div>
            </div>
          </div>
        </div>
      </section>

      {/* LINEUP */}
      <section className="section-wrap" style={{ background: 'linear-gradient(180deg, #0d0118 0%, #120229 100%)' }}>
        <div className="section-inner">
          <span className="section-eyebrow">Line-up</span>
          <h2 className="section-title">Atrações da Noite</h2>
          <div className="section-rule">✦</div>

          <div className="lineup-grid">
            <div className="lineup-card">
              <span className="lineup-tag">✦ Abertura ✦</span>
              <h3 className="lineup-card-name">Banda Icadio</h3>
              <p className="lineup-card-desc">
                O som que vai aquecer a festa e abrir a noite com muita energia.
              </p>
            </div>

            <div className="lineup-card">
              <span className="lineup-tag">✦ Special Guest ✦</span>
              <h3 className="lineup-card-name">Charlie Brown Jr</h3>
              <p className="lineup-card-desc">
                Rock, nostalgia e muito axé. A trilha sonora dos melhores momentos.
              </p>
            </div>

            <div className="lineup-card">
              <span className="lineup-tag">✦ Headliner ✦</span>
              <h3 className="lineup-card-name">Paramore</h3>
              <p className="lineup-card-desc">
                O headliner que a noite pede. Alt-rock e pop punk puro para fechar com chave de ouro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MERCH / GALLERY */}
      <section className="section-wrap">
        <div className="section-inner">
          <span className="section-eyebrow">Experiência</span>
          <h2 className="section-title">O Festival em Detalhes</h2>
          <div className="section-rule">✦</div>

          <div className="merch-grid">
            <div className="merch-item" style={{ aspectRatio: '3/2' }}>
              <Image
                src="/images/WhatsApp_Image_2026-06-16_at_19.04.27_(1).jpeg"
                alt="Pulseira All Access Pass Paulapalooza"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 600px) 100vw, 50vw"
              />
              <span className="merch-caption">All Access Pass</span>
            </div>

            <div className="merch-item" style={{ aspectRatio: '3/2' }}>
              <Image
                src="/images/WhatsApp_Image_2026-06-16_at_19.04.27.jpeg"
                alt="Copo personalizado Paulapalooza"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 600px) 100vw, 50vw"
              />
              <span className="merch-caption">Copo Exclusivo</span>
            </div>

            <div className="merch-item" style={{ gridColumn: '1 / -1', aspectRatio: '16/7' }}>
              <Image
                src="/images/WhatsApp_Image_2026-06-16_at_19.04.28.jpeg"
                alt="Decoração festa Paulapalooza"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="100vw"
              />
              <span className="merch-caption">Palco & Decoração</span>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT INFO */}
      <section
        className="section-wrap"
        style={{ background: 'linear-gradient(180deg, #0d0118, #150328, #0d0118)' }}
      >
        <div className="section-inner">
          <span className="section-eyebrow">Informações</span>
          <h2 className="section-title">Detalhes do Evento</h2>
          <div className="section-rule">✦</div>

          <div className="info-grid">
            <div className="info-card">
              <span className="info-icon">📅</span>
              <div className="info-card-label">Data</div>
              <div className="info-card-value">18 Jul 2026</div>
              <div className="info-card-sub">Sábado</div>
            </div>

            <div className="info-card">
              <span className="info-icon">🎟</span>
              <div className="info-card-label">Ingresso</div>
              <div className="info-card-value">All Access</div>
              <div className="info-card-sub">Convite especial</div>
            </div>

            <div className="info-card">
              <span className="info-icon">✨</span>
              <div className="info-card-label">Edição</div>
              <div className="info-card-value">33ª</div>
              <div className="info-card-sub">Da vida dela</div>
            </div>

            <div className="info-card">
              <span className="info-icon">💜</span>
              <div className="info-card-label">Dress Code</div>
              <div className="info-card-value">Roxo & Glitter</div>
              <div className="info-card-sub">Brilhe muito!</div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="section-wrap rsvp-section-bg">
        <div className="section-inner">
          <span className="section-eyebrow">Confirmação</span>
          <h2 className="section-title">Confirme sua Presença</h2>
          <div className="section-rule">✦</div>

          <div className="rsvp-card">
            <RSVPForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span className="footer-logo">Paulapalooza</span>
        <p className="footer-text">33ª Edição da Minha Vida · 18.07.2026</p>
      </footer>
    </main>
  );
}
