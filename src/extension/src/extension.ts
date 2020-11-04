import * as vscode from "vscode";
import { Controller } from "./controller";
import { Deploy } from "./deploy";
import { Platform } from "./constants/constants";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.wizardLaunch.local",
      async () => {
        Controller.getInstance(context, Platform.ReactNative);
      }
    ),
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.deployApp.local",
      async () => {
        await Deploy.getInstance(context).deployProject();
      }
    )
  );
}

export function deactivate(): void {
  Controller.dispose();
}
