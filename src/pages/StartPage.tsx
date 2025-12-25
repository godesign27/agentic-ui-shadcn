import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PromptDrawer } from '@/components/prompt-library/PromptDrawer'
import { Command } from 'lucide-react'

export default function StartPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">Hello World</h1>
        <p className="text-xl text-muted-foreground">
          Prompt Library installed. Use <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">Cmd/Ctrl+L</kbd> or <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">Cmd/Ctrl+K</kbd>.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button
            size="lg"
            onClick={() => setDrawerOpen(true)}
            className="gap-2"
          >
            <Command className="h-4 w-4" />
            Open Prompt Library
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/ui-kit')}
          >
            UI Kit
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/brand-preview')}
          >
            Brand Preview
          </Button>
        </div>
      </div>

      <PromptDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}

