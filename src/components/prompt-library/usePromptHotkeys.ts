import { useEffect } from 'react'

export function usePromptHotkeys(
  onToggle: () => void,
  isOpen: boolean
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input, textarea, or contenteditable
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return
      }

      // Cmd/Ctrl+L or Cmd/Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && (e.key === 'l' || e.key === 'k')) {
        e.preventDefault()
        onToggle()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onToggle, isOpen])
}

