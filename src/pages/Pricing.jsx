import { useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../components/useReveal'
import { useLang } from '../components/LangContext.jsx'

const WA_NUMBER = '6281234567890'
const WA_MSGS = [
  'Hi!%20I%27m%20interested%20in%20the%20Landing%20Page%20package.',
  'Hi!%20I%27m%20interested%20in%20the%20Company%20Website%20package.',
  "Hi!%20I'm%20interested%20in%20a%20custom%20web%20platform.%20Let's%20talk!",
]
const PRICES_MONTHLY = ['2,5jt','7,5jt','Custom']
const PRICES_ANNUAL  = ['2jt','6jt','Custom']

function CheckIcon() {
  return (
    <span style={{ width:'16px',height:'16px',borderRadius:'50%',background:'rgba(124,92,191,.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px' }}>
      <svg viewBox="0 0 12 12" style={{ width:'9px',height:'9px',stroke:'var(--purple-light)',fill:'none',strokeWidth:2.5 }}><polyline points="2,6 5,9 10,3"/></svg>
    </span>
  )
}

export default function Pricing() {
  useReveal()
  const { t } = useLang()
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const pr = t.pricing

  return (
    <>
      <style>{`
        .pricing-header { padding-top:calc(96px + env(safe-area-inset-top) + 4rem); padding-bottom:3rem; text-align:center; }
        .billing-toggle { display:inline-flex; align-items:center; gap:1rem; background:var(--surface); border:1px solid var(--border2); border-radius:100px; padding:.4rem .6rem .4rem 1.2rem; margin-bottom:3.5rem; font-size:.85rem; color:var(--text2); cursor:pointer; user-select:none; }
        .toggle-track { position:relative; width:44px; height:24px; background:var(--surface2); border:1px solid var(--border2); border-radius:100px; transition:background .25s; flex-shrink:0; }
        .toggle-track.on { background:var(--purple); border-color:var(--purple); }
        .toggle-thumb { position:absolute; width:16px; height:16px; border-radius:50%; background:var(--text3); top:3px; left:3px; transition:transform .25s,background .25s; }
        .toggle-thumb.on { transform:translateX(20px); background:#fff; }
        .save-badge { background:rgba(124,92,191,.15); color:var(--purple-light); font-size:.7rem; padding:.2rem .65rem; border-radius:100px; letter-spacing:.06em; }
        .pricing-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; max-width:1080px; margin:0 auto; align-items:start; }
        .price-card { background:var(--surface); border:1px solid var(--border2); border-radius:22px; padding:2.2rem; position:relative; transition:transform .3s,border-color .3s,box-shadow .3s; }
        .price-card:hover { transform:translateY(-5px); }
        .price-card.featured { border-color:var(--purple-dim); background:linear-gradient(145deg,var(--surface),rgba(124,92,191,.08)); box-shadow:0 0 60px rgba(124,92,191,.12),0 0 0 1px var(--purple-dim); }
        .featured-badge { position:absolute; top:-1px; left:50%; transform:translateX(-50%); background:var(--purple); color:#fff; font-size:.68rem; padding:.28rem 1rem; border-radius:0 0 10px 10px; letter-spacing:.08em; text-transform:uppercase; font-weight:500; white-space:nowrap; }
        .price-tier { font-size:.7rem; color:var(--purple-light); letter-spacing:.12em; text-transform:uppercase; margin-bottom:.7rem; }
        .price-name { font-family:'Outfit',sans-serif; font-size:1.5rem; font-weight:800; margin-bottom:.6rem; letter-spacing:-.02em; }
        .price-amount { display:flex; align-items:baseline; gap:.3rem; margin-bottom:.3rem; }
        .price-currency { font-family:'Outfit',sans-serif; font-size:1rem; font-weight:600; color:var(--text2); }
        .price-number { font-family:'Outfit',sans-serif; font-size:2.8rem; font-weight:800; line-height:1; letter-spacing:-.03em; }
        .price-period { font-size:.82rem; color:var(--text3); margin-bottom:1.5rem; }
        .price-divider { height:1px; background:var(--border2); margin-bottom:1.5rem; }
        .price-features { display:flex; flex-direction:column; gap:.75rem; margin-bottom:2rem; }
        .price-features li { display:flex; align-items:flex-start; gap:.65rem; font-size:.88rem; color:var(--text2); line-height:1.4; }
        .price-btn { display:block; width:100%; padding:.9rem; border-radius:100px; font-size:.9rem; font-weight:500; text-align:center; border:1px solid var(--border2); color:var(--text); background:transparent; transition:background .2s,border-color .2s,color .2s,transform .15s,box-shadow .2s; cursor:pointer; text-decoration:none; }
        .price-btn:hover { background:var(--purple); border-color:var(--purple); color:#fff; transform:translateY(-1px); box-shadow:0 8px 24px rgba(124,92,191,.3); }
        .price-card.featured .price-btn { background:var(--purple); border-color:var(--purple); color:#fff; }
        .guarantee-banner { max-width:1080px; margin:3.5rem auto 0; background:linear-gradient(135deg,rgba(124,92,191,.1),rgba(124,92,191,.04)); border:1px solid var(--border); border-radius:18px; padding:2.5rem 3rem; display:flex; align-items:center; gap:2rem; flex-wrap:wrap; }
        .guarantee-icon { font-size:3rem; flex-shrink:0; }
        .guarantee-text h3 { font-family:'Outfit',sans-serif; font-size:1.2rem; font-weight:700; margin-bottom:.4rem; }
        .guarantee-text p { font-size:.88rem; color:var(--text2); line-height:1.65; max-width:500px; }
        .addons-section { max-width:1080px; margin:4rem auto 0; }
        .addons-title { font-family:'Outfit',sans-serif; font-size:1.2rem; font-weight:700; margin-bottom:1.5rem; }
        .addons-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; }
        .addon-card { background:var(--surface); border:1px solid var(--border2); border-radius:14px; padding:1.3rem; transition:border-color .2s,transform .2s; }
        .addon-card:hover { border-color:var(--border); transform:translateY(-3px); }
        .addon-icon { font-size:1.4rem; margin-bottom:.7rem; }
        .addon-name { font-family:'Outfit',sans-serif; font-size:.9rem; font-weight:700; margin-bottom:.3rem; }
        .addon-price { font-size:.78rem; color:var(--purple-light); font-weight:500; margin-bottom:.5rem; }
        .addon-desc { font-size:.78rem; color:var(--text2); line-height:1.5; }
        .faq-section { max-width:700px; margin:5rem auto 0; }
        .faq-title { font-family:'Outfit',sans-serif; font-size:1.6rem; font-weight:800; margin-bottom:1.5rem; text-align:center; }
        .faq-item { border-bottom:1px solid var(--border2); overflow:hidden; }
        .faq-question { display:flex; justify-content:space-between; align-items:center; padding:1.2rem 0; cursor:pointer; font-size:.95rem; font-weight:500; gap:1rem; transition:color .2s; background:none; border:none; color:var(--text); width:100%; text-align:left; font-family:'Plus Jakarta Sans',sans-serif; }
        .faq-question:hover { color:var(--purple-light); }
        .faq-icon { flex-shrink:0; width:22px; height:22px; border-radius:50%; border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; font-size:.85rem; transition:transform .3s,background .2s; }
        .faq-icon.open { transform:rotate(45deg); background:var(--purple-glow); border-color:var(--border); }
        .faq-answer { max-height:0; overflow:hidden; transition:max-height .4s ease; }
        .faq-answer.open { max-height:200px; }
        .faq-answer-inner { padding-bottom:1.2rem; font-size:.88rem; color:var(--text2); line-height:1.75; }
        @media(max-width:900px){.pricing-grid{grid-template-columns:1fr;max-width:440px}.addons-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:600px){.addons-grid{grid-template-columns:1fr}.guarantee-banner{padding:1.8rem}}
      `}</style>

      <div className="page-section pricing-header">
        <span className="section-label reveal">{pr.label}</span>
        <h1 className="section-title reveal" style={{ fontSize:'clamp(2.5rem,6vw,5rem)' }}>{pr.title}</h1>
        <p className="section-sub reveal" style={{ marginLeft:'auto', marginRight:'auto', textAlign:'center' }}>{pr.sub}</p>
        <div className="billing-toggle reveal reveal-d1" onClick={() => setAnnual(a => !a)}>
          <span>{pr.toggle1}</span>
          <div className={`toggle-track${annual ? ' on' : ''}`}><div className={`toggle-thumb${annual ? ' on' : ''}`} /></div>
          <span>{pr.toggle2} <span className="save-badge" style={{ opacity: annual ? 1 : 0.4 }}>{pr.save}</span></span>
        </div>
      </div>

      <div className="page-section" style={{ paddingTop:0 }}>
        <div className="pricing-grid">
          {pr.plans.map((plan, i) => (
            <div key={plan.tier} className={`price-card reveal reveal-d${i + 1}${i === 1 ? ' featured' : ''}`}>
              {i === 1 && <div className="featured-badge">Most Popular</div>}
              <div className="price-tier">{plan.tier}</div>
              <div className="price-name">{plan.name}</div>
              <div className="price-amount">
                {PRICES_MONTHLY[i] !== 'Custom' && <span className="price-currency">Rp</span>}
                <span className="price-number">{annual ? PRICES_ANNUAL[i] : PRICES_MONTHLY[i]}</span>
              </div>
              <div className="price-period">{plan.period}</div>
              <div className="price-divider" />
              <ul className="price-features">
                {plan.features.map(f => <li key={f}><CheckIcon />{f}</li>)}
              </ul>
              <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MSGS[i]}`} target="_blank" rel="noopener noreferrer" className="price-btn">{plan.btn}</a>
            </div>
          ))}
        </div>

        <div className="guarantee-banner reveal">
          <div className="guarantee-icon">🛡️</div>
          <div className="guarantee-text">
            <h3>{pr.guarantee.title}</h3>
            <p>{pr.guarantee.desc}</p>
          </div>
        </div>

        <div className="addons-section reveal">
          <h2 className="addons-title">{pr.addonsTitle}</h2>
          <div className="addons-grid">
            {pr.addons.map(a => (
              <div key={a.name} className="addon-card">
                <div className="addon-icon">{a.icon}</div>
                <div className="addon-name">{a.name}</div>
                <div className="addon-price">{a.price}</div>
                <div className="addon-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="faq-section reveal">
          <h2 className="faq-title">{pr.faqTitle}</h2>
          {pr.faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span className={`faq-icon${openFaq === i ? ' open' : ''}`}>+</span>
              </button>
              <div className={`faq-answer${openFaq === i ? ' open' : ''}`}>
                <div className="faq-answer-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', marginTop:'4rem', paddingTop:'4rem', borderTop:'1px solid var(--border2)' }} className="reveal">
          <p style={{ color:'var(--text2)', marginBottom:'.5rem' }}>{pr.ctaSub1}</p>
          <p style={{ color:'var(--text3)', fontSize:'.875rem', marginBottom:'1.8rem' }}>{pr.ctaSub2}</p>
          <a href={`https://wa.me/${WA_NUMBER}?text=Hi!%20I%20need%20help%20choosing%20a%20package.`} target="_blank" rel="noopener noreferrer" className="wa-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L0 24l6.334-1.51A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.846 0-3.574-.476-5.083-1.308l-.364-.214-3.77.899.934-3.671-.237-.38A9.947 9.947 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            {pr.ctaBtn}
          </a>
        </div>
      </div>
    </>
  )
}