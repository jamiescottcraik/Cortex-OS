#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import { ConfigManager } from "@cortex-os/core";

const configManager = ConfigManager.getInstance();

export const configCommand = new Command("config").description(
  "Configuration management commands",
);

// Get command
configCommand
  .command("get")
  .arguments("<key>")
  .description("Get configuration value")
  .action(async (key: string) => {
    try {
      const value = await configManager.getValue(key);
      console.log(chalk.green("✓"), `${key}:`, JSON.stringify(value, null, 2));
    } catch (error) {
      console.error(
        chalk.red("Failed to get configuration:"),
        (error as Error).message,
      );
      process.exit(1);
    }
  });

// Set command
configCommand
  .command("set")
  .arguments("<key> <value>")
  .description("Set configuration value")
  .action(async (key: string, value: string) => {
    try {
      let parsedValue: any = value;
      try {
        parsedValue = JSON.parse(value);
      } catch {
        // Keep as string if not valid JSON
      }

      await configManager.set(key, parsedValue);
      console.log(
        chalk.green("✓"),
        `Configuration updated: ${key} = ${JSON.stringify(parsedValue)}`,
      );
    } catch (error) {
      console.error(
        chalk.red("Failed to set configuration:"),
        (error as Error).message,
      );
      process.exit(1);
    }
  });

// List command
configCommand
  .command("list")
  .description("List all configuration values")
  .option("--json", "Output as JSON")
  .action(async (options: any) => {
    try {
      const config = await configManager.getAll();

      if (options.json) {
        console.log(JSON.stringify(config, null, 2));
      } else {
        console.log(chalk.cyan.bold("Configuration:"));
        console.log("─".repeat(40));
        for (const [key, value] of Object.entries(config)) {
          console.log(`${chalk.yellow(key)}: ${JSON.stringify(value)}`);
        }
      }
    } catch (error) {
      console.error(
        chalk.red("Failed to list configuration:"),
        (error as Error).message,
      );
      process.exit(1);
    }
  });

// Permissions helper
configCommand
  .command("permissions")
  .description("Get or set permissions.mode (plan|ask|auto)")
  .option("--set <mode>", "Set permissions mode")
  .action(async (options: any) => {
    const key = "permissions.mode";
    if (options.set) {
      const val = String(options.set).toLowerCase();
      if (!["plan", "ask", "auto"].includes(val)) {
        console.error(chalk.red("Invalid mode. Use plan, ask, or auto."));
        process.exit(1);
      }
      await configManager.set(key, val);
      console.log(chalk.green("✓"), `permissions.mode set to ${val}`);
      return;
    }
    const cur = await configManager.getValue(key);
    console.log(chalk.green("✓"), `permissions.mode: ${cur ?? "ask"}`);
  });

// Reset command
configCommand
  .command("reset")
  .description("Reset configuration to defaults")
  .option("--force", "Skip confirmation")
  .action(async (options: any) => {
    try {
      if (!options.force) {
        console.log(
          chalk.yellow("This will reset all configuration to defaults."),
        );
        // Note: In a real implementation, you'd want to add a confirmation prompt here
      }

      await configManager.reset();
      console.log(chalk.green("✓"), "Configuration reset to defaults");
    } catch (error) {
      console.error(
        chalk.red("Failed to reset configuration:"),
        (error as Error).message,
      );
      process.exit(1);
    }
  });

export default configCommand;
