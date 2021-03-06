"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const codeOutline_1 = require("./outline/codeOutline");
function activate(context) {
    let codeOutline = new codeOutline_1.CodeOutline(context);
    vscode.window.registerTreeDataProvider('codeOutline', codeOutline);
    vscode.commands.registerCommand('codeOutline.refresh', () => {
        codeOutline.refresh();
    });
    vscode.commands.registerCommand('codeOutline.revealRange', (editor, node) => {
        const range = new vscode.Range(node.symbol.location.range.start, node.symbol.location.range.end);
        editor.revealRange(range, vscode.TextEditorRevealType.Default);
        editor.selection = new vscode.Selection(range.start, range.end);
        vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
        changeNodeRange(node);
    });
    function changeNodeRange(node) {
        if (node.state == vscode.TreeItemCollapsibleState.Collapsed) {
            node.setState(vscode.TreeItemCollapsibleState.Expanded);
        }
        else if (vscode.TreeItemCollapsibleState.Expanded) {
            node.setState(vscode.TreeItemCollapsibleState.Collapsed);
        }
    }
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map