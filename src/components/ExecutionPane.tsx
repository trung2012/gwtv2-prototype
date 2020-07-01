import React, { useState, useEffect, useCallback } from 'react';
import { IExecutionPane, IAction, } from '../utils/GwtParser';
import { getHelpService } from '../utils/DiagnosticServices';
import { Spinner, SpinnerSize, PrimaryButton, Stack } from '@fluentui/react';

interface IExecutionPaneProps {
    pane: IExecutionPane;
    actions: Array<IAction>;
    onActionSelect: (currentPaneId: number, targetPaneId: number, currentPaneIndex: number) => void;
    index: number;
}

const ExecutionPane: React.FC<IExecutionPaneProps> = ({ pane, onActionSelect, index }) => {
    const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);

    const runDiagnostic = useCallback(async (mounted) => {
        setIsDiagnosticRunning(true);

        const executionResult = await getHelpService.getDiagnosticSessionAsync('IssueType', pane.execute.package);
        const expectedResultValue = executionResult[pane.execute.result.key];
        const targetPaneId = pane.execute.result.match[expectedResultValue];

        if (expectedResultValue !== undefined && targetPaneId && mounted.isMounted) {
            onActionSelect(pane.id, targetPaneId, index);
        }

        if (mounted.isMounted) {
            setIsDiagnosticRunning(false);
        }

    }, [
        pane.execute.result.match,
        pane.execute.result.key,
        pane.execute.package,
        pane.id,
        index,
        onActionSelect
    ])

    useEffect(() => {
        let mounted = {
            isMounted: true
        }

        if (!pane.execute.isRenderedAsButton) {
            runDiagnostic(mounted);
        }

        return () => {
            mounted.isMounted = false
        }
    }, [runDiagnostic, pane.execute.isRenderedAsButton])

    const renderPaneContent = () => {
        if (pane.execute.isRenderedAsButton) {
            return (
                <>
                    <div dangerouslySetInnerHTML={{ __html: pane.content }} />
                    <PrimaryButton
                        text={pane.execute.text || 'Run'}
                        onClick={() => runDiagnostic({ isMounted: true })}
                        style={{ marginBottom: 15 }}
                    />
                </>
            )
        }

        return !isDiagnosticRunning && <div dangerouslySetInnerHTML={{ __html: pane.content }} />
    }

    return (
        <Stack horizontalAlign='start' verticalAlign='space-between'>
            <h3>{pane.title}</h3>
            {
                renderPaneContent()
            }
            {
                isDiagnosticRunning &&
                <Spinner
                    size={SpinnerSize.large}
                    label={pane.execute.text || 'Running Diagnostics'}
                    style={{ display: 'inline-flex' }}
                />
            }
        </Stack>
    )
}

export default ExecutionPane;