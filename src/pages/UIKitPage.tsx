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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { PromptDrawer } from '@/components/prompt-library/PromptDrawer'
import { Command, Home, Palette, Copy, Check, Bold, Italic, Underline, ChevronDown, ChevronRight, Info, AlertCircle, Settings } from 'lucide-react'

interface ComponentInfo {
  id: string
  name: string
  category: string
  description: string
  importPath: string
  variants?: string[]
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
const remainingComponents = [
  'carousel',
  'command',
  'form',
  'navigation-menu',
  'pagination',
  'resizable',
  'sidebar',
  'sonner',
  'toast',
  'toaster',
].map((id) => ({
  id,
  name: id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' '),
  category: getCategoryForComponent(id),
  description: `${id.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} component`,
  importPath: `@/components/ui/${id}`,
  examples: [
    {
      name: 'Component Installed',
      component: (
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">This component is installed and ready to use.</p>
          <Button variant="link" className="h-auto p-0" asChild>
            <a href={`https://ui.shadcn.com/docs/components/${id}`} target="_blank" rel="noopener noreferrer">
              View full documentation →
            </a>
          </Button>
        </div>
      ),
    },
  ],
}))

function getCategoryForComponent(id: string): string {
  if (['form', 'command'].includes(id)) return 'Forms'
  if (['toast', 'toaster', 'sonner'].includes(id)) return 'Feedback'
  if (['navigation-menu', 'pagination'].includes(id)) return 'Navigation'
  if (['resizable', 'sidebar', 'carousel'].includes(id)) return 'Layout'
  return 'Other'
}

const allComponents = [...components, ...remainingComponents].sort((a, b) => a.name.localeCompare(b.name))

const categories = ['All', 'Forms', 'Layout', 'Overlay', 'Feedback', 'Navigation', 'Data Display', 'Other']

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
              Browse and explore {allComponents.length} shadcn/ui components with live examples
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
                  <a
                    href={`https://ui.shadcn.com/docs/components/${selectedComponent.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View full documentation on shadcn/ui →
                  </a>
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
