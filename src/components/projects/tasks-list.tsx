"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  order: number
  completedAt: Date | null
}

interface TasksListProps {
  projectId: string
  tasks: Task[]
}

export function TasksList({ projectId, tasks }: TasksListProps) {
  const router = useRouter()
  const [newTask, setNewTask] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddTask = async () => {
    if (!newTask.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${projectId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      })

      if (!res.ok) throw new Error("Failed to add task")

      setNewTask("")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to add task")
    } finally {
      setLoading(false)
    }
  }

  const handleToggleTask = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed"

    try {
      const res = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!res.ok) throw new Error("Failed to update task")

      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to update task")
    }
  }

  const completedCount = tasks.filter((t) => t.status === "completed").length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Internal Checklist</CardTitle>
            <CardDescription>
              {completedCount} of {tasks.length} tasks completed
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                task.status === "completed"
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200 hover:border-gray-300"
              )}
            >
              <Checkbox
                checked={task.status === "completed"}
                onCheckedChange={() => handleToggleTask(task.id, task.status)}
              />
              <span
                className={cn(
                  "flex-1",
                  task.status === "completed" && "line-through text-gray-400"
                )}
              >
                {task.title}
              </span>
              {task.status === "completed" && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
          ))}
        </div>

        {/* Add new task */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask()
              }
            }}
          />
          <Button onClick={handleAddTask} disabled={loading || !newTask.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
