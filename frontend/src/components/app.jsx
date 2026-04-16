import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import RingLoader from 'react-spinners/RingLoader';
import { History, Menu, Sparkles, Trash2, X } from 'lucide-react';
import axios from 'axios';

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'rust', label: 'Rust' },
  { value: 'dart', label: 'Dart' },
  { value: 'scala', label: 'Scala' },
  { value: 'perl', label: 'Perl' },
  { value: 'haskell', label: 'Haskell' },
  { value: 'elixir', label: 'Elixir' },
  { value: 'r', label: 'R' },
  { value: 'matlab', label: 'MATLAB' },
  { value: 'bash', label: 'Bash' }
];

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: state.isFocused ? 'rgba(34,211,238,0.45)' : 'rgba(255,255,255,0.10)',
    boxShadow: 'none',
    paddingInline: 6,
    ':hover': {
      borderColor: 'rgba(34,211,238,0.35)'
    }
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#0c1018',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 18,
    overflow: 'hidden'
  }),
  singleValue: (base) => ({
    ...base,
    color: '#f4f4f5'
  }),
  placeholder: (base) => ({
    ...base,
    color: '#71717a'
  }),
  input: (base) => ({
    ...base,
    color: '#f4f4f5'
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? 'rgba(34,211,238,0.12)' : '#0c1018',
    color: '#f4f4f5',
    cursor: 'pointer'
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#a1a1aa'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  })
};

const actionButtonClassName =
  'inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-zinc-100 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.08]';

const App = () => {
  const [selectedOption, setSelectedOption] = useState(languageOptions[0]);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [activeHistory, setActiveHistory] = useState(null);

  const ai = new GoogleGenAI({ apiKey: 'AIzaSyB2FHtttxAnkIYIVhkYNAGzaX2B6LLTswg' });

  async function fetchHistory() {
    setHistoryLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/ai/code-reviewer/review/history');
      const items = res.data?.data || [];
      setHistoryItems(items);
      setActiveHistory(items[0] || null);
    } catch (error) {
      console.error('Error fetching review history:', error);
    } finally {
      setHistoryLoading(false);
    }
  }

  function toggleHistory() {
    setShowHistory((current) => {
      const next = !current;
      if (next) {
        fetchHistory();
      }
      return next;
    });
  }

  async function reviewCode() {
    setResponse('');
    setLoading(true);

    try {
      const aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I'm sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following:

1. Code Quality :- Ensuring clean, maintainable, and well-structured code.
2. Best Practices :- Suggesting industry-standard coding practices.
3. Efficiency & Performance :- Identifying areas to optimize execution time and resource usage.
4. Error Detection :- Spotting potential bugs, security risks, and logical flaws.
5. Scalability :- Advising on how to make code adaptable for future growth.
6. Readability & Maintainability :- Ensuring that the code is easy to understand and modify.

Analyze it like a senior developer reviewing a pull request.

Code: ${code}
`
      });

      const generatedResponse = aiResponse.text || '';
      setResponse(generatedResponse);

      await axios.post('http://localhost:8000/ai/code-reviewer/review/save', {
        language: selectedOption.value,
        code,
        response: generatedResponse
      });

      if (showHistory) {
        fetchHistory();
      }
    } catch (error) {
      console.error('Error generating or saving review:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-0 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-[12%] h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_32%),linear-gradient(180deg,rgba(9,12,18,0.98),rgba(4,6,12,0.98))] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.4)] sm:p-8">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm font-medium text-cyan-100">
                <Sparkles size={15} />
                Smart Review Studio
              </div>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Review code inside a darker, cleaner workspace
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
                Drop in source code, choose the language, and get a structured senior-style review focused on quality,
                performance, and maintainability.
              </p>
            </div>

            <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">Session controls</p>
                <History size={18} className="text-cyan-200" />
              </div>
              <p className="text-sm text-zinc-400">
                Use history to revisit saved reviews, clear the editor for a fresh pass, or run a new analysis when
                your snippet is ready.
              </p>
              <div className="grid gap-2 text-sm text-zinc-300 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">Dark editor</div>
                <div className="rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">History drawer</div>
                <div className="rounded-2xl border border-white/10 bg-[#080b12] px-4 py-3">Live markdown</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[15px] border border-white/10 bg-[#090d15]/95 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-4 border-b border-white/10 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Editor</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Code Input</h2>
                </div>

                <div className="w-full lg:max-w-xs">
                  <Select value={selectedOption} onChange={setSelectedOption} options={languageOptions} styles={selectStyles} />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={toggleHistory} title="Review history" className={actionButtonClassName}>
                  {showHistory ? <X size={16} /> : <Menu size={16} />}
                  {showHistory ? 'Close history' : 'Open history'}
                </button>
                <button
                  onClick={() => {
                    setCode('');
                    setResponse('');
                  }}
                  className={actionButtonClassName}
                >
                  <Trash2 size={16} />
                  Clear
                </button>
                <button
                  onClick={() => {
                    if (code === '') {
                      alert('Please enter code first');
                    } else {
                      reviewCode();
                    }
                  }}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  <Sparkles size={16} />
                  Review code
                </button>
              </div>
            </div>

            <div className="h-[520px]">
              <Editor
                height="100%"
                theme="vs-dark"
                language={selectedOption.value}
                value={code}
                onChange={(value) => {
                  setCode(value || '');
                }}
              />
            </div>
          </div>

          <div className="flex h-[675px] flex-col overflow-hidden rounded-[15px] border border-white/10 bg-[#080b12]/95 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Review Output</p>
                <h2 className="mt-2 text-xl font-semibold text-white">AI Response</h2>
              </div>
              {loading && <RingLoader color="#67e8f9" size={12} />}
            </div>

            <div className="h-full overflow-y-auto p-5">
              {response ? (
                <div className="markdown-body">
                  <Markdown>{response}</Markdown>
                </div>
              ) : (
                <div className="flex h-full min-h-[260px] items-center justify-center rounded-[20px] border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
                  <div className="max-w-md">
                    <p className="text-lg font-semibold text-white">No review yet</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      Choose a language, paste your code into the editor, and run a review to see the response here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {showHistory && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md" onClick={() => setShowHistory(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-5xl border-l border-white/10 bg-[#06080f] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">History</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Saved Reviews</h3>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid h-[calc(100%-81px)] grid-cols-1 md:grid-cols-[320px_1fr]">
              <div className="overflow-y-auto border-r border-white/10 p-4">
                {historyLoading ? (
                  <p className="text-sm text-zinc-400">Loading history...</p>
                ) : historyItems.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">
                    No saved reviews yet. Generate one to see it here.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {historyItems.map((item) => (
                      <button
                        key={item._id}
                        onClick={() => setActiveHistory(item)}
                        className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                          activeHistory?._id === item._id
                            ? 'border-cyan-400/35 bg-cyan-400/[0.08]'
                            : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-white">{item.language || 'unknown'}</span>
                          <span className="text-[11px] uppercase tracking-wider text-zinc-500">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Just now'}
                          </span>
                        </div>
                        <p className="mt-2 max-h-16 overflow-hidden whitespace-pre-wrap break-words text-xs leading-5 text-zinc-400">
                          {item.code}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="overflow-y-auto p-6">
                {activeHistory ? (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Selected review</p>
                        <h4 className="mt-2 text-2xl font-semibold text-white">
                          {activeHistory.language || 'Code review'}
                        </h4>
                      </div>
                      <p className="text-sm text-zinc-500">
                        {activeHistory.createdAt ? new Date(activeHistory.createdAt).toLocaleString() : ''}
                      </p>
                    </div>

                    <div>
                      <p className="mb-3 text-sm font-medium text-zinc-300">Code</p>
                      <pre className="overflow-x-auto whitespace-pre-wrap rounded-3xl border border-white/10 bg-[#05070d] p-4 text-sm text-zinc-100">
                        {activeHistory.code}
                      </pre>
                    </div>

                    <div>
                      <p className="mb-3 text-sm font-medium text-zinc-300">Response</p>
                      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="markdown-body">
                          <Markdown>{activeHistory.response}</Markdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-6 text-sm text-zinc-400">
                    Select a saved review to inspect its code and response.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
