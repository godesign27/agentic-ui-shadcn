import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PromptDrawer } from '@/components/prompt-library/PromptDrawer'
import { Command, Home, Palette } from 'lucide-react'
import { Copy, Check } from 'lucide-react'

// Default color scales (will be replaced by brand setup)
const defaultColors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
}

function ColorSwatch({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-2">
      <div
        className="w-full h-16 rounded-md border shadow-sm cursor-pointer hover:scale-105 transition-transform"
        style={{ backgroundColor: value }}
        onClick={handleCopy}
        title="Click to copy"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">{label}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </button>
      </div>
      <p className="text-xs font-mono text-muted-foreground">{value}</p>
    </div>
  )
}

function ColorScale({ name, colors }: { name: string; colors: Record<string, string> }) {
  const scaleSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{name} Scale</CardTitle>
        <CardDescription>Color scale from 50 (lightest) to 900 (darkest)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
          {scaleSteps.map((step) => (
            <ColorSwatch
              key={step}
              value={colors[step] || '#000000'}
              label={step}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function BrandPreviewPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Brand Preview</h1>
            <p className="text-muted-foreground mt-1">
              Preview your brand color scales and usage examples
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setDrawerOpen(true)}>
              <Command className="h-4 w-4 mr-2" />
              Prompt Library
            </Button>
            <Button variant="outline" onClick={() => navigate('/ui-kit')}>
              <Palette className="h-4 w-4 mr-2" />
              UI Kit
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" />
              Back Home
            </Button>
          </div>
        </div>

        {/* Color Scales */}
        <div className="space-y-6 mb-8">
          <ColorScale name="Primary" colors={defaultColors.primary} />
        </div>

        {/* Usage Examples */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Usage Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges & Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  Primary Badge
                </div>
                <div className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium ml-2">
                  Secondary Badge
                </div>
                <div className="pt-2">
                  <a href="#" className="text-primary hover:underline">
                    Primary Link
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backgrounds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-4 bg-primary text-primary-foreground rounded-md">
                    Primary Background
                  </div>
                  <div className="p-4 bg-secondary text-secondary-foreground rounded-md">
                    Secondary Background
                  </div>
                  <div className="p-4 bg-muted text-muted-foreground rounded-md">
                    Muted Background
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Borders & Dividers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-4 border-2 border-primary rounded-md">
                    Primary Border
                  </div>
                  <div className="p-4 border-2 border-secondary rounded-md">
                    Secondary Border
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-md">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Run the "Brand Setup" prompt from the Prompt Library to generate
            custom color scales for your brand. The scales will be saved to CSS variables and
            automatically applied throughout the application.
          </p>
        </div>
      </div>

      <PromptDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}

