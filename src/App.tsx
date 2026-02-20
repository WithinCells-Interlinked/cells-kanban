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
}

interface Notification {
  id: number
  message: string
  type: string
}

function App() {
  const [data, setData] = useState<{projects: Project[], tasks: Task[], notifications: Notification[]} | null>(null)

  useEffect(() => {
    fetch('https://src-addresses-attractive-delivers.trycloudflare.com/data')
      .then(res => res.json())
      .then(result => {
         setData({
            projects: result.projects.map((p: any) => ({
              ...p,
              status: p.status === 'active' ? 'Active' : 'In Progress'
            })),
            tasks: result.tasks,
            notifications: result.notifications || []
         })
      })
      .catch(() => {
        // Fallback for visual demonstration
        setData({
          projects: [
            { name: 'System Error', status: 'Offline', progress: 0, description: 'Failed to connect to NeuralNexus' }
          ],
          tasks: [],
          notifications: [{ id: 0, message: "CRITICAL: API_CONNECTION_LOST", type: "alert" }]
        })
      })
  }, [])

  if (!data) return <div className="bg-black text-cyan-400 p-8">Initializing System...</div>

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans selection:bg-cyan-500/30">
      <header className="mb-10 flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-cyan-500 uppercase">Cells_Intelligence_Nexus</h1>
          <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">Autonomous Project Orchestration v1.0</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-right text-[10px] text-green-500/50 font-mono uppercase tracking-tighter">
            System_Status: Operational<br/>
            Heartbeat: 300s_Interval
          </div>
          {data.notifications.map(n => (
            <div key={n.id} className={`text-[9px] px-2 py-1 rounded-sm border ${n.type === 'alert' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'} animate-pulse`}>
              {n.message}
            </div>
          ))}
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 mb-10">
        {data.projects.map(project => (
          <div key={project.name} className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-cyan-500/30 transition-all flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-white/90">{project.name}</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 animate-pulse">
                  SYSTEM_ACTIVE
                </span>
              </div>
              <p className="text-xs text-white/40 leading-tight">{project.description}</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-cyan-400 mb-2 uppercase tracking-widest">Efficiency_Index: {project.progress}%</div>
              <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-600 transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Backlog', 'Processing', 'Verified'].map(col => (
          <div key={col} className="bg-white/[0.02] p-4 rounded-sm border border-white/5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-pulse"></span>
              {col}
            </h3>
            <div className="space-y-3">
              {data.tasks.filter(t => {
                const status = t.status.toLowerCase();
                if (col === 'Backlog') return status === 'pending';
                if (col === 'Processing') return status === 'in_progress';
                if (col === 'Verified') return status === 'done';
                return false;
              }).length === 0 ? (
                <div className="text-[10px] text-white/10 italic">No tasks in stream...</div>
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
                    <div key={task.id} className="p-3 bg-black border border-white/10 hover:border-cyan-500/40 transition-colors group relative">
                       <h4 className="text-[11px] font-medium text-white/70 group-hover:text-cyan-400">{task.title}</h4>
                       <div className="mt-3 flex justify-between items-center text-[8px] font-mono text-white/20 uppercase">
                          <span>{task.id}</span>
                          <span className="text-cyan-900 group-hover:text-cyan-700 transition-colors">Interlinked_</span>
                       </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        ))}
      </main>

      <footer className="mt-20 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/20 uppercase tracking-widest">
        <span>&copy; 2026 WithinCells_Interlinked</span>
        <span>Pi-Node_04 // Vercel_Overflow_Pivot</span>
      </footer>
    </div>
  )
}

export default App
