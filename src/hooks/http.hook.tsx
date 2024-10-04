import { useCallback, useState } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const request = useCallback(async (url: string, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

           setLoading(false);
           return data;

        } catch (e: unknown) {
            setLoading(false);
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('An unknown error occurred');
            }
            throw e;
        }

    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error ,clearError}
}