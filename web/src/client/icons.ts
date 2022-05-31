export interface Svg {
    readonly viewBox: string;
    readonly path: string;
}

const icons = {
    "default": {
        path: "m 95.488914,65.095139 a 12,12.000001 0 0 1 -12,12 12,12.000001 0 0 1 -12,-12 12,12.000001 0 0 1 12,-12 12,12.000001 0 0 1 12,12 z"
    },
    "entrance": {
        path: "M 7.3533391,4.7462313 C 6.8414996,4.8433763 6.4369515,5.3418302 6.4460945,5.8628399 V 9.2126656 H 8.6793118 V 6.9794484 H 16.495571 V 17.028925 H 8.6793118 V 14.795708 H 6.4460945 v 3.349826 c 1.105e-4,0.584656 0.5319839,1.116497 1.1166086,1.116609 H 17.61218 c 0.584625,-1.12e-4 1.116498,-0.531953 1.116609,-1.116609 V 5.8628399 C 18.728678,5.2781836 18.196805,4.7463429 17.61218,4.7462313 H 7.5627032 c -0.069582,-0.011166 -0.1397812,-0.011166 -0.2093641,0 z M 9.7959206,8.096057 v 2.233217 H 4.2128775 V 13.6791 h 5.5830431 v 2.233217 l 5.5830424,-3.90813 z"
    }
}

export default icons;