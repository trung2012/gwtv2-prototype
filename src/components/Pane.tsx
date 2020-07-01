import React, { useState } from "react";
import { IPane, IAction, getAction } from "../utils/GwtParser";
import { IChoiceGroupOption, ChoiceGroup } from "@fluentui/react";

interface IPaneProps {
    pane: IPane;
    actions: Array<IAction>;
    onActionSelect: (currentPaneId: number, targetPaneId: number, currentPaneIndex: number) => void;
    index: number;
}

const Pane: React.FC<IPaneProps> = ({
    pane,
    onActionSelect,
    actions: allActions,
    index
}) => {
    const [selectedKey, setSelectedKey] = useState<string>('');

    const options: IChoiceGroupOption[] = pane.actionIds.map((actionId) => {
        const action = getAction(allActions, actionId);

        return {
            key: action.id.toString(),
            text: action.title,
            paneId: action.paneId
        }
    })

    const onChange = React.useCallback((ev, option) => {
        setSelectedKey(option.key);
        onActionSelect(pane.id, option.paneId, index);
    }, [onActionSelect, pane.id, index]);

    return (
        <>
            <h3>{pane.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: pane.content }} />
            <ChoiceGroup selectedKey={selectedKey} options={options} onChange={onChange} />
        </>
    )
};

export default Pane;