---
title: Getting Started
sidebar_label: Getting Started
---

# Getting Started

## Prerequisites

- Node.js ≥ 20
- pnpm

## Installation

```sh
pnpm add @cortex-os/mcp-core
```

## First Tool Call

```ts
import { createEnhancedClient } from "@cortex-os/mcp-core";

const client &#61; await createEnhancedClient({
  name: "example",
  transport: "streamableHttp",
  endpoint: "http://localhost:3000/tool"
});

const result &#61; await client.callTool({ name: "ping" });
await client.close();
```
