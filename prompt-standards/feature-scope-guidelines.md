# Feature Scope Guidelines

This document defines feature scope categories and their associated expectations for agent output and validation.

## Purpose

Clear scope definitions help agents:
- Estimate complexity and output size
- Set appropriate validation expectations
- Avoid over-engineering or under-delivering
- Communicate scope boundaries to users

## Scope Categories

### Small Feature

**Definition**: A single component usage, minor modification, or simple composition.

**Characteristics**:
- Uses 1-3 existing components from the component index
- Requires minimal custom styling or logic
- Output fits within a single code block or file
- No complex state management or interactions

**Examples**:
- Rendering a form using existing form components
- Creating a simple card layout with existing components
- Applying brand theming to an existing component

**Validation Expectations**:
- Verify component availability in index
- Check token usage compliance
- Confirm accessibility basics (semantic HTML, labels)

### Medium Feature

**Definition**: A multi-component composition, pattern implementation, or moderate customization.

**Characteristics**:
- Uses 3-7 existing components
- May require custom composition logic
- Output spans multiple sections or files
- Includes moderate interaction patterns

**Examples**:
- Implementing a data table with sorting and filtering
- Creating a multi-step form workflow
- Building a dashboard layout with multiple sections

**Validation Expectations**:
- Verify all components exist in index
- Check pattern compliance (if using established patterns)
- Validate accessibility for interactive elements
- Confirm token usage throughout
- Verify responsive behavior

### Large Feature

**Definition**: A complete page, complex workflow, or significant multi-component system.

**Characteristics**:
- Uses 7+ existing components
- Requires complex composition and state management
- Output includes multiple files and sections
- Involves advanced interaction patterns

**Examples**:
- Complete application page with multiple workflows
- Complex admin interface with data management
- Multi-page form with validation and submission

**Validation Expectations**:
- Comprehensive component index verification
- Full accessibility audit (WCAG 2.1 AA)
- Complete token compliance check
- Responsive design verification across breakpoints
- Pattern consistency validation
- Performance considerations

## Output Size Guidance

- **Small**: 50-200 lines of code
- **Medium**: 200-500 lines of code
- **Large**: 500+ lines of code (may require multiple files)

These are approximate guidelines. Actual size depends on component complexity and framework patterns.

## Complexity Indicators

Agents should consider scope large if the feature involves:
- Multiple independent workflows
- Complex state dependencies
- Advanced accessibility requirements (modals, complex forms)
- Extensive responsive behavior
- Integration with external systems (beyond UI scope)

## Scope Communication

When receiving a feature request, agents should:
1. Classify the scope (small/medium/large)
2. Confirm scope understanding with the user if ambiguous
3. Set appropriate validation expectations
4. Proceed with implementation matching the scope

## Boundary Conditions

If a request exceeds large feature scope or requires:
- New components not in the index
- Framework modifications
- Build tooling changes
- Dependencies not in the implementation

The agent must reject or propose alternatives per AGENT_RULES.md.

