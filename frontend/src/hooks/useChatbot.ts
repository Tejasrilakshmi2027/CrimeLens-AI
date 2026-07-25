import { useState } from "react";

import { askQuestion } from "../api/chatbot";

import type { ChatResponse } from "../types";

export function useChatbot() {
    const [loading, setLoading] =
        useState<boolean>(false);

    const [response, setResponse] =
        useState<ChatResponse | null>(null);

    const [error, setError] =
        useState<string>("");

    const ask = async (
        question: string
    ): Promise<void> => {
        try {
            setLoading(true);

            const result =
                await askQuestion({ question });

            setResponse(result);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unknown error"
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        ask,
        response,
        loading,
        error,
    };
}