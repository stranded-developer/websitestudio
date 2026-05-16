import { useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../components/useReveal'
import { useLang } from '../components/LangContext.jsx'

const WA_NUMBER = '6281234567890'

function Modal({ project, onClose, t }) {
  if (!project) return null
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position:'fixed',inset:0,background:'rgba(0,0,0,.88)',backdropFilter:'blur(10px)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',animation:'fadeIn .3s ease' }}>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes scaleIn{from{transform:scale(.96)}to{transform:scale(1)}}`}</style>
      <div style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'22px',padding:'2rem',maxWidth:'920px',width:'90vw',position:'relative',animation:'scaleIn .3s ease' }}>
        <button onClick={onClose} style={{ position:'absolute',top:'1rem',right:'1rem',width:'36px',height:'36px',borderRadius:'50%',background:'var(--surface2)',border:'1px solid var(--border2)',color:'var(--text2)',fontSize:'1.1rem',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer' }}>✕</button>
        <div style={{ marginBottom:'1.2rem' }}>
          <div style={{ fontSize:'.68rem',color:'var(--purple-light)',letterSpacing:'.09em',textTransform:'uppercase',marginBottom:'.3rem' }}>{project.category}</div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:'1.4rem',fontWeight:700 }}>{project.name}</h2>
        </div>
        <div style={{ width:'100%',aspectRatio:'16/9',background:'var(--bg3)',borderRadius:'14px',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center' }}>
          {project.video
            ? <video
                src={project.video}
                controls
                autoPlay
                style={{ width:'100%',height:'100%',objectFit:'cover' }}
              />
            : <div style={{ textAlign:'center',padding:'3rem',color:'var(--text3)' }}>
                <div style={{ fontSize:'3.5rem',marginBottom:'1rem' }}>🎬</div>
                <p style={{ fontSize:'.875rem',lineHeight:1.6 }}>{t.work.upload}</p>
              </div>
          }
        </div>
        <div style={{ marginTop:'1.2rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem' }}>
          <div style={{ display:'flex',gap:'.5rem',flexWrap:'wrap' }}>
            {project.tags.map(tag => <span key={tag} style={{ background:'var(--purple-glow2)',border:'1px solid var(--border)',borderRadius:'100px',padding:'.28rem .8rem',fontSize:'.72rem',color:'var(--purple-light)' }}>{tag}</span>)}
          </div>
          <Link to="/contact" className="btn-primary" style={{ fontSize:'.85rem',padding:'.65rem 1.4rem' }}>{t.work.modalBtn}</Link>
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  useReveal()
  const { t } = useLang()
  const [filter, setFilter] = useState('all')
  const [modal, setModal] = useState(null)

  const visible = t.work.projects.filter(p => filter === 'all' || p.category === filter)

  return (
    <>
      <style>{`
        .work-header { padding-top:4rem; padding-bottom:3rem; }
        .filter-bar { display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:3rem; }
        .filter-btn { padding:.45rem 1.1rem; border-radius:100px; border:1px solid var(--border2); background:transparent; color:var(--text2); font-size:.8rem; letter-spacing:.04em; text-transform:uppercase; transition:all .2s; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; }
        .filter-btn:hover { border-color:var(--border); color:var(--text); }
        .filter-btn.active { background:var(--purple); border-color:var(--purple); color:#fff; }
        .work-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
        .work-card { background:var(--surface); border:1px solid var(--border2); border-radius:18px; overflow:hidden; cursor:pointer; transition:transform .35s cubic-bezier(.22,.61,.36,1),border-color .3s,box-shadow .35s; }
        .work-card:hover { transform:translateY(-8px); border-color:var(--border); box-shadow:0 24px 60px rgba(0,0,0,.5),0 0 0 1px var(--purple-dim); }
        .card-thumb { aspect-ratio:16/10; background:var(--bg3); position:relative; overflow:hidden; }
        .card-thumb.featured-thumb { aspect-ratio:21/9; }
        .thumb-placeholder { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.8rem; background:linear-gradient(135deg,var(--bg3),var(--surface2)); }
        .thumb-icon { width:52px; height:52px; border-radius:14px; background:var(--purple-glow); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:1.5rem; }
        .thumb-label { font-size:.7rem; color:var(--text3); letter-spacing:.08em; text-transform:uppercase; }
        .card-overlay { position:absolute; inset:0; background:rgba(74,53,128,.15); backdrop-filter:blur(2px); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .3s; }
        .work-card:hover .card-overlay { opacity:1; }
        .overlay-play { width:52px; height:52px; border-radius:50%; background:var(--purple); display:flex; align-items:center; justify-content:center; }
        .overlay-play svg { width:20px; height:20px; fill:#fff; margin-left:3px; }
        .card-info { padding:1.25rem 1.4rem; }
        .card-tag { font-size:.68rem; color:var(--purple-light); letter-spacing:.09em; text-transform:uppercase; margin-bottom:.35rem; }
        .card-name { font-family:'Outfit',sans-serif; font-size:1.05rem; font-weight:700; margin-bottom:.3rem; }
        .card-desc { font-size:.855rem; color:var(--text2); line-height:1.55; }
        .work-card.featured { grid-column:span 2; }
        @media(max-width:900px){.work-grid{grid-template-columns:1fr 1fr}.work-card.featured{grid-column:span 2}}
        @media(max-width:600px){.work-grid{grid-template-columns:1fr}.work-card.featured{grid-column:span 1}.card-thumb.featured-thumb{aspect-ratio:16/10}}
      `}</style>

      <div className="page-section work-header">
        <span className="section-label reveal">{t.work.label}</span>
        <h1 className="section-title reveal" style={{ fontSize:'clamp(2.5rem,6vw,5rem)', maxWidth:'700px' }}>
          {t.work.title1}<br /><span style={{ color:'var(--purple-light)' }}>{t.work.title2}</span>
        </h1>
        <p className="section-sub reveal">{t.work.sub}</p>

        <div className="filter-bar reveal reveal-d1">
          {t.work.filters.map(([key, label]) => (
            <button key={key} className={`filter-btn${filter === key ? ' active' : ''}`} onClick={() => setFilter(key)}>{label}</button>
          ))}
        </div>

        <div className="work-grid">
          {visible.map((p, i) => (
            <article key={p.name} className={`work-card reveal${p.featured ? ' featured' : ''} reveal-d${(i % 3) + 1}`} onClick={() => setModal(p)}>
              <div className={`card-thumb${p.featured ? ' featured-thumb' : ''}`}>
                {p.video
                  ? <video
                      src={p.video}
                      muted
                      autoPlay
                      loop
                      playsInline
                      style={{ width:'100%',height:'100%',objectFit:'cover' }}
                    />
                  : <div className="thumb-placeholder">
                      <div className="thumb-icon">{p.icon}</div>
                      <span className="thumb-label">{t.work.upload}</span>
                    </div>
                }
                <div className="card-overlay">
                  <div className="overlay-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div>
                </div>
              </div>
              <div className="card-info">
                <div className="card-tag">{p.category}{p.featured ? ' · Featured' : ''}</div>
                <div className="card-name">{p.name}</div>
                <div className="card-desc">{p.desc}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal" style={{ textAlign:'center', marginTop:'4rem', paddingTop:'4rem', borderTop:'1px solid var(--border2)' }}>
          <p style={{ color:'var(--text2)', marginBottom:'1.5rem', fontSize:'1.05rem' }}>{t.work.cta}</p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi websitestudio.id! 👋 Saya melihat portofolio kalian dan ingin diskusi proyek.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ background:'var(--whatsapp)' }}
          >
            {t.work.btn2}
          </a>
        </div>
      </div>

      <Modal project={modal} onClose={() => setModal(null)} t={t} />
    </>
  )
}