import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Calendar } from '@/components/ui/calendar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { AIAvatar, BotAvatar } from '@/components/ai/ai-avatar'
import { AIButton } from '@/components/ai/ai-button'
import { AIAction } from '@/components/ai/ai-action'
import { AISoftSurface } from '@/components/ai/ai-soft-surface'
import { AIConfidenceRiskBadge } from '@/components/ai/ai-confidence-risk-badge'
import { AIWhyThisLink } from '@/components/ai/ai-why-this-link'
import { AIMessageHeader } from '@/components/ai/ai-message-header'
import { AIMessageBody } from '@/components/ai/ai-message-body'
import { AIMessageFooter } from '@/components/ai/ai-message-footer'
import { AIFeedbackBar } from '@/components/ai/ai-feedback-bar'
import { AILoadingIndicator } from '@/components/ai/ai-loading-indicators'
import { AIProgress } from '@/components/ai/ai-progress'
import { AIAgentWorkNote } from '@/components/ai/ai-agent-work-note'
import { AIControlBar } from '@/components/ai/ai-control-bar'
import { AILauncher } from '@/components/ai/ai-launcher'
import { AIAgentStack } from '@/components/ai/ai-agent-stack'
import { AIQueueBadge } from '@/components/ai/ai-queue-badge'
import { AIChipBrief } from '@/components/ai/ai-chip-brief'
import { AIChipHandoff } from '@/components/ai/ai-chip-handoff'
import { AIChipMemory } from '@/components/ai/ai-chip-memory'
import { AIChipQuick } from '@/components/ai/ai-chip-quick'
import { AIDialogButton } from '@/components/ai/ai-dialog-button'
import { AITextLink } from '@/components/ai/ai-text-link'
import { AIIcon } from '@/components/ai/ai-icon'
import { AIInputCard, AIDialogSlim } from '@/components/ai/ai-dialog'
import { AIResponse } from '@/components/ai/ai-response'
import { AIApprovalCard } from '@/components/ai/ai-approval-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Command as CommandRoot, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { FormField } from '@/components/patterns/form-field'
import { PageContainer } from '@/components/layout/page-container'
import { PromptDrawer } from '@/components/prompt-library/PromptDrawer'
import { Command, Home, Palette, Copy, Check, Bold, Italic, Underline, ChevronDown, Info, AlertCircle } from 'lucide-react'

interface ComponentInfo {
  id: string
  name: string
  category: string
  description: string
  importPath: string
  variants?: string[]
  /**
   * Present only on ai:* components. Declares how much autonomy the component
   * grants the machine and what accountability it owes in return — the thing
   * you most need to know before reaching for one.
   * Source: design-system/components/ai/{name}/{name}.agent.json
   */
  experience?: { mode: string; behavior: string; accountability: string }
  examples?: Array<{
    name: string
    component: React.ReactNode
  }>
}

