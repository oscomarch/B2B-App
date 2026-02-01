"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  CheckCircle,
  Circle,
  Trash2,
  GripVertical,
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  order: number
  dueDate: Date | null
}

interface TasksListProps {
  projectId: string
  tasks: Task[]
}

export function TasksList({ projectId, tasks }: TasksListProps) {
  const router = useRouter()
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${projectId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          order: tasks.length,
        }),
      })
      if (!res.ok) throw new Error("Failed to add task")
      setFormData({ title: "", description: "" })
      setShowAddForm(false)
      router.refresh()
    } catch (error) {
      console.error("Error adding task:", error)
      alert("Failed to add task")
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed"
    try {
      const res = await fetch(`/api/projects/${projectId}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("Failed to update")
      router.refresh()
    } catch (error) {
      console.error("Error updating task:", error)
      alert("Failed to update task")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/tasks/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete")
      router.refresh()
    } catch (error) {
      console.error("Error deleting task:", error)
      alert("Failed to delete task")
    }
  }

  return (
    <div className="space-y-2">
      {tasks.length === 0 && !showAddForm ? (
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/60 text-center">
          <CheckCircle className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
          <p className="text-[13px] text-neutral-400">No internal tasks yet</p>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/60">
          <div className="space-y-1">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-neutral-50 transition-colors ${
                  task.status === "completed" ? "opacity-60" : ""
                }`}
              >
                <button
                  onClick={() => handleToggle(task.id, task.status)}
                  className="mt-0.5 flex-shrink-0"
                >
                  {task.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-neutral-300 hover:text-neutral-400" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] ${
                    task.status === "completed"
                      ? "text-neutral-400 line-through"
                      : "text-neutral-900"
                  }`}>
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
                      {task.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded text-neutral-300 hover:text-red-500 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddForm ? (
        <form onSubmit={handleAdd} className="p-4 rounded-2xl bg-white border border-neutral-200/60">
          <div className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Task title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                autoFocus
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B82C4]/20 focus:border-[#3B82C4]"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3B82C4]/20 focus:border-[#3B82C4]"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 rounded-lg text-[12px] font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.title}
                className="flex-1 py-2 rounded-lg text-[12px] font-medium text-white disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #3B82C4 0%, #9B7BAA 50%, #C5A882 100%)" }}
              >
                {loading ? "Adding..." : "Add Task"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-neutral-200 text-[13px] font-medium text-neutral-400 hover:border-neutral-300 hover:text-neutral-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      )}
    </div>
  )
}
