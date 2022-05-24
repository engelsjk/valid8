import type { Theme } from 'theme-ui'

export const heights = {
    header: "48px"
};

export const theme: Theme = {
    fonts: {
        body: 'Verdana, sans-serif',
        heading: 'Verdana, sans-serif',
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