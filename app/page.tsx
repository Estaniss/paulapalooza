import PaulapaloozaLogo from './components/LogoPaula';
import RSVPForm from './components/RSVPForm';
import Sparkles from './components/Sparkles';
import BandaIcadioCard from './components/BandaIcadioCard';

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <Sparkles count={70} />

        <div className="hero-content">
          <p className="hero-eyebrow">{`✦ PAULA'S BIRTHDAY FEST ✦`}</p>
          <PaulapaloozaLogo />
          <div className="hero-date-banner">19 de Julho de 2026</div>
          <p className="hero-edition"></p>
          {/* <p className="hero-edition">33ª Edição</p> */}
          <a href="#rsvp" className="hero-cta">
            Confirmar Presença
          </a>
        </div>
      </section>

      {/* HEADLINER */}
      <section className="headliner-section section-wrap">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <Sparkles count={70} />
          <span className="headliner-badge">✦ Headliner ✦</span>
          <h2 className="headliner-name">Paula Lie Sato</h2>
          <p className="headliner-since">Since 1993</p>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">33</div>
              <div className="stat-label">Anos de história</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">19</div>
              <div className="stat-label">Julho 2026</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Amor & energia</div>
            </div>
          </div>
        </div>
      </section>

      {/* YAKUDOSHI */}
      <section className="section-wrap">
        <div className="section-inner">
          <Sparkles count={70} />
          <span className="section-eyebrow">UM NOVO CICLO</span>
          <h2 className="section-title">Yakudoshi </h2>
          <div className="section-rule">✦</div>
          <div className="lineup-card">
            <label className="yakudoshi-label">
              O Yakudoshi é um período simbólico de transição, renovação e novos
              começos para a mulher japonesa. Por isso, o Paulapaloozza é mais
              do que uma festa de aniversário. É uma celebração dos anos vividos
              até aqui, das pessoas que fizeram parte dessa caminhada e da
              chegada de um novo ciclo. Que as energias negativas fiquem para
              trás e que os próximos anos sejam repletos de saúde, felicidade,
              conquistas e momentos inesquecíveis. Será uma alegria celebrar
              esse momento tão importante ao lado de vocês. 💜
            </label>
          </div>
        </div>
      </section>

      {/* LINEUP */}
      <section
        className="section-wrap"
        style={{
          background: 'linear-gradient(180deg, #0d0118 0%, #120229 100%)',
        }}
      >
        <div className="section-inner">
          <Sparkles count={70} />
          <span className="section-eyebrow">Line-up</span>
          <h2 className="section-title">Atrações da Noite</h2>
          <div className="section-rule">✦</div>

          <div className="lineup-grid">
            <BandaIcadioCard />

            <a
              href="https://songbox.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="lineup-card lineup-link"
            >
              <span className="lineup-tag">✦ KARAOKÊ ✦</span>
              <h3 className="lineup-card-name">PARTICIPE DO SHOW</h3>
              <p className="lineup-card-desc">
                Atenção! Escolha sua música, entregue vocais, coreografia e
                emoção. O palco é seu, se torne uma estrela ✨!
              </p>
            </a>

            <div className="lineup-card">
              <span className="lineup-tag">
                ✦ TRANSMISSÃO DA COPA DO MUNDO ✦
              </span>
              <h3 className="lineup-card-name">DISPUTA DA GRANDE FINAL</h3>
              <p className="lineup-card-desc">
                Curta o jogo em um telão especial e torça com a galera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT INFO */}
      <section
        className="section-wrap"
        style={{
          background: 'linear-gradient(180deg, #0d0118, #150328, #0d0118)',
        }}
      >
        <Sparkles count={70} />
        <div className="section-inner">
          <span className="section-eyebrow">Informações</span>
          <h2 className="section-title">Detalhes do Evento</h2>
          <div className="section-rule">✦</div>

          <div className="info-grid">
            <div className="info-card">
              <span className="info-icon">📅</span>
              <div className="info-card-label">Data</div>
              <div className="info-card-value">19 Jul 2026</div>
              <div className="info-card-sub">Domingo</div>
            </div>

            <div className="info-card">
              <span className="info-icon">🎟</span>
              <div className="info-card-label">Ingresso</div>
              <div className="info-card-value">CONFIRME SUA PRESENÇA</div>
              <div className="info-card-sub">
                Garanta sua participação confirmando presença.
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">✨</span>
              <div className="info-card-label">HORÁRIO</div>
              <div className="info-card-value">ABERTURA DOS PORTÕES ÀS 15H</div>
              <div className="info-card-sub">
                Uma tarde e noite de muita diversão.
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">💜</span>
              <div className="info-card-label">LOCAL</div>
              <div className="info-card-value">
                Espaço 162 - Meu Karaokê Box
              </div>
              <div className="info-card-sub">
                Av. Nazaré, 162 - Ipiranga, São Paulo - SP, 04262-000
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="section-wrap rsvp-section-bg">
        <div className="section-inner">
          <Sparkles count={70} />
          <span className="section-eyebrow">Confirmação</span>
          <h2 className="section-title">Confirme sua Presença</h2>
          <div className="section-rule">✦</div>

          <div className="rsvp-card">
            <RSVPForm />
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section id="mapa" className="section-wrap rsvp-section-bg">
        <div className="section-inner">
          <Sparkles count={70} />
          <span className="section-eyebrow">Localização</span>
          <h2 className="section-title">Como chegar?</h2>
          <div className="section-rule">✦</div>
          <div className="rsvp-card">
            <iframe
              src="https://maps.google.com/maps?q=Av.%20Nazar%C3%A9,%20162%20-%20Ipiranga,%20S%C3%A3o%20Paulo%20-%20SP,%2004262-000&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
      {/*       <section className="gift-alert">
        <div className="gift-alert-content">
          <h2>🎁 NÃO ESQUEÇA DO PRESENTE !!! 🎁</h2>
        </div>
      </section> */}
      {/* FOOTER */}
      <footer className="footer">
        <span className="footer-logo">Paulapalooza</span>
        Developed with ❤️ by Thomas Estanislau.
      </footer>
    </main>
  );
}
