import type { Theme } from 'theme-ui'

export const theme: Theme = {
    fonts: {
        body: 'system-ui, sans-serif',
        heading: '"Avenir Next", sans-serif',
        monospace: 'Menlo, monospace',
    },
    colors: {
        text: '#000',
        background: '#fff',
        primary: '#33e',
    },
    buttons: {
        icon: {

        }
    },
    styles: {
        sidebar: {
            white: {
                bg: "muted",
                boxShadow:
                    "0 0 0 1px rgba(16,22,26,.1), 0 0 0 rgba(16,22,26,0), 0 1px 1px rgba(16,22,26,.2)",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
                height: "100%",
                minWidth: "100px",
                position: "relative",
                color: "gray.8",
                zIndex: 200
            },
        }
    }
};

export default theme;