const components: ComponentInfo[] = [
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Layout',
    description: 'Collapsible content sections',
    importPath: '@/components/ui/accordion',
    examples: [
      {
        name: 'Basic Accordion',
        component: (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>Yes. It comes with default styles that matches the other components.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>Yes. It's animated by default, but you can disable it if you prefer.</AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
      },
    ],
  },
  {
    id: 'alert',
    name: 'Alert',
    category: 'Feedback',
    description: 'Display important messages to users',
    importPath: '@/components/ui/alert',
    variants: ['default', 'destructive'],
    examples: [
      {
        name: 'Default Alert',
        component: (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the cli.</AlertDescription>
          </Alert>
        ),
      },
      {
        name: 'Destructive',
        component: (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
          </Alert>
        ),
      },
    ],
  },
  {
    id: 'alert-dialog',
    name: 'Alert Dialog',
    category: 'Overlay',
    description: 'Modal dialog that interrupts the user with important content',
    importPath: '@/components/ui/alert-dialog',
    examples: [
      {
        name: 'Basic Alert Dialog',
        component: (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Alert</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
      },
    ],
  },
  {
    id: 'aspect-ratio',
    name: 'Aspect Ratio',
    category: 'Layout',
    description: 'Maintain consistent aspect ratios',
    importPath: '@/components/ui/aspect-ratio',
    examples: [
      {
        name: '16:9 Ratio',
        component: (
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center">
            <span className="text-sm text-muted-foreground">16:9 Aspect Ratio</span>
          </AspectRatio>
        ),
      },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'Data Display',
    description: 'User profile picture or placeholder',
    importPath: '@/components/ui/avatar',
    examples: [
      {
        name: 'With Fallback',
        component: (
          <div className="flex gap-2">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
          </div>
        ),
      },
    ],
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'Data Display',
    description: 'Display badges for status or labels',
    importPath: '@/components/ui/badge',
    variants: ['default', 'secondary', 'destructive', 'outline'],
    examples: [
      {
        name: 'Variants',
        component: (
          <div className="flex gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        ),
      },
    ],
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Navigation',
    description: 'Navigation breadcrumbs',
    importPath: '@/components/ui/breadcrumb',
    examples: [
      {
        name: 'Basic Breadcrumb',
        component: (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
      },
    ],
  },
  {
    id: 'button',
    name: 'Button',
    category: 'Forms',
    description: 'Trigger actions with various styles and sizes',
    importPath: '@/components/ui/button',
    variants: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    examples: [
      {
        name: 'Variants',
        component: (
          <div className="flex gap-2 flex-wrap">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        ),
      },
      {
        name: 'Sizes',
        component: (
          <div className="flex gap-2 items-center flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        ),
      },
    ],
  },
  {
    id: 'calendar',
    name: 'Calendar',
    category: 'Forms',
    description: 'Date picker calendar component',
    importPath: '@/components/ui/calendar',
    examples: [
      {
        name: 'Basic Calendar',
        component: <Calendar mode="single" className="rounded-md border" />,
      },
    ],
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Layout',
    description: 'Container for grouping related content',
    importPath: '@/components/ui/card',
    examples: [
      {
        name: 'Basic Card',
        component: (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">This is the card content area where you can place any content.</p>
            </CardContent>
          </Card>
        ),
      },
    ],
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Forms',
    description: 'Select multiple options from a list',
    importPath: '@/components/ui/checkbox',
    examples: [
      {
        name: 'With Labels',
        component: (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms1" />
              <Label htmlFor="terms1">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
              <Label htmlFor="terms2">Subscribe to newsletter</Label>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'collapsible',
    name: 'Collapsible',
    category: 'Layout',
    description: 'Expandable and collapsible content',
    importPath: '@/components/ui/collapsible',
    examples: [
      {
        name: 'Basic Collapsible',
        component: (
          <Collapsible className="w-full space-y-2">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Can I use this in my project?
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-3 text-sm">
                Yes. Free to use for personal and commercial projects. No attribution required.
              </div>
            </CollapsibleContent>
          </Collapsible>
        ),
      },
    ],
  },
  {
    id: 'context-menu',
    name: 'Context Menu',
    category: 'Overlay',
    description: 'Right-click context menu',
    importPath: '@/components/ui/context-menu',
    examples: [
      {
        name: 'Right Click Me',
        component: (
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ),
      },
    ],
  },
  {
    id: 'dialog',
    name: 'Dialog',
    category: 'Overlay',
    description: 'Modal dialog window',
    importPath: '@/components/ui/dialog',
    examples: [
      {
        name: 'Basic Dialog',
        component: (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ),
      },
    ],
  },
  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Overlay',
    description: 'Dropdown menu with actions',
    importPath: '@/components/ui/dropdown-menu',
    examples: [
      {
        name: 'Basic Dropdown',
        component: (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Open Menu <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
  },
  {
    id: 'hover-card',
    name: 'Hover Card',
    category: 'Overlay',
    description: 'Show content on hover',
    importPath: '@/components/ui/hover-card',
    examples: [
      {
        name: 'Hover Me',
        component: (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@shadcn</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@shadcn</h4>
                <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ),
      },
    ],
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Forms',
    description: 'Text input field with validation states',
    importPath: '@/components/ui/input',
    examples: [
      {
        name: 'Basic Input',
        component: <Input placeholder="Enter text..." />,
      },
      {
        name: 'With Label',
        component: (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'label',
    name: 'Label',
    category: 'Forms',
    description: 'Accessible labels for form controls',
    importPath: '@/components/ui/label',
    examples: [
      {
        name: 'Basic Label',
        component: (
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter username" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'menubar',
    name: 'Menubar',
    category: 'Navigation',
    description: 'Application menubar',
    importPath: '@/components/ui/menubar',
    examples: [
      {
        name: 'Basic Menubar',
        component: (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ),
      },
    ],
  },
  {
    id: 'popover',
    name: 'Popover',
    category: 'Overlay',
    description: 'Display floating content',
    importPath: '@/components/ui/popover',
    examples: [
      {
        name: 'Basic Popover',
        component: (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
            </PopoverContent>
          </Popover>
        ),
      },
    ],
  },
  {
    id: 'progress',
    name: 'Progress',
    category: 'Feedback',
    description: 'Show progress of an operation',
    importPath: '@/components/ui/progress',
    examples: [
      {
        name: 'Progress Values',
        component: (
          <div className="space-y-4 w-full">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>33%</span>
              </div>
              <Progress value={33} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>66%</span>
              </div>
              <Progress value={66} />
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'radio-group',
    name: 'Radio Group',
    category: 'Forms',
    description: 'Select a single option from multiple choices',
    importPath: '@/components/ui/radio-group',
    examples: [
      {
        name: 'Basic Radio Group',
        component: (
          <RadioGroup defaultValue="option1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="r2" />
              <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="r3" />
              <Label htmlFor="r3">Compact</Label>
            </div>
          </RadioGroup>
        ),
      },
    ],
  },
  {
    id: 'scroll-area',
    name: 'Scroll Area',
    category: 'Layout',
    description: 'Custom scrollable container',
    importPath: '@/components/ui/scroll-area',
    examples: [
      {
        name: 'Scrollable List',
        component: (
          <ScrollArea className="h-32 w-full border rounded-md p-4">
            <div className="space-y-2">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="text-sm">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        ),
      },
    ],
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Forms',
    description: 'Dropdown select menu',
    importPath: '@/components/ui/select',
    examples: [
      {
        name: 'Basic Select',
        component: (
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
    ],
  },
  {
    id: 'separator',
    name: 'Separator',
    category: 'Layout',
    description: 'Visual divider between content',
    importPath: '@/components/ui/separator',
    examples: [
      {
        name: 'Horizontal Separator',
        component: (
          <div className="space-y-2">
            <div className="text-sm">Content above</div>
            <Separator />
            <div className="text-sm">Content below</div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'sheet',
    name: 'Sheet',
    category: 'Overlay',
    description: 'Slide-out panel from screen edge',
    importPath: '@/components/ui/sheet',
    examples: [
      {
        name: 'Side Sheet',
        component: (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>Make changes to your profile here.</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter name" />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ),
      },
    ],
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'Feedback',
    description: 'Loading placeholder for content',
    importPath: '@/components/ui/skeleton',
    examples: [
      {
        name: 'Loading State',
        component: (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'Forms',
    description: 'Input for selecting a value from a range',
    importPath: '@/components/ui/slider',
    examples: [
      {
        name: 'Basic Slider',
        component: (
          <div className="space-y-4 w-full">
            <Slider defaultValue={[50]} max={100} step={1} />
            <Slider defaultValue={[25, 75]} max={100} step={1} />
          </div>
        ),
      },
    ],
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'Forms',
    description: 'Toggle switch for binary options',
    importPath: '@/components/ui/switch',
    examples: [
      {
        name: 'With Labels',
        component: (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="airplane" />
              <Label htmlFor="airplane">Airplane Mode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="bluetooth" />
              <Label htmlFor="bluetooth">Bluetooth</Label>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'table',
    name: 'Table',
    category: 'Data Display',
    description: 'Display data in rows and columns',
    importPath: '@/components/ui/table',
    examples: [
      {
        name: 'Basic Table',
        component: (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>User</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
      },
    ],
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Organize content into tabbed sections',
    importPath: '@/components/ui/tabs',
    examples: [
      {
        name: 'Basic Tabs',
        component: (
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <p className="text-sm text-muted-foreground">Make changes to your account here.</p>
            </TabsContent>
            <TabsContent value="password">
              <p className="text-sm text-muted-foreground">Change your password here.</p>
            </TabsContent>
          </Tabs>
        ),
      },
    ],
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Forms',
    description: 'Multi-line text input',
    importPath: '@/components/ui/textarea',
    examples: [
      {
        name: 'Basic Textarea',
        component: (
          <div className="space-y-2">
            <Label htmlFor="message">Your message</Label>
            <Textarea id="message" placeholder="Type your message here..." />
          </div>
        ),
      },
    ],
  },
  {
    id: 'toggle',
    name: 'Toggle',
    category: 'Forms',
    description: 'Two-state button',
    importPath: '@/components/ui/toggle',
    examples: [
      {
        name: 'Text Formatting',
        component: (
          <div className="flex gap-2">
            <Toggle aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </Toggle>
          </div>
        ),
      },
    ],
  },
  {
    id: 'toggle-group',
    name: 'Toggle Group',
    category: 'Forms',
    description: 'Group of toggle buttons',
    importPath: '@/components/ui/toggle-group',
    examples: [
      {
        name: 'Text Formatting Group',
        component: (
          <ToggleGroup type="multiple">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        ),
      },
    ],
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Overlay',
    description: 'Show helpful information on hover',
    importPath: '@/components/ui/tooltip',
    examples: [
      {
        name: 'Hover Tooltip',
        component: (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      },
    ],
  },
]

// Add remaining components with note about installation

// ─────────────────────────────────────────────────────────────────────────────
// AI namespace
//
// These are NOT interchangeable with the ui:* entries above. Every one carries
// experienceMetadata declaring how much autonomy it grants the machine and what
// accountability it owes in return — surfaced in the detail panel, because that
// is the thing a person browsing this page most needs to know before reaching
// for one.
//
// Source of truth: design-system/components/ai/llms.txt
// ─────────────────────────────────────────────────────────────────────────────

const aiComponents: ComponentInfo[] = [
  {
    id: 'ai-avatar',
    name: 'AI Avatar',
    category: 'AI',
    description: 'The mark that tells a user a machine is speaking',
    importPath: '@/components/ai/ai-avatar',
    experience: { mode: 'AI Assisted · Adaptive · AI Led', behavior: 'Suggest', accountability: 'Attribution' },
    examples: [
      {
        name: 'Hero and inline',
        component: (
          <div className="flex items-center gap-4">
            <AIAvatar label="Research agent" />
            <BotAvatar size={20} />
            <span className="text-sm text-muted-foreground">Fixed palette in both themes — never recolour</span>
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-button',
    name: 'AI Button',
    category: 'AI',
    description: 'Commit to something a machine proposed',
    importPath: '@/components/ai/ai-button',
    variants: ['primary', 'secondary', 'tertiary'],
    experience: { mode: 'AI Assisted · Adaptive · AI Led', behavior: 'Confirm · Apply', accountability: 'Attribution · Approval' },
    examples: [
      {
        name: 'Variants',
        component: (
          <div className="flex flex-wrap items-center gap-2">
            <AIButton label="Apply" />
            <AIButton variant="secondary" label="Review" />
            <AIButton variant="tertiary" label="Dismiss" />
          </div>
        ),
      },
      {
        name: 'Status — must track real work',
        component: (
          <div className="flex flex-wrap items-center gap-2">
            <AIButton label="Applying…" status="loading" />
            <AIButton label="Applied" status="complete" />
            <AIButton label="Failed" status="error" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-action',
    name: 'AI Action',
    category: 'AI',
    description: 'The decision point at the end of every AI recommendation',
    importPath: '@/components/ai/ai-action',
    experience: { mode: 'AI Assisted · Adaptive · AI Led', behavior: 'Suggest · Confirm · Apply · Approve', accountability: 'Attribution · Approval · Audit trail · Rationale disclosure' },
    examples: [
      {
        name: 'Recommendation',
        component: (
          <AIAction primaryLabel="Apply recommendation" secondaryLabel="Review details" tertiaryLabel="Dismiss" />
        ),
      },
      {
        name: 'Requires review — the signal renders before the buttons',
        component: <AIAction primaryLabel="Approve territory change" secondaryLabel="Edit first" requiresReview />,
      },
    ],
  },
  {
    id: 'ai-confidence-risk-badge',
    name: 'AI Confidence & Risk Badge',
    category: 'AI',
    description: 'How sure the model is, and how much is at stake',
    importPath: '@/components/ai/ai-confidence-risk-badge',
    experience: { mode: 'AI Assisted · Adaptive · AI Led', behavior: 'Suggest', accountability: 'Attribution · Confidence signalling · Rationale disclosure' },
    examples: [
      {
        name: 'Levels — the label is the value, never the colour',
        component: (
          <div className="flex flex-col items-start gap-2">
            <AIConfidenceRiskBadge confidence="high" />
            <AIConfidenceRiskBadge confidence="medium" risk="medium" />
            <AIConfidenceRiskBadge confidence="low" risk="high" staleData missingSource />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-why-this-link',
    name: 'AI Why This Link',
    category: 'AI',
    description: 'Make the reasoning reachable in one interaction',
    importPath: '@/components/ai/ai-why-this-link',
    experience: { mode: 'AI Assisted · Adaptive · AI Led', behavior: 'Suggest', accountability: 'Rationale disclosure · Attribution' },
    examples: [
      {
        name: 'Variants',
        component: (
          <div className="flex flex-col items-start gap-2">
            <AIWhyThisLink />
            <AIWhyThisLink variant="view-sources" />
            <AIWhyThisLink variant="explain-risk" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-soft-surface',
    name: 'AI Soft Surface',
    category: 'AI',
    description: 'The wash that marks a region as machine-generated',
    importPath: '@/components/ai/ai-soft-surface',
    variants: ['ai', 'neutral', 'mixed'],
    experience: { mode: 'AI Assisted · Adaptive · AI Led', behavior: 'Suggest', accountability: 'Attribution' },
    examples: [
      {
        name: 'Tones — never wrap human-authored content',
        component: (
          <div className="grid gap-2 sm:grid-cols-3">
            <AISoftSurface className="p-4 text-xs">ai</AISoftSurface>
            <AISoftSurface tone="neutral" className="p-4 text-xs">neutral</AISoftSurface>
            <AISoftSurface tone="mixed" className="p-4 text-xs">mixed</AISoftSurface>
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-response',
    name: 'AI Response',
    category: 'AI',
    description: 'One AI turn, with attribution and recourse by construction',
    importPath: '@/components/ai/ai-response',
    experience: { mode: 'AI Assisted · Adaptive · AI Led', behavior: 'Suggest', accountability: 'Attribution · Rationale disclosure' },
    examples: [
      {
        name: 'Complete turn',
        component: (
          <AIResponse agentLabel="Research agent" timestamp="Just now">
            <p>Three accounts match your criteria. Two are already in an active renewal cycle.</p>
          </AIResponse>
        ),
      },
      {
        name: 'Loading — announces politely, withholds actions',
        component: <AIResponse agentLabel="Research agent" loading />,
      },
    ],
  },
  {
    id: 'ai-approval-card',
    name: 'AI Approval Card',
    category: 'AI',
    description: 'A consequential proposal, in an order that cannot be got wrong',
    importPath: '@/components/ai/ai-approval-card',
    experience: { mode: 'AI Assisted · AI Led', behavior: 'Confirm · Apply · Approve', accountability: 'Attribution · Rationale disclosure · Confidence signalling · Approval · Audit trail · Reversibility' },
    examples: [
      {
        name: 'Attribution → proposal → confidence → rationale → actions',
        component: (
          <AIApprovalCard
            agentLabel="Planning agent"
            timestamp="2 min ago"
            proposal="Move 14 accounts from the West region to Central to balance quota coverage."
            confidence="medium"
            risk="high"
            requiresReview
            onWhyThis={() => undefined}
            primaryLabel="Approve territory change"
            secondaryLabel="Edit first"
            tertiaryLabel="Dismiss"
          />
        ),
      },
    ],
  },
  {
    id: 'ai-dialog',
    name: 'AI Dialog',
    category: 'AI',
    description: 'The composer — where the human writes to the machine',
    importPath: '@/components/ai/ai-dialog',
    experience: { mode: 'AI Assisted', behavior: 'Suggest', accountability: 'Attribution' },
    examples: [
      {
        name: 'Input card — Enter sends, Shift+Enter newlines',
        component: (
          <AIInputCard
            toolbar={<AIDialogButton icon={<Info className="h-4 w-4" />} aria-label="About this assistant" />}
            suggestions={<AIChipQuick label="Find at-risk accounts" />}
          />
        ),
      },
      { name: 'Slim pill', component: <AIDialogSlim /> },
    ],
  },
  {
    id: 'ai-loading-indicators',
    name: 'AI Loading Indicators',
    category: 'AI',
    description: 'Say the machine is working — truthfully',
    importPath: '@/components/ai/ai-loading-indicators',
    experience: { mode: 'AI Assisted · Adaptive · AI Led', behavior: 'Suggest', accountability: 'Attribution' },
    examples: [
      {
        name: 'Variants — the text is the signal, not the animation',
        component: (
          <div className="flex flex-wrap gap-2">
            <AILoadingIndicator variant="thinking" />
            <AILoadingIndicator variant="working" />
            <AILoadingIndicator variant="retrieving" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-progress',
    name: 'AI Progress',
    category: 'AI',
    description: 'Progress for work that can be blocked or escalated',
    importPath: '@/components/ai/ai-progress',
    experience: { mode: 'AI Led · Adaptive', behavior: 'Suggest', accountability: 'Attribution · Audit trail' },
    examples: [
      {
        name: 'Agentic statuses',
        component: (
          <div className="w-full space-y-4">
            <AIProgress value={62} label="Territory rebalance" currentStep="Step 3 of 5 — analysing" percentLabel />
            <AIProgress value={62} status="blocked" label="Blocked" currentStep="Waiting on approval" />
            <AIProgress value={100} status="complete" label="Complete" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-agent-work-note',
    name: 'AI Agent Work Note',
    category: 'AI',
    description: 'What the agent is doing, without raw reasoning',
    importPath: '@/components/ai/ai-agent-work-note',
    experience: { mode: 'AI Assisted · AI Led', behavior: 'Suggest', accountability: 'Attribution · Rationale disclosure · Audit trail' },
    examples: [
      {
        name: 'Collapsed by default — the user opts in',
        component: (
          <AIAgentWorkNote
            status="planning"
            items={['Read the account history', 'Compared against Q3 targets', 'Ranked by expected value']}
          />
        ),
      },
    ],
  },
  {
    id: 'ai-control-bar',
    name: 'AI Control Bar',
    category: 'AI',
    description: 'The human can always stop the machine',
    importPath: '@/components/ai/ai-control-bar',
    experience: { mode: 'AI Led', behavior: 'Confirm · Apply', accountability: 'Attribution · Approval · Audit trail · Reversibility' },
    examples: [
      {
        name: 'States — cancel is two-step by design',
        component: (
          <div className="w-full space-y-2">
            <AIControlBar state="running" label="Rebalancing territories" />
            <AIControlBar state="cancel-confirm" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-launcher',
    name: 'AI Launcher',
    category: 'AI',
    description: 'The way in — recognisable, never instructional',
    importPath: '@/components/ai/ai-launcher',
    experience: { mode: 'AI Assisted', behavior: 'Suggest', accountability: 'Attribution' },
    examples: [
      {
        name: 'Forms and states',
        component: (
          <div className="flex flex-wrap items-center gap-3">
            <AILauncher />
            <AILauncher active />
            <AILauncher unread unreadCount={2} />
            <AILauncher variant="avatar-only" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-agent-stack',
    name: 'AI Agent Stack',
    category: 'AI',
    description: 'Several agents at once, and what each is doing',
    importPath: '@/components/ai/ai-agent-stack',
    experience: { mode: 'AI Led', behavior: 'Suggest', accountability: 'Attribution · Audit trail' },
    examples: [
      {
        name: 'Status rings — each avatar is labelled with its status',
        component: (
          <AIAgentStack
            agents={[
              { id: 'a', label: 'Research', status: 'running' },
              { id: 'b', label: 'Drafting', status: 'waiting' },
              { id: 'c', label: 'Review', status: 'blocked' },
              { id: 'd', label: 'QA', status: 'idle' },
              { id: 'e', label: 'Ship', status: 'idle' },
            ]}
          />
        ),
      },
    ],
  },
  {
    id: 'ai-queue-badge',
    name: 'AI Queue Badge',
    category: 'AI',
    description: 'The state of one item in an agent queue',
    importPath: '@/components/ai/ai-queue-badge',
    experience: { mode: 'AI Led', behavior: 'Suggest', accountability: 'Attribution · Audit trail' },
    examples: [
      {
        name: 'Colour, icon and text — always all three',
        component: (
          <div className="flex flex-wrap gap-2">
            <AIQueueBadge status="queued" />
            <AIQueueBadge status="running" />
            <AIQueueBadge status="needs-approval" count={3} />
            <AIQueueBadge status="blocked" />
            <AIQueueBadge status="complete" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-message-header',
    name: 'AI Message Header',
    category: 'AI',
    description: 'Establish who is speaking before a word is read',
    importPath: '@/components/ai/ai-message-header',
    experience: { mode: 'AI Assisted · Adaptive · AI Led', behavior: 'Suggest', accountability: 'Attribution' },
    examples: [
      { name: 'Attribution', component: <div className="w-full"><AIMessageHeader agentLabel="Research agent" timestamp="Just now" /></div> },
    ],
  },
  {
    id: 'ai-message-body',
    name: 'AI Message Body',
    category: 'AI',
    description: 'AI prose, kept plain on purpose',
    importPath: '@/components/ai/ai-message-body',
    experience: { mode: 'AI Assisted · Adaptive', behavior: 'Suggest', accountability: 'Attribution' },
    examples: [
      { name: 'Response prose', component: <AIMessageBody size="sm"><p>Two of the three accounts renewed early this quarter.</p></AIMessageBody> },
    ],
  },
  {
    id: 'ai-message-footer',
    name: 'AI Message Footer',
    category: 'AI',
    description: 'Where the user says yes to what a response offered',
    importPath: '@/components/ai/ai-message-footer',
    experience: { mode: 'AI Assisted · Adaptive', behavior: 'Confirm · Apply', accountability: 'Attribution · Approval' },
    examples: [
      {
        name: 'Three actions, capped',
        component: <AIMessageFooter actions={[{ label: 'Use draft' }, { label: 'Edit draft' }, { label: 'Regenerate', variant: 'tertiary' }]} />,
      },
    ],
  },
  {
    id: 'ai-feedback-bar',
    name: 'AI Feedback Bar',
    category: 'AI',
    description: 'Let the human correct the record',
    importPath: '@/components/ai/ai-feedback-bar',
    experience: { mode: 'AI Assisted · Adaptive', behavior: 'Suggest', accountability: 'Attribution' },
    examples: [
      { name: 'Sentiment and copy', component: <div className="w-full"><AIFeedbackBar onShare={() => undefined} /></div> },
    ],
  },
  {
    id: 'ai-chip-brief',
    name: 'AI Brief Chip',
    category: 'AI',
    description: 'Whether an agent task brief is ready to run',
    importPath: '@/components/ai/ai-chip-brief',
    experience: { mode: 'AI Led', behavior: 'Suggest', accountability: 'Attribution · Approval' },
    examples: [
      {
        name: 'Statuses',
        component: (
          <div className="flex flex-wrap gap-2">
            <AIChipBrief status="ready" label="Q4 rebalance" />
            <AIChipBrief status="waiting-approval" label="Territory change" />
            <AIChipBrief status="missing" label="Renewal outreach" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-chip-handoff',
    name: 'AI Handoff Chip',
    category: 'AI',
    description: 'The moment accountability changed hands',
    importPath: '@/components/ai/ai-chip-handoff',
    experience: { mode: 'AI Led', behavior: 'Suggest', accountability: 'Attribution · Audit trail' },
    examples: [
      {
        name: 'Directions',
        component: (
          <div className="flex flex-col items-start gap-2">
            <AIChipHandoff direction="agent-to-human" fromLabel="Research" toLabel="Dana" />
            <AIChipHandoff direction="agent-to-agent" fromLabel="Research" toLabel="Drafting" />
            <AIChipHandoff direction="failed" fromLabel="Research" toLabel="Review" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-chip-memory',
    name: 'AI Memory Chip',
    category: 'AI',
    description: 'When the system is drawing on what it learned earlier',
    importPath: '@/components/ai/ai-chip-memory',
    experience: { mode: 'Adaptive · AI Assisted', behavior: 'Suggest', accountability: 'Attribution · Rationale disclosure · Audit trail' },
    examples: [
      {
        name: 'Remembering and forgetting are equally visible',
        component: (
          <div className="flex flex-col items-start gap-2">
            <AIChipMemory variant="using-memory" label="Your Q3 pipeline preferences" />
            <AIChipMemory variant="memory-available" label="Past territory edits" />
            <AIChipMemory variant="memory-removed" label="Deleted note" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-chip-quick',
    name: 'AI Quick Chip',
    category: 'AI',
    description: 'A starting point, so the box is never empty',
    importPath: '@/components/ai/ai-chip-quick',
    experience: { mode: 'AI Assisted', behavior: 'Suggest', accountability: 'Attribution' },
    examples: [
      {
        name: 'Composes, never executes',
        component: (
          <div className="flex flex-wrap gap-2">
            <AIChipQuick label="Find at-risk accounts" />
            <AIChipQuick label="Summarise this quarter" />
            <AIChipQuick label="All prompts" isSpecial />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-dialog-button',
    name: 'AI Dialog Button',
    category: 'AI',
    description: 'A quiet control in the composer toolbar',
    importPath: '@/components/ai/ai-dialog-button',
    experience: { mode: 'AI Assisted', behavior: 'Suggest', accountability: 'Attribution' },
    examples: [
      {
        name: 'Shapes — icon-only always carries a name',
        component: (
          <div className="flex flex-wrap items-center gap-2">
            <AIDialogButton icon={<Info className="h-4 w-4" />} aria-label="Information" />
            <AIDialogButton icon={<Command className="h-4 w-4" />} label="Skills" />
            <AIDialogButton label="Agent mode" trailingIcon={<ChevronDown className="h-4 w-4" />} />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-text-link',
    name: 'AI Text Link',
    category: 'AI',
    description: 'An inline link whose label stands on its own',
    importPath: '@/components/ai/ai-text-link',
    experience: { mode: 'AI Assisted · Adaptive · AI Led', behavior: 'Suggest', accountability: 'Attribution · Rationale disclosure' },
    examples: [
      {
        name: 'Variants',
        component: (
          <div className="flex flex-col items-start gap-2">
            <AITextLink label="View the source record" variant="external" href="#" />
            <AITextLink label="Show assumptions" variant="chevron" />
            <AITextLink label="Needs review" tone="attention" />
            <AITextLink label="Audit trail" disabled disabledReason="Unavailable until the run completes" />
          </div>
        ),
      },
    ],
  },
  {
    id: 'ai-icon',
    name: 'AI Icon',
    category: 'AI',
    description: 'A treatment layer over standard icons — 60-30-10',
    importPath: '@/components/ai/ai-icon',
    experience: { mode: 'AI Assisted · Adaptive · AI Led', behavior: 'Suggest', accountability: 'Attribution' },
    examples: [
      {
        name: 'Treatments — the AI colour is scarce by design',
        component: (
          <div className="flex flex-wrap items-center gap-4">
            <AIIcon icon={Info} treatment="neutral" label="Neutral — about 60%" />
            <AIIcon icon={AlertCircle} treatment="semantic" tone="warning" label="Semantic — about 30%" />
            <AIIcon icon={Command} treatment="ai" label="AI identity — about 10%" />
            <AIIcon icon={Command} treatment="ai-contained" container label="Contained" />
          </div>
        ),
      },
    ],
  },
]


// ─────────────────────────────────────────────────────────────────────────────
// Components the UI Kit previously showed only as stubs, or not at all.
//
// These replace a generated placeholder array whose entries read
// "Carousel component — this component is installed and ready to use",
// which told a reader nothing they could act on.
//
// Every id in components/COMPONENTS_INDEX.json must appear here — an inventory
// that says a component is available, on a browse page that never shows it, is
// the same drift this design system exists to catch. Enforced by
// scripts/validate-design-system.mjs (VALIDATE_UI_KIT_COVERAGE).
//
// Where a component genuinely cannot be demonstrated inline — a toast needs a
// mounted host, a sidebar needs a provider and a full shell — the example says
// so rather than faking it.
// ─────────────────────────────────────────────────────────────────────────────

function NotDemonstrable({ reason, where }: { reason: string; where: string }) {
  return (
    <div className="text-sm text-muted-foreground">
      <p>{reason}</p>
      <p className="mt-2">
        See <code className="text-xs">{where}</code>
      </p>
    </div>
  )
}

const uncoveredComponents: ComponentInfo[] = [
  {
    id: 'carousel',
    name: 'Carousel',
    category: 'Data Display',
    description: 'Horizontal browsing when vertical space will not stretch',
    importPath: '@/components/ui/carousel',
    examples: [
      {
        name: 'Three-up — a grid is usually better',
        component: (
          <Carousel opts={{ align: 'start' }} className="w-full max-w-sm">
            <CarouselContent>
              {[1, 2, 3, 4].map((n) => (
                <CarouselItem key={n} className="basis-1/2">
                  <div className="flex h-20 items-center justify-center rounded-lg border text-sm">{n}</div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ),
      },
    ],
  },
  {
    id: 'command',
    name: 'Command',
    category: 'Overlay',
    description: 'Find and run anything by typing',
    importPath: '@/components/ui/command',
    examples: [
      {
        name: 'Palette — CommandEmpty is mandatory',
        component: (
          <CommandRoot className="rounded-lg border shadow-sm">
            <CommandInput placeholder="Search commands…" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem>UI Kit</CommandItem>
                <CommandItem>Brand preview</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandRoot>
        ),
      },
    ],
  },
  {
    id: 'navigation-menu',
    name: 'Navigation Menu',
    category: 'Navigation',
    description: 'Site navigation with a panel under each item',
    importPath: '@/components/ui/navigation-menu',
    examples: [
      {
        name: 'Two levels',
        component: (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[260px] gap-2 p-4">
                    <li className="text-sm">Analytics</li>
                    <li className="text-sm">Deployments</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ),
      },
    ],
  },
  {
    id: 'pagination',
    name: 'Pagination',
    category: 'Navigation',
    description: 'Move through a result set too large to show at once',
    importPath: '@/components/ui/pagination',
    examples: [
      {
        name: 'Paged results — disable the boundaries yourself',
        component: (
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
      },
    ],
  },
  {
    id: 'resizable',
    name: 'Resizable',
    category: 'Layout',
    description: 'Let the user decide how to divide the space',
    importPath: '@/components/ui/resizable',
    examples: [
      {
        name: 'Split view — set minSize on every panel',
        component: (
          <ResizablePanelGroup orientation="horizontal" className="h-28 rounded-lg border">
            <ResizablePanel defaultSize={35} minSize={20}>
              <div className="flex h-full items-center justify-center p-4 text-sm">Nav</div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={65} minSize={30}>
              <div className="flex h-full items-center justify-center p-4 text-sm">Content</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ),
      },
    ],
  },
  {
    id: 'form-field',
    name: 'Form Field',
    category: 'Forms',
    description: 'A labelled control with its description and error, wired correctly',
    importPath: '@/components/patterns/form-field',
    examples: [
      {
        name: 'Valid and invalid',
        component: (
          <div className="w-full space-y-4">
            <FormField label="Email" description="We only use this for receipts." required>
              <Input type="email" placeholder="you@example.com" />
            </FormField>
            <FormField label="Workspace" error="That name is already taken.">
              <Input defaultValue="apollo" />
            </FormField>
          </div>
        ),
      },
    ],
  },
  {
    id: 'page-container',
    name: 'Page Container',
    category: 'Layout',
    description: 'One max-width, one gutter, one place to change either',
    importPath: '@/components/layout/page-container',
    variants: ['prose', 'narrow', 'default', 'wide', 'full'],
    examples: [
      {
        name: 'Widths — the side gutter never collapses',
        component: (
          <div className="w-full space-y-2">
            {(['prose', 'default', 'wide'] as const).map((w) => (
              <PageContainer key={w} as="div" width={w} spacing="none" className="rounded border border-dashed py-2 text-center text-xs">
                {w}
              </PageContainer>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    id: 'form',
    name: 'Form',
    category: 'Forms',
    description: 'react-hook-form integration that generates the ARIA wiring',
    importPath: '@/components/ui/form',
    examples: [
      {
        name: 'Needs a form context',
        component: (
          <NotDemonstrable
            reason="Form requires a react-hook-form useForm() instance supplied by the page, so it cannot be shown standalone here. For a field without a form library, use pattern:form-field."
            where="design-system/components/ui/form/form.md"
          />
        ),
      },
    ],
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'Layout',
    description: 'A complete application navigation shell',
    importPath: '@/components/ui/sidebar',
    examples: [
      {
        name: 'Needs a provider and a full shell',
        component: (
          <NotDemonstrable
            reason="Sidebar requires SidebarProvider wrapping the whole layout, sets a collapse cookie and binds Cmd+B globally. Mounting it inside this panel would hijack the page."
            where="design-system/components/ui/sidebar/sidebar.md"
          />
        ),
      },
    ],
  },
  {
    id: 'toast',
    name: 'Toast',
    category: 'Feedback',
    description: 'Confirm something happened, without taking the user away',
    importPath: '@/components/ui/toast',
    examples: [
      {
        name: 'Needs a mounted host',
        component: (
          <NotDemonstrable
            reason="Toast renders through ui:toaster, which must be mounted once at the app root. Neither toast system is mounted in this app — pick one before using either."
            where="design-system/components/ui/toast/toast.md"
          />
        ),
      },
    ],
  },
  {
    id: 'toaster',
    name: 'Toaster',
    category: 'Feedback',
    description: 'The one place toasts actually render',
    importPath: '@/components/ui/toaster',
    examples: [
      {
        name: 'Mount once, at the root',
        component: (
          <NotDemonstrable
            reason="Toaster is the render host for ui:toast. Mount exactly one toast system — this or ui:sonner, never both, or every toast appears twice."
            where="design-system/components/ui/toaster/toaster.md"
          />
        ),
      },
    ],
  },
  {
    id: 'sonner',
    name: 'Sonner',
    category: 'Feedback',
    description: 'The alternative toast system — choose one',
    importPath: '@/components/ui/sonner',
    examples: [
      {
        name: 'Exports SonnerToaster, not Toaster',
        component: (
          <NotDemonstrable
            reason="The export is deliberately named SonnerToaster so it cannot collide with ui:toaster at an import site. Mount one toast system, never both."
            where="design-system/components/ui/sonner/sonner.md"
          />
        ),
      },
    ],
  },
]

// One array per origin, merged and sorted. Every id in
// components/COMPONENTS_INDEX.json must appear here — checked in CI by
// VALIDATE_UI_KIT_COVERAGE.
const allComponents = [...components, ...aiComponents, ...uncoveredComponents].sort((a, b) =>
  a.name.localeCompare(b.name)
)

const categories = ['All', 'AI', 'Forms', 'Layout', 'Overlay', 'Feedback', 'Navigation', 'Data Display', 'Other']

export default function UIKitPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [copiedImport, setCopiedImport] = useState(false)
  const navigate = useNavigate()

  const filteredComponents = allComponents.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || comp.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleComponentClick = (component: ComponentInfo) => {
    setSelectedComponent(component)
    setDetailOpen(true)
    setCopiedImport(false)
  }

  const handleCopyImport = async () => {
    if (selectedComponent) {
      await navigator.clipboard.writeText(
        `import { ${selectedComponent.name.replace(/\s+/g, '')} } from '${selectedComponent.importPath}'`
      )
      setCopiedImport(true)
      setTimeout(() => setCopiedImport(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Shadcn UI Kit</h1>
            <p className="text-muted-foreground mt-1">
              Browse {allComponents.length} governed components with live examples —{' '}
              {allComponents.filter((c) => c.category !== 'AI').length} standard and{' '}
              {allComponents.filter((c) => c.category === 'AI').length} AI-native
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setDrawerOpen(true)}>
              <Command className="h-4 w-4 mr-2" />
              Prompt Library
            </Button>
            <Button variant="outline" onClick={() => navigate('/brand-preview')}>
              <Palette className="h-4 w-4 mr-2" />
              Brand Preview
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" />
              Back Home
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredComponents.map((component) => (
                <Card
                  key={component.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleComponentClick(component)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{component.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {component.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{component.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs font-mono text-muted-foreground truncate">{component.importPath}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredComponents.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">No components found matching your search.</div>
            )}
          </div>
        </div>
      </div>

      {/* Component Detail Sheet */}
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedComponent && (
            <>
              <SheetHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <SheetTitle className="text-2xl">{selectedComponent.name}</SheetTitle>
                    <SheetDescription className="mt-2">{selectedComponent.description}</SheetDescription>
                  </div>
                  <Badge>{selectedComponent.category}</Badge>
                </div>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Experience metadata — AI namespace only */}
                {selectedComponent.experience && (
                  <div className="rounded-lg border border-ai-surface-border bg-ai-surface p-4">
                    <h3 className="text-sm font-semibold mb-1">Experience metadata</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      How much autonomy this grants the machine, and what it owes you in return.
                    </p>
                    <dl className="space-y-2 text-xs">
                      <div className="flex gap-2">
                        <dt className="w-28 shrink-0 font-medium text-muted-foreground">Mode</dt>
                        <dd>{selectedComponent.experience.mode}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-28 shrink-0 font-medium text-muted-foreground">Behavior</dt>
                        <dd>{selectedComponent.experience.behavior}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-28 shrink-0 font-medium text-muted-foreground">Accountability</dt>
                        <dd>{selectedComponent.experience.accountability}</dd>
                      </div>
                    </dl>
                  </div>
                )}

                {/* Import */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Import</h3>
                  <div className="relative">
                    <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto whitespace-pre-wrap font-mono">
                      <code>
                        import {`{ ${selectedComponent.name.replace(/\s+/g, '')} }`} from '
                        {selectedComponent.importPath}'
                      </code>
                    </pre>
                    <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={handleCopyImport}>
                      {copiedImport ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Examples */}
                {selectedComponent.examples && selectedComponent.examples.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Examples</h3>
                    <div className="space-y-6">
                      {selectedComponent.examples.map((example, idx) => (
                        <div key={idx} className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">{example.name}</p>
                          <div className="border rounded-lg p-4 bg-background">{example.component}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variants */}
                {selectedComponent.variants && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Available Variants</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedComponent.variants.map((variant) => (
                          <Badge key={variant} variant="outline">
                            {variant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Documentation Link */}
                <Separator />
                <div>
                  <h3 className="text-sm font-semibold mb-2">Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Full contract:{' '}
                    <code className="text-xs">
                      design-system/components/{selectedComponent.experience ? 'ai' : 'ui'}/
                      {selectedComponent.id}/
                    </code>
                  </p>
                  {!selectedComponent.experience && (
                    <a
                      href={`https://ui.shadcn.com/docs/components/${selectedComponent.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-primary hover:underline"
                    >
                      View upstream documentation on shadcn/ui →
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <PromptDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}
