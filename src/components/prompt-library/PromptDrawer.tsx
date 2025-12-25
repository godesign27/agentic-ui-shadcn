import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { fetchPromptsIndex, fetchPromptContent, type Prompt } from './promptIndex'
import { usePromptHotkeys } from './usePromptHotkeys'

interface PromptDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PromptDrawer({ open, onOpenChange }: PromptDrawerProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [promptContent, setPromptContent] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  usePromptHotkeys(() => onOpenChange(!open), open)

  useEffect(() => {
    if (open && prompts.length === 0) {
      fetchPromptsIndex()
        .then((data) => setPrompts(data.prompts))
        .catch((err) => console.error('Failed to load prompts:', err))
    }
  }, [open, prompts.length])

  useEffect(() => {
    if (selectedPrompt) {
      setLoading(true)
      fetchPromptContent(selectedPrompt.file)
        .then((content) => {
          setPromptContent(content)
          setLoading(false)
        })
        .catch((err) => {
          console.error('Failed to load prompt content:', err)
          setLoading(false)
        })
    }
  }, [selectedPrompt])

  const handlePromptClick = (prompt: Prompt) => {
    setSelectedPrompt(prompt)
    setCopied(false)
  }

  const handleBack = () => {
    setSelectedPrompt(null)
    setPromptContent('')
    setCopied(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      // Only handle ESC in detail view to go back to list
      // Radix Sheet will handle ESC to close when in list view
      if (e.key === 'Escape' && open && selectedPrompt) {
        e.preventDefault()
        handleBack()
      }
    }

    if (open && selectedPrompt) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [open, selectedPrompt])

  const groupedPrompts = prompts.reduce((acc, prompt) => {
    if (!acc[prompt.category]) {
      acc[prompt.category] = []
    }
    acc[prompt.category].push(prompt)
    return acc
  }, {} as Record<string, Prompt[]>)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle>Prompt Library</SheetTitle>
          <SheetDescription>
            Browse and copy prompts for agentic AI workflows
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          {selectedPrompt ? (
            <div className="space-y-4 pb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Library
              </Button>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{selectedPrompt.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedPrompt.description}
                </p>
              </div>

              <Separator />

              <div className="relative">
                {loading ? (
                  <div className="text-sm text-muted-foreground">Loading...</div>
                ) : (
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap font-mono">
                    {promptContent}
                  </pre>
                )}
              </div>

              <div className="sticky bottom-0 bg-background pt-4 border-t">
                <Button
                  onClick={handleCopy}
                  className="w-full"
                  variant={copied ? 'secondary' : 'default'}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Prompt
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pb-6">
              {Object.entries(groupedPrompts).map(([category, categoryPrompts]) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {categoryPrompts.map((prompt) => (
                      <Card
                        key={prompt.id}
                        className="cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => handlePromptClick(prompt)}
                      >
                        <CardHeader>
                          <CardTitle className="text-base">{prompt.title}</CardTitle>
                          <CardDescription>{prompt.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

