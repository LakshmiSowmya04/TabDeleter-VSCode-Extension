const vscode = require("vscode");

let closeTabTimer;
const inactiveTabs = new Map();

function activate(context) {
  console.log('Your extension "tab-deleter" is now active!');
  // Show "Hello World" message when the extension activates
  vscode.window.showInformationMessage("Hello World from Tab Deleter!");
  //when explicitly calling
  let disposable = vscode.commands.registerCommand(
    "tab-deleter.tabdeleter",
    () => {
      vscode.window.showInformationMessage("Hello World from Tab Deleter!");
      console.log("Hello World command executed!");
    }
  );

  context.subscriptions.push(disposable);

  startCloseTabTimer();

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        const uri = editor.document.uri.toString();
        // Update last active time
        inactiveTabs.set(uri, Date.now());
      }
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidCloseTextDocument((document) => {
      // Remove closed document from inactive tabs
      inactiveTabs.delete(document.uri.toString());
    })
  );
}

function deactivate() {
  clearInterval(closeTabTimer);
}

function startCloseTabTimer() {
  closeTabTimer = setInterval(async () => {
    const now = Date.now();
    const config = vscode.workspace.getConfiguration();
    const inactiveTime = config.get("tabDeleter.inactiveTime") || 5000; // Default to 5000 ms if not set

    for (const [uri, lastActiveTime] of inactiveTabs.entries()) {
      // Check if the tab has been inactive for more than the specified time
      if (now - lastActiveTime > inactiveTime) {
        await closeInactiveTab(uri);
        inactiveTabs.delete(uri);
      }
    }
  }, 1000); // Check every second
}

async function closeInactiveTab(uri) {
  const editors = vscode.window.visibleTextEditors;
  const tabToClose = editors.find(
    (editor) => editor.document.uri.toString() === uri
  );

  if (tabToClose) {
    await vscode.window.showTextDocument(tabToClose.document.uri);
    await vscode.commands.executeCommand("workbench.action.closeActiveEditor");
    vscode.window.showInformationMessage(
      "Deleted inactive tab by tab-deleter!!!"
    );
    console.log(`Closed inactive tab: ${uri}`);
  }
}

module.exports = {
  activate,
  deactivate,
};
