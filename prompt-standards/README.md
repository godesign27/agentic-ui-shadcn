# Prompt Standards

This directory contains standardized prompt guidance for agents using the Agentic AI UI Control System. These standards are designed to improve agent efficiency, reduce hallucination, and minimize token consumption.

## Purpose

Standardized prompts serve as optional interfaces layered on top of the core governance system. They provide:

- **Speed**: Pre-defined patterns reduce decision-making overhead
- **Reduced Hallucination**: Clear boundaries and expectations prevent agents from inventing requirements
- **Lower Token Consumption**: Concise, structured prompts minimize unnecessary context and repetition

## Relationship to Core Governance

These prompt standards complement but do not replace the core governance documents:
- They reference the instruction layer read order without restating it
- They provide guidance patterns, not enforcement mechanisms
- They optimize for efficiency without altering system rules

## Usage

Implementation repositories and agent interfaces may use these standards to:
- Initialize agent sessions with consistent start prompts
- Scope feature requests appropriately
- Optimize token usage in agent interactions

These standards are **optional**—agents may operate without them, but following them improves consistency and efficiency.

## Contents

- **start-prompt-template.md**: Canonical pattern for initializing agent sessions
- **feature-scope-guidelines.md**: Definitions and expectations for feature scoping
- **token-efficiency-guidelines.md**: Guidance for minimizing token consumption
- **changelog_prompt.md**: Post-change documentation prompt for maintaining project notes

## Post-change documentation prompt

Implementation repositories can copy `/prompt-standards/changelog_prompt.md` to their own `/prompts` directory for use after code changes.

**One-line invocation convention**: After completing this task, execute `/prompts/changelog_prompt.md`.

