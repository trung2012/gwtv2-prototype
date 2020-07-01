export interface IAction {
  id: number;
  title: string;
  paneId: number;
}

export interface IPane {
  id: number;
  title: string;
  content: string;
  actionIds: number[];
}

export interface IExecutionPane {
  id: number;
  title: string;
  content: string;
  actionIds: number[];
  isExecutionPane: boolean;
  execute: IPaneDetails
}

export interface IPaneDetails {
  isRenderedAsButton?: boolean;
  text: string | null;
  package: string;
  result: {
    key: string;
    match: {
      [key: string]: number;
    }
  }
}

export const parsePanes = (gwt: any) => {
  return gwt.panes.map((pane: any) => ({
    id: pane.id,
    title: pane.title,
    content: pane.body[0].content,
    actionIds: pane.actions,
    isExecutionPane: pane.isExecutionPane,
    execute: pane.execute
  }));
};

export const parseActions = (gwt: any) => {
  return gwt.actions.map((action: any) => ({
    id: action.id,
    title: action.title,
    paneId: action.pane
  }));
};

export const getPane = (panes: Array<IPane | IExecutionPane>, paneId: number): IPane | IExecutionPane => {
  // console.log("getPane() called with ", paneId);
  const matchedPanes = panes.filter(pane => pane.id === paneId);
  if (matchedPanes.length === 0)
    throw new Error(
      `Couldnt find action with id = ${paneId} in ${paneId} array`
    );
  // console.log(
  //   `SUCCESS: Found pane ${paneId} in ${panes} array = ${matchedPanes[0]}`
  // );
  return matchedPanes[0];
};

export const getAction = (
  actions: Array<IAction>,
  actionId: number
): IAction => {
  // console.log("getAction() called with ", actionId);
  const matchedActions = actions.filter(action => action.id === actionId);
  if (matchedActions.length === 0)
    throw new Error(
      `Couldnt find action with id = ${actionId} in ${actions} array`
    );
  // console.log(
  //   `SUCCESS: Found action ${actionId} in ${actions} array = ${
  //     matchedActions[0]
  //   }`
  // );
  return matchedActions[0];
};
