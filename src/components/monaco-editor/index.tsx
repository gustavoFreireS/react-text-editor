import React, { createRef } from 'react';
import * as monaco from "monaco-editor";
import * as Babel from '@babel/standalone';
export interface Props { }
export class MonacoEditor extends React.Component<Props, {}> {
  private editor = createRef<HTMLDivElement>();
  private frame = createRef<HTMLIFrameElement>();
  private mEdit: any;

  handleClick() {
    let value: any = this.mEdit.getValue();
    const scripto = this.frame.current.contentDocument.getElementById('script');
    this.frame.current.contentDocument.body.removeChild(scripto);
    var myscript = this.frame.current.contentDocument.createElement('script');
    myscript.type = 'text/javascript';
    myscript.id = 'script';
    myscript.text = Babel.transform(value, { presets: ['es2015', 'react'], }).code;
    var innerDoc = this.frame.current.contentWindow.document.body;
    innerDoc.appendChild(myscript);
  }
  componentDidMount() {
    let myCode: string = (
      `ReactDOM.render(
  <h1>just a test</h1> ,
  document.getElementById("app")
);`
    );
    function colorize() {
      setTimeout(() => {
        let taglist: any = document.querySelectorAll(".mtk9");
        taglist.forEach((element: any) => {
          if (element.innerHTML == '&lt;') {
            element.nextElementSibling.style.color = "#e06c75";
          }
        });
        taglist.forEach((element: any) => {
          if (element.innerHTML == '&gt;') {
            if (element.previousElementSibling.className == 'mtk1') {
              element.previousElementSibling.style.color = "#e06c75";
            }
          }
        });
      }, 300
      );
    }
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: true
    })
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      typeRoots: ["node_modules/@types"],
      jsx: monaco.languages.typescript.JsxEmit.React
    });
    monaco.editor.onDidCreateEditor(colorize);
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `export declare function next() : string`,
      'node_modules/@types/external/index.d.ts');
    this.mEdit = monaco.editor.create(this.editor.current, {
      language: "typescript",
      theme: "vs-dark",
      fontSize: 15,
      model: monaco.editor.createModel(myCode, "javascript", monaco.Uri.file("./text.jsx"))
    }
    );
    this.mEdit.onDidChangeModelContent(colorize);

  }
  render() {
    return (
      <div>
        <div className='button-bar'>
          <button onClick={() => this.handleClick()}>Run ▶ </button>
        </div>
        <div className="editor" ref={this.editor} />
        <iframe className='frame' sandbox='allow-scripts allow-same-origin' ref={this.frame} src='./src/components/monaco-editor/sample.html'>
        </iframe>
      </div>
    );
  }
}