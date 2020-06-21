import React, { Component, useState } from "react";
import { PrimaryButton, ChoiceGroup, IChoiceGroupOption, Spinner, SpinnerSize } from "@fluentui/react";
import {
  getAction,
  getPane,
  IAction,
  IPane,
  parseActions,
  parsePanes
} from "./GwtParser";
import GWTCameraDiagnostic from "./GWTCameraDiagnostic";
import { getNumberOfCameras } from "./DiagnosticServices";

interface IGwtListViewProps {
  gwtDocument: Object;
}

interface IGwtListViewState {
  panesToShow: number[];
  numberOfCameras: number | null;
  isDiagnosticRunning: boolean;
}

export class GWTListView extends Component<
  IGwtListViewProps,
  IGwtListViewState
  > {
  constructor(props: IGwtListViewProps) {
    super(props);
    this.state = {
      panesToShow: [1],
      numberOfCameras: null,
      isDiagnosticRunning: false
    };
  }

  setDiagnosticLoading = () => {
    this.setState({ isDiagnosticRunning: true });
  }

  setNumberOfCameras = (cameraCount: number) => {
    this.setState({ numberOfCameras: cameraCount, isDiagnosticRunning: false });
  }

  addTargetPaneAfterCurrentPaneInPanes = (
    panes: number[],
    currentPane: number,
    targetPane: number
  ): number[] => {
    let outputPanes = [];
    for (const pane of panes) {
      outputPanes.push(pane);
      if (pane === currentPane) break;
    }
    outputPanes.push(targetPane);
    return outputPanes;
  };

  onActionSelect = (currentPaneId: number, targetPaneId: number) => {
    console.log("user selected action that leads to pane Id = ", targetPaneId);

    this.setState(prevState => ({
      panesToShow: this.addTargetPaneAfterCurrentPaneInPanes(
        prevState.panesToShow,
        currentPaneId,
        targetPaneId
      )
    }));
    console.log("panesToShow = ", this.state.panesToShow);
  }

  render() {
    return (
      <div>
        <h1>Windows Activation GWT App</h1>
        <ol>
          {this.state.panesToShow.map((paneId: number) => {
            return (
              <li key={paneId}>
                <GwtPane
                  pane={getPane(parsePanes(this.props.gwtDocument), paneId)}
                  actions={parseActions(this.props.gwtDocument)}
                  onActionSelect={this.onActionSelect}
                  numberOfCameras={this.state.numberOfCameras}
                  setNumberOfCameras={this.setNumberOfCameras}
                  isDiagnosticRunning={this.state.isDiagnosticRunning}
                  setDiagnosticLoading={this.setDiagnosticLoading}
                />
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

interface IGwtPaneProps {
  pane: IPane;
  actions: Array<IAction>;
  onActionSelect: (currentPaneId: number, targetPaneId: number) => void;
  numberOfCameras: number | null;
  setNumberOfCameras: (cameraCount: number) => void;
  isDiagnosticRunning: boolean;
  setDiagnosticLoading: () => void;
}

const GwtPane: React.FC<IGwtPaneProps> = ({
  pane,
  onActionSelect,
  actions: allActions,
  numberOfCameras,
  setNumberOfCameras,
  isDiagnosticRunning,
  setDiagnosticLoading
}) => {
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const onChange = React.useCallback((ev, option) => {
    setSelectedKey(option.key);
    onActionSelect(pane.id, option.paneId);
  }, [onActionSelect, pane.id]);

  const options: IChoiceGroupOption[] = pane.actionIds.map((actionId) => {
    const action = getAction(allActions, actionId);

    return {
      key: action.id.toString(),
      text: action.title,
      paneId: action.paneId
    }
  })

  return (
    <>
      <h3>{pane.title}</h3>
      {
        pane.title.toLowerCase().includes('great') &&
        (
          isDiagnosticRunning
            ? <Spinner style={{ display: 'inline-flex' }} size={SpinnerSize.large} label='Diagnostics running. Please wait...' />
            :
            (
              isButtonVisible ?
                <PrimaryButton text='Run Diagnostic' onClick={() => {
                  setDiagnosticLoading();
                  setIsButtonVisible(false);
                  setTimeout(() => {
                    setNumberOfCameras(getNumberOfCameras());
                  }, 2500)
                }} />
                : (
                  numberOfCameras !== null &&
                  <p>Number of cameras detected: {numberOfCameras}</p>
                )
            )
        )
      }
      {
        pane.content && pane.content[0] && (
          pane.content[0].toLowerCase().includes('execute') ?
            <GWTCameraDiagnostic numberOfCameras={numberOfCameras} />
            : <div dangerouslySetInnerHTML={{ __html: pane.content }} />
        )
      }
      <ChoiceGroup selectedKey={selectedKey} options={options} onChange={onChange} />
    </>
  )
};