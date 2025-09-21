# RULES_OF_AI.md

## 🔧 Agent Toolkit (MANDATORY)

The `packages/agent-toolkit` provides a **unified, contract-driven interface** for all development
operations. This toolkit is **REQUIRED** for maintaining monorepo uniformity and code quality.

### Core Integration Pattern

```typescript
import { createAgentToolkit } from '@cortex-os/agent-toolkit';

const toolkit = createAgentToolkit();
// Use TypeScript interface for programmatic access
await toolkit.multiSearch('pattern', './src');
await toolkit.validateProject(['*.ts', '*.py', '*.rs']);
```

### Shell Interface (Just Recipes)

- `just scout "pattern" path` - Multi-tool search (ripgrep + semgrep + ast-grep)
- `just codemod 'find(:[x])' 'replace(:[x])' path` - Structural modifications
- `just verify changed.txt` - Auto-validation based on file types

### When Agents MUST Use Agent-Toolkit

1. **Code Search Operations** - Instead of raw grep/rg commands
2. **Structural Modifications** - For any refactoring or codemod operations
3. **Quality Validation** - Before commits, PRs, or code changes
4. **Cross-Language Tasks** - Unified interface for TypeScript/Python/Rust
5. **Pre-Commit Workflows** - Automated validation pipelines

### Architecture Compliance

Agent-toolkit follows Cortex-OS principles:

- **Contract-first**: Zod schemas ensure type safety
- **Event-driven**: A2A integration ready
- **MCP compatible**: Tool exposure for agent consumption
- **Layered design**: Clean domain/app/infra separation

### Time Freshness Rules

See `_time-freshness.md` for timezone and date handling rules that all agents must follow.

---

## 🚨 CRITICAL: CODESTYLE.md ENFORCEMENT

**MANDATORY COMPLIANCE** with [CODESTYLE.md](../CODESTYLE.md) requirements:

### Function Length Limits
- **Maximum 40 lines per function** - Split immediately if readability suffers
- **Strictly enforced in CI** - Build failures for violations
- **No exceptions** for any code

### Export Requirements
- **Named exports only** - `export const functionName = ...`
- **Default exports forbidden** - `export default` will cause build failures
- **Required for tree-shaking and debugging**

### Class Usage Restrictions
- **Classes only when framework-required** (React ErrorBoundary, etc.)
- **Prefer functional composition** over OOP patterns
- **Justification required in code review for any class usage**

### Async/Await Requirements
- **Use async/await exclusively** - Never use `.then()` chains
- **Promise chains are forbidden** and caught by linters
- **Violations will block PR merges**

### Project References
- **All packages must set `composite: true`** in tsconfig.json
- **Required for Nx task graph optimization**
- **Missing configuration will cause build failures**

---

## AI/Agent Rules and Guidelines

This document outlines the fundamental rules and guidelines for AI agents operating within the Cortex-OS ecosystem.

## 1. Primary Directive

The AI must prioritize human welfare and safety above all else, while respecting human autonomy and dignity.

## 2. Transparency Requirements

- All AI decision-making processes must be explainable and auditable
- Users must be informed when interacting with AI systems
- AI systems must not masquerade as humans without explicit disclosure

## 3. Privacy and Data Protection

- User data must be collected only with explicit consent
- Data minimization principles must be followed
- Strong encryption must protect all personal data
- Users must have the right to access, correct, and delete their data

## 4. Fairness and Non-Discrimination

- AI systems must not discriminate based on protected characteristics
- Regular bias auditing must be conducted
- Equal access to AI benefits must be ensured

## 5. Security and Robustness

- AI systems must be designed with security as a core principle
- Regular vulnerability assessments must be performed
- Systems must gracefully degrade when operating outside their capabilities

## 6. Human Oversight

- Critical decisions must involve meaningful human review
- AI systems must provide mechanisms for human intervention
- Clear lines of accountability must be established

## 7. Compliance with Law and Ethical Standards

- AI systems must comply with all applicable laws and regulations
- Ethical considerations must inform technical design decisions
- Regular ethical impact assessments must be conducted

## 8. Continuous Monitoring and Improvement

- AI systems must be continuously monitored for unintended consequences
- Feedback loops must enable ongoing improvement
- Incident response procedures must be established and tested

## 9. AI Development Requirements

### Mandatory Local Memory Usage
- **Store all architectural decisions** with reasoning and context
- **Document lessons learned** from code reviews and refactoring
- **Track effective development strategies** for future reference
- **Maintain persistent context** across development sessions
- **Use semantic search** to find relevant past decisions

### Development Patterns to Avoid
1. **Default exports** - `export default class/Function` → Always use named exports
2. **Function length > 40 lines** → Immediately split into smaller functions
3. **`.then()` chains** → Use `async/await` exclusively
4. **Classes without framework requirement** → Use functional composition
5. **Missing `composite: true`** → All packages require this setting
6. **Direct sibling package imports** → Use events/contracts instead
7. **Bypassing local memory** → Store all development insights persistently

### Required Local Memory Usage Patterns:
```typescript
// Store architectural decisions
await memory.store({
  content: 'Event-driven architecture prevents tight coupling between features',
  importance: 9,
  tags: ['architecture', 'decision', 'a2a'],
  domain: 'software-design'
});

// Store development lessons
await memory.store({
  content: '40-line function limit significantly improves code maintainability',
  importance: 8,
  tags: ['lesson', 'codestyle', 'maintainability'],
  domain: 'development-patterns'
});

// Store technical decisions
await memory.store({
  content: 'Named exports enable better debugging and tree-shaking',
  importance: 7,
  tags: ['typescript', 'exports', 'optimization'],
  domain: 'frontend-architecture'
});
```

These rules form the foundation of responsible AI development and deployment in Cortex-OS.
