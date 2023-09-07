"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { trace } from "@opentelemetry/api"

const CreateForm = () => {
    const router = useRouter();

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [priority, setPriority] = useState("low")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Create a tracing span for the handleSubmit function
        await trace.getTracer('next-app').startActiveSpan('handleSubmit', async (span) => {
            try {
                const ticketBody = { title, body, priority, user_email: "Admin@admin.com" };

                // Your existing logic for making the API request
                const response = await fetch('http://localhost:4000/tickets', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(ticketBody),
                });

                // Log trace and span information
                console.log('Trace ID:', span.spanContext().traceId);
                console.log('Span ID:', span.spanContext().traceState);

                if (response.status === 201) {
                    router.push('/tickets');
                }
            } catch (error) {
                // Handle any errors here
                console.error('Error:', error);
            } finally {
                span.end(); // End the tracing span
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-1/2">
            <label>
                <span>Title:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} />
            </label>
            <label>
                <span>Description:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setBody(e.target.value)}
                    value={body} />
            </label>
            <label>
                <span>Priority:</span>
                <select
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
            </label>

            <button className="btn-primary"
                disabled={isLoading}>
                {isLoading && <span>Adding Ticket</span>}
                {!isLoading && <span>Add Ticket</span>}

            </button>
        </form>
    )
}

export default CreateForm