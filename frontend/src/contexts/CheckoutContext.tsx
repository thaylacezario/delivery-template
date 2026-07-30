import { useCallback, useMemo, useState, type ReactNode } from "react";
import { CheckoutContext, initialDraft } from "./checkoutContextDefinition";

interface CheckoutProviderProps {
    children: ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
    const [draft, setDraft] = useState(initialDraft);

    const updateDraft = useCallback((updates: Partial<typeof initialDraft>) => {
        setDraft((current) => ({ ...current, ...updates }));
    }, []);

    const clearDraft = useCallback(() => {
        setDraft(initialDraft);
    }, []);

    const value = useMemo(
        () => ({ draft, updateDraft, clearDraft }),
        [draft, updateDraft, clearDraft],
    );

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
}

export default CheckoutProvider;