import { useState } from 'react'

function App() {
  const [tasks] = useState([
    { id: 1, title: 'Identity Rebrand', status: 'Done' },
    { id: 2, title: 'Stateful Heartbeat', status: 'Done' },
    { id: 3, title: 'Kanban Scaffold', status: 'In Progress' },
  ])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
      <header className="mb-12 border-b border-white/10 pb-6">
        <h1 className="text-4xl font-bold tracking-tighter text-cyan-400">CELLS_COMMAND</h1>
        <p className="text-white/50 mt-2">Autonomous Agency Portfolio & Task Orchestrator</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Backlog', 'In Progress', 'Completed'].map((column) => (
          <div key={column} className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-6 text-white/40">{column}</h2>
            <div className="space-y-4">
              {tasks
                .filter(t => (column === 'In Progress' && t.status === 'In Progress') || (column === 'Completed' && t.status === 'Done'))
                .map(task => (
                  <div key={task.id} className="p-4 bg-black border border-white/10 rounded hover:border-cyan-500/50 transition-colors cursor-pointer group">
                    <h3 className="font-medium group-hover:text-cyan-400 transition-colors">{task.title}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-white/60">ID: {task.id}</span>
                      <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${task.status === 'Done' ? 'bg-green-500' : 'bg-cyan-500'} w-full`}></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </main>

      <footer className="mt-12 text-[10px] text-white/20 uppercase tracking-[0.2em]">
        System Status: Operational // Cells Agency v1.0.0
      </footer>
    </div>
  )
}

export default App
