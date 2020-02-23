import * as path from "path";
import { exec } from "child_process";

import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    fileUri => {
      const dir = path.dirname(fileUri.fsPath);
      const stylusBin = path.join(
        __dirname,
        "../node_modules/stylus/bin/stylus"
      );
      const command = `node ${stylusBin} -w ${fileUri.fsPath} -o ${dir}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(stdout.toString());
      });
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
