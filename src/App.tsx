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

function App() {
  const [data, setData] = useState<{projects: Project[], tasks: Task[]} | null>(null)

  useEffect(() => {
    // In a real scenario, this would fetch from the Cloudflare tunnel API
    // For now, we'll mock the data from our internal state until the tunnel is fully wired
    fetch('https://src-addresses-attractive-delivers.trycloudflare.com/tasks')
      .then(res => res.json())
      .then(tasks => {
         // Mocking project structure for the UI update
         setData({
            projects: [
              { name: 'EchoVault', status: 'Active', progress: 100, description: 'NeuralCortex 2.0 (Search Complete)' },
              { name: 'GhostOS', status: 'In Progress', progress: 80, description: 'Meta-Kernel & Agent Autonomy' },
              { name: 'Aetheria', status: 'Active', progress: 20, description: 'Reality Orchestration Engine' },
              { name: 'Cells-Kanban', status: 'In Progress', progress: 75, description: 'Visual Command Center' }
            ],
            tasks: tasks
         })
      })
      .catch(() => {
        // Fallback for visual demonstration
        setData({
          projects: [
            { name: 'EchoVault', status: 'Active', progress: 100, description: 'NeuralCortex 2.0 (Search Complete)' },
            { name: 'GhostOS', status: 'In Progress', progress: 80, description: 'Meta-Kernel & Agent Autonomy' },
            { name: 'Aetheria', status: 'Active', progress: 20, description: 'Reality Orchestration Engine' },
            { name: 'Cells-Kanban', status: 'In Progress', progress: 75, description: 'Visual Command Center' }
          ],
          tasks: []
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
        <div className="text-right text-[10px] text-green-500/50 font-mono uppercase tracking-tighter">
          System_Status: Operational<br/>
          Heartbeat: 300s_Interval
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        {data.projects.map(project => (
          <div key={project.name} className="bg-white/5 border border-white/10 p-4 rounded-sm hover:border-cyan-500/30 transition-all">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-sm font-bold text-white/90">{project.name}</h2>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${project.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-cyan-500/10 text-cyan-500'}`}>
                {project.status}
              </span>
            </div>
            <p className="text-[10px] text-white/40 mb-4 h-8 leading-tight">{project.description}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-600 transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">{project.progress}%</span>
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
              {data.tasks.length === 0 ? (
                <div className="text-[10px] text-white/10 italic">No tasks in stream...</div>
              ) : (
                data.tasks.map(task => (
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
