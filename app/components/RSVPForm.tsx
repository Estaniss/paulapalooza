'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function RSVPForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [willAttend, setWillAttend] = useState<boolean | null>(null);
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (willAttend === null) {
      setErrorMsg('Por favor, confirme se vai ou não comparecer.');
      return;
    }
    setFormState('submitting');
    setErrorMsg('');

    const { error } = await supabase.from('rsvps').insert({
      name: name.trim(),
      phone: phone.trim(),
      will_attend: willAttend,
      plus_one: plusOne,
      plus_one_name: plusOne ? plusOneName.trim() : null,
      message: message.trim() || null,
    });

    if (error) {
      setFormState('error');
      setErrorMsg('Ocorreu um erro. Tente novamente.');
    } else {
      setFormState('success');
    }
  }

  if (formState === 'success') {
    return (
      <div className="success-card">
        <div className="sparkle-ring">✦</div>
        <h3 className="success-title">
          {willAttend ? 'Uhuuul! Você está confirmado! 🎉' : 'Que pena! Vamos sentir sua falta 💜'}
        </h3>
        <p className="success-text">
          {willAttend
            ? 'Seu All Access Pass está garantido. Nos vemos na Paulapalooza!'
            : 'Obrigada por avisar. Você sempre estará no nosso coração!'}
        </p>
        <div className="stars-row">✦ ✦ ✦ ✦ ✦</div>
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
          onChange={(e) => setPhone(e.target.value)}
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
            Não consigo
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
                onChange={(e) => setPlusOne(e.target.checked)}
              />
              Vou levar acompanhante
            </label>
          </div>

          {plusOne && (
            <div className="form-group">
              <label className="form-label">Nome do acompanhante</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nome do acompanhante"
                value={plusOneName}
                onChange={(e) => setPlusOneName(e.target.value)}
                required={plusOne}
              />
            </div>
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
