'use client'

import { useEffect, useRef, useState } from 'react';
import { Grid, Box, TextField, Button, Typography, Paper, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Home() {

    const [messages, setMessages] = useState([ // messages is an array of objects which contain the role and message content
        {
            role: 'assistant',
            content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
        },
    ])
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const sendMessage = async () => {
        if (!message.trim()) return;    // Don't send empty messages
        setIsLoading(true)

        setMessage('')
        setMessages((messages) => [
            ...messages,
            { role: 'user', content: message },
            { role: 'assistant', content: '' },
        ])

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([...messages, { role: 'user', content: message }]),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const reader = response.body.getReader()
            const decoder = new TextDecoder()

            while (true) {
                const { done, value } = await reader.read()
                if (done) break
                const text = decoder.decode(value, { stream: true })
                setMessages((messages) => {
                    let lastMessage = messages[messages.length - 1]
                    let otherMessages = messages.slice(0, messages.length - 1)
                    return [
                        ...otherMessages,
                        { ...lastMessage, content: lastMessage.content + text },
                    ]
                })
            }
        } catch (error) {
            console.error('Error:', error)
            setMessages((messages) => [
                ...messages,
                { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
            ])
        }
        setIsLoading(false)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            sendMessage()
        }
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <Grid container sx={{ height: '100vh', backgroundColor: '#1e1e1e', color: '#fff', padding: '1rem' }}>

            {/* Left Menu/Dashboard */}
            <Grid item xs={12} md={3} sx={{ padding: '1rem', border: '1px solid #fff' }}>
                <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Typography variant="h6" gutterBottom>
                        Menu/Dashboard
                    </Typography>
                    <Button variant="outlined" startIcon={<SettingsIcon />} sx={{ color: '#fff', borderColor: '#fff' }}>
                        Settings
                    </Button>
                </Box>
            </Grid>

            {/* Chatbot */}
            <Grid item xs={12} md={6} sx={{ padding: '1rem', border: '1px solid #fff' }}>
                <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Typography variant="h6" gutterBottom>
                        Chat Bot
                    </Typography>
                    <Paper sx={{ flexGrow: 1, backgroundColor: '#2c2c2c', padding: '1rem', color: '#fff' }}>
                        <Box
                            width="40vw"
                            height="85vh"
                            marginLeft={7}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Stack
                                direction={'column'}
                                width="875px"
                                height="900px"
                                border='1px solid black'
                                p={2}
                                spacing={3}
                            >
                                <Stack
                                    direction={'column'}
                                    spacing={2}
                                    flexGrow={1}
                                    overflow="auto"
                                    maxHeight="100%"
                                >
                                    {messages.map((message, index) => (
                                        <Box
                                            key={index}
                                            display="flex"
                                            justifyContent={
                                                message.role === 'assistant' ? 'flex-start' : 'flex-end'
                                            }
                                        >
                                            <Box
                                                bgcolor={
                                                    message.role === 'assistant'
                                                        ? 'primary.main'
                                                        : 'secondary.main'
                                                }
                                                color="white"
                                                borderRadius={16}
                                                p={3}
                                            >
                                                {message.content}
                                            </Box>
                                        </Box>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </Stack>
                                <Stack direction={'row'} spacing={2}>
                                    <TextField
                                        placeholder="Type here"
                                        fullWidth
                                        sx={{ marginTop: '1rem', backgroundColor: '#2c2c2c', input: { color: '#fff' }, borderColor: '#fff' }}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        disabled={isLoading}
                                    />
                                    <Button variant="contained" onClick={sendMessage} disabled={isLoading}>
                                        {isLoading ? 'Sending...' : 'Send'}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Paper>

                </Box>
            </Grid>

            {/* Tasks/Calendar */}
            <Grid item xs={12} md={3} sx={{ padding: '1rem', border: '1px solid #fff' }}>
                <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Typography variant="h6" gutterBottom>
                        Tasks
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <Paper sx={{ height: '60%', backgroundColor: '#2c2c2c', padding: '1rem', color: '#fff', marginBottom: '1rem' }}>
                            {/* Task list goes here */}
                        </Paper>
                        <Paper sx={{ height: '30%', backgroundColor: '#2c2c2c', padding: '1rem', color: '#fff' }}>
                            {/* Calendar goes here */}
                        </Paper>
                    </Box>
                    <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff' }}>
                        Manage Tasks
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}