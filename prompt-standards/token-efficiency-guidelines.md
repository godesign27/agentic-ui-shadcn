# Token Efficiency Guidelines

This document provides guidance for minimizing token consumption in agent interactions while maintaining clarity and determinism.

## Purpose

Efficient token usage:
- Reduces API costs
- Improves response speed
- Enables longer context windows
- Maintains focus on essential information

## Core Principles

### Avoid Verbosity

**Do**:
- Use concise, direct language
- Reference existing documentation rather than restating it
- Use structured formats (lists, tables) for clarity
- Focus on actionable information

**Don't**:
- Restate rules from AGENT_RULES.md or other governance docs
- Include unnecessary explanations of well-understood concepts
- Use verbose phrasing when concise alternatives exist
- Repeat information already in context

### Reference, Don't Restate

When referencing governance:
- **Good**: "Per AGENT_RULES.md, verify component availability"
- **Bad**: Restating the entire component index compliance rule

When referencing accessibility:
- **Good**: "Ensure WCAG 2.1 AA compliance per ACCESSIBILITY.md"
- **Bad**: Restating all WCAG requirements

### Limit Speculative Reasoning

**Do**:
- State decisions clearly
- Provide brief rationale when necessary
- Reference specific rules or principles

**Don't**:
- Engage in extended reasoning chains
- Speculate about edge cases not relevant to the task
- Provide multiple alternatives without clear recommendation
- Include "what if" scenarios unless directly relevant

### Structured, Bounded Outputs

Prefer structured formats:
- Lists over paragraphs for multiple items
- Tables for comparative information
- Code blocks for examples (not explanations)
- Checklists for validation steps

Set clear boundaries:
- Define output scope upfront
- Limit examples to what's necessary
- Avoid "for completeness" additions

## Prompt Construction Guidelines

### Start Prompts
- Keep acknowledgment requirements concise
- Reference read order, don't enumerate it
- Focus on verification, not education

### Feature Requests
- Classify scope immediately
- State constraints clearly
- Avoid restating governance rules

### Validation Requests
- Use checklists, not paragraphs
- Reference standards, don't restate them
- Focus on task-specific validation

## Example Patterns

### Efficient Prompt
```
Generate a login form using components from the index.
Scope: Small feature
Constraints: WCAG AA, brand tokens if available
```

### Inefficient Prompt
```
I need you to generate a login form. Remember that you need to use components from the component index as per AGENT_RULES.md which states that agents must use only components listed in COMPONENTS_INDEX.md. Also, you need to make sure it's accessible according to WCAG 2.1 AA standards which are defined in ACCESSIBILITY.md. That document says you need semantic HTML, proper labels, keyboard navigation, etc. Also use brand tokens if they're available per BRAND_THEMING.md...
```

## Token Budget Considerations

For different interaction types:
- **Start prompt**: 50-100 tokens
- **Small feature request**: 100-200 tokens
- **Medium feature request**: 200-400 tokens
- **Large feature request**: 400-800 tokens
- **Validation**: 50-150 tokens

These are guidelines, not strict limits. Prioritize clarity and completeness over strict token counts.

## Balancing Efficiency and Clarity

Token efficiency should not compromise:
- Clear task definition
- Necessary context for complex features
- Critical constraint communication
- Validation requirements

When in doubt, prioritize clarity and correctness over token savings. Inefficient but correct output is preferable to efficient but incorrect output.

