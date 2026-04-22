'use client'
import { useState } from "react";

type Props = {
    content: string;
    isOwn?: boolean;
};

export default function Message({ content, isOwn }: Props) {

    return (
        <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
            <div
                className={`px-4 py-2 rounded-lg max-w-xs ${isOwn ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
            >
                {content}
            </div>
        </div>
    );
}