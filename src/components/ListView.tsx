import React, { Component } from "react";
import {
  getPane,
  IAction,
  IPane,
  parseActions,
  parsePanes,
  IExecutionPane
} from "../utils/GwtParser";
import ExecutionPane from "./ExecutionPane";
import Pane from "./Pane";

interface IListViewProps {
  gwtDocument: Object;
}

interface IListViewState {
  panes: IPane[],
  actions: IAction[],
  panesToShow: number[];
}

export class ListView extends Component<
  IListViewProps,
  IListViewState
  > {
  constructor(props: IListViewProps) {
    super(props);
    this.state = {
      panes: parsePanes(this.props.gwtDocument),
      actions: parseActions(this.props.gwtDocument),
      panesToShow: [1]
    };
  }

  componentDidUpdate() {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth"
    });
  }

  addTargetPaneAfterCurrentPaneInPanes = (
    panes: number[],
    currentPane: number,
    targetPane: number,
    currentPaneIndex: number
  ): number[] => {
    let outputPanes = [];
    for (const [index, pane] of panes.entries()) {
      outputPanes.push(pane);
      if (pane === currentPane && index === currentPaneIndex) break;
    }
    outputPanes.push(targetPane);
    return outputPanes;
  };

  onActionSelect = (currentPaneId: number, targetPaneId: number, currentPaneIndex: number) => {
    console.log("user selected action that leads to pane Id = ", targetPaneId);

    this.setState(prevState => ({
      panesToShow: this.addTargetPaneAfterCurrentPaneInPanes(
        prevState.panesToShow,
        currentPaneId,
        targetPaneId,
        currentPaneIndex
      )
    }));
    console.log("panesToShow = ", this.state.panesToShow);
  }

  isExecutionPane(pane: IPane | IExecutionPane): pane is IExecutionPane {
    return (pane as IExecutionPane).execute !== undefined;
  }

  getPaneKey = (paneId: number, index: number) => {
    return paneId.toString() + index.toString();
  }

  render() {
    const { onActionSelect } = this;
    const { panes, actions } = this.state;

    return (
      <div>
        <h1>GWT App</h1>
        <ol>
          {this.state.panesToShow.map((paneId: number, index) => {
            const pane = getPane(panes, paneId);
            if (this.isExecutionPane(pane)) {
              return (
                <li key={this.getPaneKey(paneId, index)}>
                  <ExecutionPane
                    index={index}
                    pane={pane}
                    actions={actions}
                    onActionSelect={onActionSelect}
                  />
                </li>
              )
            }

            return (
              <li key={this.getPaneKey(paneId, index)}>
                <Pane
                  index={index}
                  pane={pane}
                  actions={actions}
                  onActionSelect={onActionSelect}
                />
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}