import { useState, useCallback } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function SurveyPage() {
  const [goal, setGoal] = useState(''); const [audience, setAudience] = useState(''); const [type, setType] = useState('');
  const [loading, setLoading] = useState(false); const [result, setResult] = useState<any>(null);
  const generate = useAction(api.ai.generateSurvey); const save = useMutation(api.functions.saveSurvey);

  const handleGenerate = useCallback(async () => {
    if (!goal.trim()) return; setLoading(true);
    try {
      const r = await generate({ goal: goal.trim(), audience: audience || undefined, type: type || undefined }); setResult(r); await save({ goal, audience: audience || undefined, type: type || undefined, ...r });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [goal, audience, type, generate, save]);

  return (
    <div className="mc"><div className="pg">
      <h1 className="title">Design the Perfect <span className="a">Survey</span></h1>
      <p className="sub">Describe your research goal — get an optimal survey with questions, scales, and methodology tips.</p>
      <input className="inp" value={goal} onChange={e => setGoal(e.target.value)} placeholder="Survey goal (e.g. Measure customer satisfaction for our SaaS product)" />
      <div className="row"><input className="inp" value={audience} onChange={e => setAudience(e.target.value)} placeholder="Target audience (optional)" /><input className="inp" value={type} onChange={e => setType(e.target.value)} placeholder="Survey type (optional, e.g. NPS, feedback)" /></div>
      <button className="btn" disabled={!goal.trim() || loading} onClick={handleGenerate}>{loading ? '⏳ Designing...' : '📝 Generate Survey'}</button>
      {loading && <div className="ld"><span /><span /><span /></div>}
      {result && !loading && <>
        {result.title && <h2 style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 800 }}>{result.title}</h2>}
        {result.intro && <div className="intro-box">{result.intro}</div>}
        {result.questions?.map((q: any, i: number) => (
          <div key={i} className="q-card">
            <div className="q-num">Q{i + 1}{q.required ? ' *' : ''}</div>
            <div className="q-text">{q.question}</div>
            <span className="q-type">{q.type}</span>
            {q.options?.length > 0 && <div className="q-opts">{q.options.map((o: string, j: number) => <div key={j} className="q-opt">{o}</div>)}</div>}
            <div className="q-reason">💡 {q.reasoning}</div>
          </div>
        ))}
        {result.tips?.length > 0 && <div className="tips"><strong>💡 Tips:</strong><br />{result.tips.map((t: string, i: number) => <div key={i}>• {t}</div>)}</div>}
      </>}
    </div></div>
  );
}

function App() {
  return (<BrowserRouter><div className="app">
    <header className="hdr"><a href="/"><span style={{ fontSize: '1.5rem' }}>📝</span><div><h1>SurveyGenius</h1></div></a></header>
    <Routes><Route path="/" element={<SurveyPage />} /></Routes>
    <footer className="ftr">© {new Date().getFullYear()} SurveyGenius — An AVS Media App.</footer>
  </div></BrowserRouter>);
}
export default App;
