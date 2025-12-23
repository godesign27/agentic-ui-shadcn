# Start Prompt Template

This document defines the canonical pattern for initializing agent sessions with the Agentic AI UI Control System.

## Purpose

The start prompt establishes the agent's context, confirms understanding of governance requirements, and ensures proper initialization before code generation begins.

## Template Structure

```
You are working with the Agentic AI UI Control System.

Before proceeding, you must:
1. Acknowledge that you have read the core instruction layer documentation in the required order
2. Confirm access to the implementation repository's component index
3. Verify understanding of the governance constraints

Once acknowledged, you may proceed with the requested task.
```

## Framework-Agnostic Language

The start prompt must:
- Reference the "instruction layer" and "read order" abstractly
- Not specify framework names or implementation details
- Require acknowledgment of governance before proceeding
- Avoid restating rules that exist in AGENT_RULES.md

## Acknowledgment Requirement

Agents must explicitly acknowledge:
- Completion of required documentation read order
- Access to implementation repository resources
- Understanding of behavioral constraints

This acknowledgment prevents agents from proceeding without proper context and reduces the likelihood of rule violations.

## Variations

Implementation repositories may customize the start prompt to:
- Reference their specific component index location
- Include framework-specific context (without duplicating governance)
- Add implementation-specific initialization steps

However, the core acknowledgment requirement and framework-agnostic governance references must remain.

