import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Rsvp = {
  id: string;
  name: string;
  phone: string;
  will_attend: boolean;
  plus_one: boolean;
  plus_one_name: string | null;
  message: string | null;
  created_at: string;
};

async function getRsvps(): Promise<Rsvp[]> {
  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export default async function AdminPage() {
  const rsvps = await getRsvps();

  const confirmados = rsvps.filter((r) => r.will_attend).length;
  const recusados = rsvps.filter((r) => !r.will_attend).length;
  const comAcompanhante = rsvps.filter(
    (r) => r.will_attend && r.plus_one
  ).length;
  const totalPessoas = confirmados + comAcompanhante;

  const stats = [
    { label: 'Confirmados', value: confirmados, icon: '✅' },
    { label: 'Não vão', value: recusados, icon: '❌' },
    { label: 'Com acompanhante', value: comAcompanhante, icon: '👯' },
    { label: 'Total de pessoas', value: totalPessoas, icon: '🎉' },
  ];

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 20% 0%, #3a0a63 0%, #1f033a 45%, #15022a 100%)',
        color: '#fff',
        padding: '48px 32px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ marginBottom: '40px' }}>
          <p
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              fontSize: '12px',
              color: '#c9a6ff',
              marginBottom: '8px',
              fontWeight: 600,
            }}
          >
            Painel da festa
          </p>
          <h1
            style={{
              fontSize: '34px',
              fontWeight: 800,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            🎟 Lista de Confirmados
          </h1>
        </header>

        {/* Cards de estatísticas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '20px',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1 }}>
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.65)',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabela */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '18px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
              Respostas
            </h2>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
              {rsvps.length} no total
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            {rsvps.length === 0 ? (
              <div
                style={{
                  padding: '48px 24px',
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                Ainda não há respostas por aqui.
              </div>
            ) : (
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px',
                }}
              >
                <thead>
                  <tr style={{ textAlign: 'left' }}>
                    {[
                      'Nome',
                      'Telefone',
                      'Vai?',
                      'Acompanhante',
                      'Nome Acompanhante',
                      'Mensagem',
                      'Data',
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '12px 24px',
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: 'rgba(255,255,255,0.55)',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rsvps.map((rsvp, i) => (
                    <tr
                      key={rsvp.id}
                      style={{
                        background:
                          i % 2 === 0
                            ? 'transparent'
                            : 'rgba(255,255,255,0.03)',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <td style={{ padding: '12px 24px', fontWeight: 600 }}>
                        {rsvp.name}
                      </td>
                      <td
                        style={{ padding: '12px 24px', whiteSpace: 'nowrap' }}
                      >
                        {rsvp.phone}
                      </td>
                      <td
                        style={{ padding: '12px 24px', whiteSpace: 'nowrap' }}
                      >
                        {rsvp.will_attend ? (
                          <span style={{ color: '#7CFFB2' }}>✅ Sim</span>
                        ) : (
                          <span style={{ color: '#FF8FA3' }}>❌ Não</span>
                        )}
                      </td>
                      <td style={{ padding: '12px 24px' }}>
                        {rsvp.plus_one ? 'Sim' : 'Não'}
                      </td>
                      <td style={{ padding: '12px 24px' }}>
                        {rsvp.plus_one_name || '-'}
                      </td>
                      <td
                        style={{
                          padding: '12px 24px',
                          maxWidth: '260px',
                          color: 'rgba(255,255,255,0.8)',
                        }}
                      >
                        {rsvp.message || '-'}
                      </td>
                      <td
                        style={{
                          padding: '12px 24px',
                          whiteSpace: 'nowrap',
                          color: 'rgba(255,255,255,0.6)',
                        }}
                      >
                        {new Date(rsvp.created_at).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
