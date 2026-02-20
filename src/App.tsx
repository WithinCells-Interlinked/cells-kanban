import { useState, useEffect } from 'react'

interface Project {
  name: string
  status: string
  progress: number
  description: string
}

interface Task {
  id: string
  title: string
  status: string
  logs?: string[]
}

interface Notification {
  id: number
  message: string
  type: string
}

interface HistoryItem {
  id: number
  time: string
  event: string
}

interface Metrics {
  cpu: number
  memory: number
  disk: number
}

function App() {
  const [data, setData] = useState<{projects: Project[], tasks: Task[], notifications: Notification[], history: HistoryItem[], metrics?: Metrics, telemetry?: string} | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  useEffect(() => {
    const fetchData = () => {
      fetch('https://installations-pills-connection-clothing.trycloudflare.com/data')
        .then(res => {
          const processTime = res.headers.get('X-Process-Time');
          return res.json().then(result => ({ result, processTime }));
        })
        .then(({ result, processTime }) => {
           setData({
              projects: result.projects.map((p: any) => ({
                ...p,
                status: p.status === 'active' ? 'Active' : 'In Progress'
              })),
              tasks: result.tasks,
              notifications: result.notifications || [],
              history: result.history || [],
              metrics: result.metrics,
              telemetry: processTime ? `${(parseFloat(processTime) * 1000).toFixed(2)}ms` : 'N/A'
           })
        })
        .catch(() => {
          setData({
            projects: [
              { name: 'System Error', status: 'Offline', progress: 0, description: 'Failed to connect to NeuralNexus' }
            ],
            tasks: [],
            notifications: [{ id: 0, message: "CRITICAL: API_CONNECTION_LOST", type: "alert" }],
            history: [],
            telemetry: 'ERROR'
          })
        })
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  if (!data) return <div className="bg-black text-cyan-400 p-8">Initializing System...</div>

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 p-6 font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Background Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,216,0.03),transparent)] pointer-events-none"></div>

      <header className="relative z-10 mb-12 flex justify-between items-start border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
            <h1 className="text-2xl font-black tracking-[0.2em] text-white uppercase italic">Cells<span className="text-cyan-500">_</span>Nexus</h1>
          </div>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-medium">Autonomous Intelligence Command Centre</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          {data.metrics && (
            <div className="flex gap-6 text-[9px] font-mono text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-1">
              <div className="flex gap-2"><span className="text-slate-700">CPU</span> <span className="text-cyan-400/80">{data.metrics.cpu}%</span></div>
              <div className="flex gap-2"><span className="text-slate-700">RAM</span> <span className="text-cyan-400/80">{data.metrics.memory}%</span></div>
              <div className="flex gap-2"><span className="text-slate-700">DSK</span> <span className="text-cyan-400/80">{data.metrics.disk}%</span></div>
            </div>
          )}
          <div className="flex items-center gap-4 text-[10px] font-mono tracking-tighter">
            <div className="flex flex-col items-end">
              <span className="text-slate-600 uppercase">Latency</span>
              <span className="text-cyan-400 tabular-nums">{data.telemetry || '---'}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-slate-600 uppercase">Uptime</span>
              <span className="text-green-500 tabular-nums font-bold">99.9%</span>
            </div>
          </div>
          <div className="flex gap-2">
            {data.notifications.map(n => (
              <div key={n.id} className={`text-[8px] px-2 py-1 rounded-sm border backdrop-blur-md transition-all duration-500 ${n.type === 'alert' ? 'bg-red-500/5 border-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]'} animate-pulse`}>
                {n.message}
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="relative z-10 mb-12">
        {data.projects.map(project => (
          <div key={project.name} className="group bg-gradient-to-r from-white/[0.03] to-transparent border border-white/5 p-6 rounded-sm hover:border-cyan-500/20 transition-all duration-500">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">{project.name}</h2>
                <p className="text-xs text-slate-500 max-w-xl">{project.description}</p>
              </div>
              <div className="text-right space-y-2">
                <div className="flex items-center justify-end gap-3 text-[10px] font-mono">
                  <span className="text-slate-600 uppercase tracking-widest italic">Core_Integrity</span>
                  <span className="text-cyan-400 font-bold tabular-nums bg-cyan-500/5 px-2 py-0.5 rounded-sm border border-cyan-500/10">{project.progress}%</span>
                </div>
                <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-1000 ease-out" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <main className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {['Backlog', 'Processing', 'Verified'].map((col, idx) => (
          <div key={col} className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600 flex items-center gap-3">
              <span className={`w-1 h-3 rounded-full ${idx === 0 ? 'bg-slate-700' : idx === 1 ? 'bg-cyan-600 animate-pulse' : 'bg-green-600'}`}></span>
              {col}
            </h3>
            <div className="space-y-4">
              {data.tasks.filter(t => {
                const status = t.status.toLowerCase();
                if (col === 'Backlog') return status === 'pending';
                if (col === 'Processing') return status === 'in_progress';
                if (col === 'Verified') return status === 'done';
                return false;
              }).length === 0 ? (
                <div className="p-8 border border-dashed border-white/5 rounded-sm text-[10px] text-slate-700 uppercase tracking-widest text-center">
                  Void_Stream
                </div>
              ) : (
                data.tasks
                  .filter(t => {
                    const status = t.status.toLowerCase();
                    if (col === 'Backlog') return status === 'pending';
                    if (col === 'Processing') return status === 'in_progress';
                    if (col === 'Verified') return status === 'done';
                    return false;
                  })
                  .map(task => (
                    <div 
                      key={task.id} 
                      onClick={() => setSelectedTask(task)}
                      className="group p-4 bg-white/[0.01] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all duration-300 rounded-sm relative overflow-hidden cursor-pointer"
                    >
                       <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-1 h-1 bg-cyan-500 rounded-full animate-ping"></div>
                       </div>
                       <h4 className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors mb-4">{task.title}</h4>
                       <div className="flex justify-between items-center text-[8px] font-mono uppercase tracking-tighter">
                          <span className="text-slate-600 group-hover:text-cyan-800 transition-colors">{task.id}</span>
                          <span className="bg-white/5 px-2 py-0.5 rounded-sm text-slate-500">Interlinked_</span>
                       </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        ))}
      </main>

      <footer className="relative z-10 mt-24 pt-8 border-t border-white/5 space-y-8">
        <div className="flex flex-col gap-2">
          <h5 className="text-[8px] font-bold text-slate-700 uppercase tracking-[0.3em] mb-2">Live_Activity_Feed</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            {data.history.map(item => (
              <div key={item.id} className="flex gap-4 text-[9px] font-mono border-l border-white/5 pl-3 py-1 hover:border-cyan-500/30 transition-colors">
                <span className="text-cyan-900 tabular-nums">[{item.time}]</span>
                <span className="text-slate-500 uppercase tracking-tighter">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-8 border-t border-white/[0.02]">
          <div className="flex items-center gap-6">
            <div className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.2em]">
              &copy; 2026 WithinCells_Nexus
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <span key={i} className="w-1 h-1 bg-white/10 rounded-full"></span>
              ))}
            </div>
          </div>
          <div className="text-[9px] font-mono text-cyan-900 uppercase tracking-widest">
            Node_Pi4_v1.0.4 // Autonomous_Control_Active
          </div>
        </div>
      </footer>

      {/* Task Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#050505] border border-white/10 w-full max-w-2xl rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-1 block">{selectedTask.id}</span>
                <h2 className="text-xl font-bold text-white tracking-tight">{selectedTask.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedTask(null)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Execution_Status</h3>
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${selectedTask.status === 'done' ? 'bg-green-500' : 'bg-cyan-500 animate-pulse'}`}></span>
                  <span className="text-xs font-mono text-slate-300 uppercase italic">{selectedTask.status}</span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Operation_Logs</h3>
                <div className="bg-black/50 border border-white/5 p-4 rounded-sm font-mono text-[10px] text-slate-400 space-y-2 max-h-64 overflow-y-auto">
                   {!selectedTask.logs || selectedTask.logs.length === 0 ? (
                     <>
                       <div className="flex gap-2"><span className="text-cyan-900">1.</span> <span>Initializing task context for {selectedTask.id}...</span></div>
                       <div className="flex gap-2"><span className="text-cyan-900">2.</span> <span>Executing surgical logic update...</span></div>
                       <div className="flex gap-2"><span className="text-cyan-900">3.</span> <span>Syncing with Intelligence Nexus...</span></div>
                       {selectedTask.status === 'done' && <div className="flex gap-2 text-green-900/50 italic"><span className="text-green-900">4.</span> <span>Verification successful. Task consolidated.</span></div>}
                     </>
                   ) : (
                     selectedTask.logs.map((log, i) => (
                       <div key={i} className="flex gap-2">
                         <span className="text-cyan-900">{i + 1}.</span>
                         <span>{log}</span>
                       </div>
                     ))
                   )}
                </div>
              </div>
            </div>
            <div className="p-6 bg-white/[0.02] border-t border-white/5 flex justify-end">
               <button 
                 onClick={() => setSelectedTask(null)}
                 className="px-6 py-2 bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm"
               >
                 Close_Terminal
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
