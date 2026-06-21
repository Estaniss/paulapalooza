'use client';
import Image from 'next/image';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function RSVPForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [willAttend, setWillAttend] = useState<boolean | null>(null);
  const [plusOne, setPlusOne] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [guestNames, setGuestNames] = useState<string[]>(['']);
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleGuestCountChange(count: number) {
    const safeCount = Math.max(1, count);
    setGuestCount(safeCount);
    setGuestNames((prev) => {
      const updated = [...prev];
      if (safeCount > updated.length) {
        while (updated.length < safeCount) updated.push('');
      } else {
        updated.length = safeCount;
      }
      return updated;
    });
  }

  function formatPhone(value: string) {
    const numbers = value.replace(/\D/g, '').slice(0, 11);

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }

  function gerarCodigoNumerico(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  function handleGuestNameChange(index: number, value: string) {
    setGuestNames((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (willAttend === null) {
      setErrorMsg('Por favor, confirme se vai ou não comparecer.');
      return;
    }
    if (plusOne && guestNames.some((n) => !n.trim())) {
      setErrorMsg('Por favor, preencha o nome de todos os acompanhantes.');
      return;
    }
    setFormState('submitting');
    setErrorMsg('');

    // checa duplicidade
    const { data: existing, error: checkError } = await supabase
      .from('rsvps')
      .select('id')
      .eq('phone', phone)
      .maybeSingle();

    if (checkError) {
      setFormState('error');
      setErrorMsg('Ocorreu um erro ao validar o telefone. Tente novamente.');
      return;
    }

    if (existing) {
      setFormState('error');
      setErrorMsg(
        '✨Relaxa! Seu nome já está na lista VIP da Paulapalooza. 💜'
      );
      return;
    }

    const { error } = await supabase.from('rsvps').insert({
      name: name.trim(),
      phone: phone,
      will_attend: willAttend,
      plus_one: plusOne,
      guest_count: plusOne ? guestCount : 0,
      guest_names: plusOne ? guestNames.map((n) => n.trim()) : [],
      message: message.trim() || null,
    });

    if (error) {
      if (error.code === '23505') {
        setErrorMsg(
          '✨Relaxa! Seu nome já está na lista VIP da Paulapalooza. 💜'
        );
      } else {
        setErrorMsg('Ocorreu um erro. Tente novamente.');
      }
      setFormState('error');
    } else {
      setFormState('success');
    }
  }

  if (formState === 'success') {
    return (
      <div className="success-card">
        {willAttend ? (
          <>
            <h3 className="success-title">Uhuuul! Você está confirmado!</h3>
            <div className="success-image">
              <Image
                src="/images/qrcode-roxo.png"
                alt="QR Code de acesso"
                width={220}
                height={220}
                priority
              />
              <p className="success-text">{`PAULAPALOOSA16072026${gerarCodigoNumerico()}`}</p>
            </div>

            <p className="success-text">
              Seu All Access Pass está garantido. Apresente este QR Code na
              entrada da Paulapalooza! 💜✨
            </p>

            <div className="stars-row">✦ ✦ ✦ ✦ ✦</div>
          </>
        ) : (
          <>
            <h3 className="success-title">
              Que pena! Uma estrela a menos vai brilhar na Paulapalooza 💜✨😢
            </h3>

            <p className="success-text">
              Obrigada por avisar. Você sempre estará no nosso coração!
            </p>

            <div className="stars-row">💜 ✨ 💜 ✨ 💜</div>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rsvp-form">
      <div className="form-group">
        <label className="form-label">Seu nome completo</label>
        <input
          type="text"
          className="form-input"
          placeholder="Nome Sobrenome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Celular / WhatsApp</label>
        <input
          type="tel"
          className="form-input"
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Vai comparecer?</label>
        <div className="attend-buttons">
          <button
            type="button"
            className={`attend-btn attend-yes ${willAttend === true ? 'active' : ''}`}
            onClick={() => setWillAttend(true)}
          >
            ✦ Sim, vou!
          </button>
          <button
            type="button"
            className={`attend-btn attend-no ${willAttend === false ? 'active' : ''}`}
            onClick={() => setWillAttend(false)}
          >
            😭 Não consigo
          </button>
        </div>
      </div>

      {willAttend && (
        <>
          <div className="form-group">
            <label className="form-label checkbox-label">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={plusOne}
                onChange={(e) => {
                  setPlusOne(e.target.checked);
                  if (e.target.checked && guestNames.length === 0) {
                    setGuestCount(1);
                    setGuestNames(['']);
                  }
                }}
              />
              Vou levar acompanhante(s)
            </label>
          </div>

          {plusOne && (
            <>
              <div className="form-group">
                <label className="form-label">Quantos acompanhantes?</label>
                <div className="guest-stepper">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => handleGuestCountChange(guestCount - 1)}
                    disabled={guestCount <= 1}
                  >
                    ➖
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="form-input stepper-input"
                    value={guestCount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      handleGuestCountChange(val ? parseInt(val, 10) : 1);
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => handleGuestCountChange(guestCount + 1)}
                  >
                    ➕
                  </button>
                </div>
              </div>

              {guestNames.map((guestName, index) => (
                <div className="form-group" key={index}>
                  <label className="form-label">
                    Nome do acompanhante{' '}
                    {guestNames.length > 1 ? index + 1 : ''}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nome completo"
                    value={guestName}
                    onChange={(e) =>
                      handleGuestNameChange(index, e.target.value)
                    }
                    required
                  />
                </div>
              ))}
            </>
          )}
        </>
      )}

      <div className="form-group">
        <label className="form-label">Mensagem para a Paula (opcional)</label>
        <textarea
          className="form-input form-textarea"
          placeholder="Deixe um recado especial..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
      </div>

      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      <button
        type="submit"
        className="submit-btn"
        disabled={formState === 'submitting'}
      >
        {formState === 'submitting' ? 'Enviando...' : '✦ Confirmar Presença ✦'}
      </button>
    </form>
  );
}
