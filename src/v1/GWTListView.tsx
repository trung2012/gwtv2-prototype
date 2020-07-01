import React, { Component, useState } from "react";
import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import {
  getAction,
  getPane,
  IAction,
  IPane,
  parseActions,
  parsePanes
} from "../utils/GwtParser";
// import { getHelpService } from "./DiagnosticServices";
// import GWTCameraDiagnostic from "../v1/GWTCameraDiagnostic";
// import { DiagnosticServices } from "../v1/DiagnosticServices";

interface IListViewProps {
  gwtDocument: Object;
}

interface IListViewState {
  panesToShow: number[];
  isDiagnosticRunning: boolean;
  target: string | null
}

export class ListView extends Component<
  IListViewProps,
  IListViewState
  > {
  constructor(props: IListViewProps) {
    super(props);
    this.state = {
      panesToShow: [1],
      isDiagnosticRunning: false,
      target: null
    };
  }

  setTarget = (target: string) => {
    this.setState({ target });
  }

  setDiagnosticRunning = () => {
    this.setState({ isDiagnosticRunning: true });
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
    const { gwtDocument } = this.props;
    const { onActionSelect, setDiagnosticRunning } = this;
    const { isDiagnosticRunning } = this.state;

    return (
      <div>
        <h1>Windows Activation GWT App</h1>
        <ol>
          {this.state.panesToShow.map((paneId: number) => {
            return (
              <li key={paneId}>
                <GwtPane
                  pane={getPane(parsePanes(gwtDocument), paneId)}
                  actions={parseActions(gwtDocument)}
                  onActionSelect={onActionSelect}
                  isDiagnosticRunning={isDiagnosticRunning}
                  setDiagnosticRunning={setDiagnosticRunning}
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
  isDiagnosticRunning: boolean;
  setDiagnosticRunning: () => void;
}

const GwtPane: React.FC<IGwtPaneProps> = ({
  pane,
  onActionSelect,
  actions: allActions
}) => {

  const [selectedKey, setSelectedKey] = useState<string>('');
  // const [isButtonVisible, setIsButtonVisible] = useState(true);

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
      <div dangerouslySetInnerHTML={{ __html: pane.content }} />
      {/* {
        pane.title.toLowerCase().includes('great') &&
        (
          isDiagnosticRunning && target === 'initialNumberOfCameras'
            ? <Spinner style={{ display: 'inline-flex' }} size={SpinnerSize.large} label='Diagnostics running. Please wait...' />
            :
            (
              isButtonVisible ?
                <PrimaryButton
                  name='initialNumberOfCameras'
                  text='Run Diagnostic'
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    const { name } = event.currentTarget;
                    setDiagnosticRunning();
                    setIsButtonVisible(false);
                    setTarget(name)
                    setTimeout(() => {
                      setNumberOfCameras(name, DiagnosticServices.numberofcameras());
                    }, 2500)
                  }} />
                : (
                  initialNumberOfCameras !== null &&
                  <p>Number of cameras detected: {initialNumberOfCameras === -1 ? 'None' : initialNumberOfCameras}</p>
                )
            )
        )
      }
      {
        pane.content && pane.content[0] &&
        (
          pane.content[0].toLowerCase().includes('execute')
            ? <GWTCameraDiagnostic
              initialNumberOfCameras={initialNumberOfCameras}
              followUpNumberOfCameras={followUpNumberOfCameras}
              setNumberOfCameras={setNumberOfCameras}
              isDiagnosticRunning={isDiagnosticRunning}
              setDiagnosticRunning={setDiagnosticRunning}
              target={target}
              setTarget={setTarget}
            />
            : <div dangerouslySetInnerHTML={{ __html: pane.content }} />
        )
      } */}
      <ChoiceGroup selectedKey={selectedKey} options={options} onChange={onChange} />
    </>
  )
};