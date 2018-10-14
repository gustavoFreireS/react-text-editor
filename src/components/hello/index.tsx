import * as React from "react";
import './style.scss';
import {MonacoEditor} from "../monaco-editor"

export interface HomeProps {}

export const Home = (props: HomeProps) => (
  <div>
    <h1>React live editor </h1>
    <p> A React/typescript based code editor for React framework</p>
    <MonacoEditor />
  </div>
);