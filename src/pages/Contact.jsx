import { useState } from 'react'
import useReveal from '../components/useReveal'
import { useLang } from '../components/LangContext.jsx'

const WA_NUMBER = '6281234567890'

const TESTIMONIALS = [
  { stars:'★★★★★', quote:'"Replied within 20 minutes. Project done in 5 days. Absolutely incredible service."', initials:'SR', name:'Sari Rahayu', role:'Owner, Sari Boutique' },
  { stars:'★★★★★', quote:'"The team understood exactly what we needed without a lengthy brief. Highly recommend."', initials:'BP', name:'Bima Pratama', role:'Founder, BuildFast' },
]

export default function Contact() {
  useReveal()
  const { t } = useLang()
  const ct = t.contact
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', service:'', budget:'', message:'' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = ['Hi websitestudio.id! 👋','',`*Name:* ${form.name}`,form.email?`*Email:* ${form.email}`:'',form.service?`*Service:* ${form.service}`:'',form.budget?`*Budget:* ${form.budget}`:'',form.message?`*Message:* ${form.message}`:''].filter(Boolean).join('\n')
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank')
    setSent(true)
  }

  const inp = { background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:'10px', padding:'.7rem 1rem', fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'.9rem', color:'var(--text)', outline:'none', width:'100%', transition:'border-color .2s' }
  const focus = e => e.target.style.borderColor = 'var(--purple)'
  const blur  = e => e.target.style.borderColor = 'var(--border2)'

  return (
    <>
      <style>{`
        .contact-header { padding-top:4rem; padding-bottom:3rem; }
        .contact-layout { display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:start; }
        .contact-info p { color:var(--text2); line-height:1.8; margin-bottom:2.5rem; }
        .contact-meta { display:flex; flex-direction:column; gap:1rem; margin-bottom:2.5rem; }
        .meta-row { display:flex; align-items:center; gap:1rem; }
        .meta-icon-wrap { width:42px; height:42px; border-radius:10px; background:var(--purple-glow2); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; }
        .meta-text strong { display:block; font-size:.88rem; font-weight:500; margin-bottom:.15rem; }
        .meta-text span { font-size:.8rem; color:var(--text2); }
        .social-row { display:flex; gap:.75rem; margin-top:.5rem; }
        .social-btn { width:40px; height:40px; border-radius:10px; background:var(--surface); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; font-size:1rem; transition:background .2s,border-color .2s,transform .2s; text-decoration:none; }
        .social-btn:hover { background:var(--purple-glow); border-color:var(--border); transform:translateY(-2px); }
        .contact-card { background:var(--surface); border:1px solid var(--border2); border-radius:22px; padding:2.5rem; position:sticky; top:calc(32px + var(--nav-h) + 2rem); }
        .contact-card-title { font-family:'Outfit',sans-serif; font-size:1.25rem; font-weight:700; margin-bottom:.4rem; }
        .contact-card-sub { font-size:.855rem; color:var(--text2); margin-bottom:2rem; line-height:1.6; }
        .wa-primary-btn { display:flex; align-items:center; justify-content:center; gap:.75rem; width:100%; padding:1.1rem; background:var(--whatsapp); color:#fff; border-radius:14px; font-size:1rem; font-weight:600; text-decoration:none; transition:filter .2s,transform .2s,box-shadow .2s; margin-bottom:1.2rem; }
        .wa-primary-btn:hover { filter:brightness(1.08); transform:translateY(-2px); box-shadow:0 12px 36px rgba(37,211,102,.3); }
        .or-divider { display:flex; align-items:center; gap:1rem; margin-bottom:1.2rem; color:var(--text3); font-size:.8rem; }
        .or-divider::before,.or-divider::after { content:''; flex:1; height:1px; background:var(--border2); }
        .enquiry-form { display:flex; flex-direction:column; gap:.85rem; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:.75rem; }
        .form-field { display:flex; flex-direction:column; gap:.4rem; }
        .form-field label { font-size:.75rem; color:var(--text3); letter-spacing:.06em; text-transform:uppercase; }
        .submit-btn { width:100%; padding:.9rem; background:var(--purple); color:#fff; border-radius:12px; font-size:.95rem; font-weight:500; cursor:pointer; border:none; transition:background .2s,transform .15s,box-shadow .2s; font-family:'Plus Jakarta Sans',sans-serif; }
        .submit-btn:hover { background:var(--purple-light); transform:translateY(-1px); box-shadow:0 8px 24px rgba(124,92,191,.35); }
        .form-success { text-align:center; padding:2rem; }
        .success-icon { font-size:3rem; margin-bottom:1rem; }
        .success-text { font-family:'Outfit',sans-serif; font-size:1.1rem; font-weight:700; margin-bottom:.4rem; }
        .success-sub { font-size:.875rem; color:var(--text2); }
        .mini-testi-section { margin-top:4rem; }
        .mini-testi-title { font-family:'Outfit',sans-serif; font-size:1.2rem; font-weight:700; margin-bottom:1.5rem; }
        .mini-testi-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .mini-testi-card { background:var(--surface); border:1px solid var(--border2); border-radius:14px; padding:1.3rem; }
        .mini-stars { color:var(--purple-light); font-size:.75rem; margin-bottom:.6rem; letter-spacing:2px; }
        .mini-quote { font-size:.83rem; color:var(--text2); line-height:1.6; margin-bottom:.8rem; font-style:italic; }
        .mini-author { display:flex; align-items:center; gap:.6rem; }
        .mini-avatar { width:28px; height:28px; border-radius:50%; background:var(--purple-glow); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:.65rem; font-weight:700; color:var(--purple-light); font-family:'Outfit',sans-serif; flex-shrink:0; }
        .mini-name { font-size:.8rem; font-weight:500; }
        .mini-role { font-size:.72rem; color:var(--text3); }
        .location-card { background:var(--surface); border:1px solid var(--border2); border-radius:18px; overflow:hidden; margin-top:3rem; }
        .location-map { height:180px; background:linear-gradient(135deg,var(--bg3),var(--surface2)); display:flex; align-items:center; justify-content:center; color:var(--text3); font-size:2.5rem; position:relative; }
        .location-map::after { content:'Jakarta, Indonesia'; position:absolute; bottom:1rem; font-size:.78rem; font-family:'Plus Jakarta Sans',sans-serif; color:var(--text3); letter-spacing:.06em; }
        .location-info { padding:1.3rem 1.5rem; display:flex; align-items:center; gap:1rem; }
        .location-info strong { display:block; font-size:.9rem; font-weight:500; }
        .location-info span { font-size:.8rem; color:var(--text2); }
        @media(max-width:900px){.contact-layout{grid-template-columns:1fr;gap:3rem}.contact-card{position:static}.mini-testi-grid{grid-template-columns:1fr}}
        @media(max-width:600px){.form-row{grid-template-columns:1fr}}
      `}</style>

      <div className="page-section contact-header">
        <span className="section-label reveal">{ct.label}</span>
        <h1 className="section-title reveal" style={{ fontSize:'clamp(2.5rem,6vw,5rem)', maxWidth:'600px' }}>
          {ct.title1} <span style={{ color:'var(--purple-light)' }}>{ct.title2}</span>
        </h1>
      </div>

      <div className="page-section" style={{ paddingTop:0 }}>
        <div className="contact-layout">
          <div className="contact-info reveal">
            <p>{ct.intro}</p>
            <div className="contact-meta">
              {ct.meta.map(m => (
                <div key={m.label} className="meta-row">
                  <div className="meta-icon-wrap">{m.icon}</div>
                  <div className="meta-text"><strong>{m.label}</strong><span>{m.value}</span></div>
                </div>
              ))}
            </div>
            <div className="social-row">
              {[['https://instagram.com/websitestudio.id','📸'],['https://tiktok.com/@websitestudio.id','🎵'],['https://linkedin.com/company/websitestudio-id','💼'],[`https://wa.me/${WA_NUMBER}`,'💬']].map(([href,icon]) => (
                <a key={icon} href={href} target="_blank" rel="noopener noreferrer" className="social-btn">{icon}</a>
              ))}
            </div>
            <div className="mini-testi-section">
              <h3 className="mini-testi-title">{ct.testiTitle}</h3>
              <div className="mini-testi-grid">
                {TESTIMONIALS.map(t2 => (
                  <div key={t2.name} className="mini-testi-card">
                    <div className="mini-stars">{t2.stars}</div>
                    <p className="mini-quote">{t2.quote}</p>
                    <div className="mini-author">
                      <div className="mini-avatar">{t2.initials}</div>
                      <div><div className="mini-name">{t2.name}</div><div className="mini-role">{t2.role}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-card reveal reveal-d2">
            <h2 className="contact-card-title">{ct.cardTitle}</h2>
            <p className="contact-card-sub">{ct.cardSub}</p>
            <a href={`https://wa.me/${WA_NUMBER}?text=Hi%20websitestudio.id!`} target="_blank" rel="noopener noreferrer" className="wa-primary-btn">
              <svg viewBox="0 0 24 24" style={{ width:'22px',height:'22px',fill:'white',flexShrink:0 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L0 24l6.334-1.51A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.846 0-3.574-.476-5.083-1.308l-.364-.214-3.77.899.934-3.671-.237-.38A9.947 9.947 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              {ct.waBtn}
            </a>
            <div className="or-divider">{ct.orDivider}</div>

            {sent ? (
              <div className="form-success">
                <div className="success-icon">🎉</div>
                <div className="success-text">{ct.successTitle}</div>
                <p className="success-sub">{ct.successSub}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
                <div className="form-row">
                  <div className="form-field">
                    <label>{ct.fields.name}</label>
                    <input style={inp} type="text" placeholder={ct.fields.namePh} required value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} onFocus={focus} onBlur={blur} />
                  </div>
                  <div className="form-field">
                    <label>{ct.fields.email}</label>
                    <input style={inp} type="email" placeholder={ct.fields.emailPh} value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} onFocus={focus} onBlur={blur} />
                  </div>
                </div>
                <div className="form-field">
                  <label>{ct.fields.service}</label>
                  <select style={{...inp,appearance:'none',cursor:'pointer'}} value={form.service} onChange={e => setForm(f=>({...f,service:e.target.value}))} onFocus={focus} onBlur={blur}>
                    <option value="">{ct.fields.servicePh}</option>
                    {ct.services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>{ct.fields.budget}</label>
                  <select style={{...inp,appearance:'none',cursor:'pointer'}} value={form.budget} onChange={e => setForm(f=>({...f,budget:e.target.value}))} onFocus={focus} onBlur={blur}>
                    <option value="">{ct.fields.budgetPh}</option>
                    {ct.budgets.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>{ct.fields.message}</label>
                  <textarea style={{...inp,resize:'vertical',minHeight:'90px'}} rows={4} placeholder={ct.fields.messagePh} value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} onFocus={focus} onBlur={blur} />
                </div>
                <button type="submit" className="submit-btn">{ct.submitBtn}</button>
              </form>
            )}
          </div>
        </div>

        <div className="location-card reveal" style={{ marginTop:'4rem' }}>
          <div className="location-map">📍</div>
          <div className="location-info">
            <span style={{ fontSize:'1.3rem' }}>🏙️</span>
            <div><strong>websitestudio.id</strong><span>{ct.locationLabel}</span></div>
          </div>
        </div>
      </div>
    </>
  )
}