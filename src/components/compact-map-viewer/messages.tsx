import React from "react";

/**
 * Provides a context for other compact map viewer components to report messages to
 * 
 * @since 0.15
 */
export type MapMessageContext = {
    addInfo: (message: string) => void;
    addWarning: (message: string) => void;
    addError: (message: string) => void;
    infoMessages: string[];
    warningMessages: string[];
    errorMessages: string[];
};

const OLMapMessageContext = React.createContext<MapMessageContext>({
    addInfo: () => { },
    addWarning: () => { },
    addError: () => { },
    infoMessages: [],
    warningMessages: [],
    errorMessages: []
});

/**
 * Provides a context for other compact map viewer components to report messages to
 * 
 * @since 0.15
 */
export const MapMessageContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [infoMessages, setInfoMessages] = React.useState<string[]>([]);
    const [warningMessages, setWarningMessages] = React.useState<string[]>([]);
    const [errorMessages, setErrorMessages] = React.useState<string[]>([]);

    const provider: MapMessageContext = {
        addInfo: msg => setInfoMessages(messages => [...messages, msg]),
        addWarning: msg => setWarningMessages(messages => [...messages, msg]),
        addError: msg => setErrorMessages(messages => [...messages, msg]),
        infoMessages: infoMessages,
        warningMessages: warningMessages,
        errorMessages: errorMessages
    };

    return <OLMapMessageContext.Provider value={provider}>
        {children}
    </OLMapMessageContext.Provider>
}

export const useMapMessage = () => {
    return React.useContext(OLMapMessageContext);
}

const Messages: React.FC<{ title: string, messages: string[], onClose: () => void }> = ({ title, messages, onClose }) => {
    return <div style={{ padding: 10, background: 'white', position: 'absolute', top: 50, left: 30 }}>
        <h3>{title}</h3>
        <div style={{ padding: 10, width: 300, maxHeight: 200, overflow: 'auto' }}>
            {messages.map((v, i) => <p key={`message-${i}`}>{v}</p>)}
        </div>
        <button onClick={() => onClose()}>Close</button>
    </div>
};

/**
 * A component that assists in debugging by displaying any messages reported by other compact map viewer components
 * 
 * @since 0.15
 */
export const MapMessages: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
    const messages = useMapMessage();
    const [infoVisible, setInfoVisible] = React.useState(false);
    const [warnVisible, setWarnVisible] = React.useState(false);
    const [errorVisible, setErrorVisible] = React.useState(false);
    return <>
        <div style={{ display: 'inline-flex', position: 'absolute', top: 30, left: 30, ...style }}>
            <button onClick={() => setInfoVisible(!infoVisible)}>I: {messages.infoMessages.length}</button>
            <button onClick={() => setWarnVisible(!warnVisible)}>W: {messages.warningMessages.length}</button>
            <button onClick={() => setErrorVisible(!errorVisible)}>E: {messages.errorMessages.length}</button>
        </div>
        {infoVisible && <Messages title="Info Messages" messages={messages.infoMessages} onClose={() => setInfoVisible(false)} />}
        {warnVisible && <Messages title="Warning Messages" messages={messages.warningMessages} onClose={() => setWarnVisible(false)} />}
        {errorVisible && <Messages title="Error Messages" messages={messages.errorMessages} onClose={() => setErrorVisible(false)} />}
    </>
}