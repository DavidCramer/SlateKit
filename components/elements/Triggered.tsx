import React, {useEffect, useState} from "react";
import {useEventBus} from "../../contexts/EventContext";

export default function Triggered({path, triggeredBy, children}) {
    const {on, off} = useEventBus();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handler = () => setVisible(true);
        on(triggeredBy, handler);
        return () => off(triggeredBy, handler);
    }, [path, triggeredBy]);

    if (!visible) return null;
    return <>{children}</>;
}
