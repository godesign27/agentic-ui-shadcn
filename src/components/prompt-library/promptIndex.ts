export interface Prompt {
  id: string
  title: string
  description: string
  category: string
  file: string
}

export interface PromptsIndex {
  prompts: Prompt[]
}

export async function fetchPromptsIndex(): Promise<PromptsIndex> {
  const response = await fetch('/prompts/PROMPTS_INDEX.json')
  if (!response.ok) {
    throw new Error('Failed to fetch prompts index')
  }
  return response.json()
}

export async function fetchPromptContent(filename: string): Promise<string> {
  const response = await fetch(`/prompts/${filename}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch prompt: ${filename}`)
  }
  return response.text()
}

