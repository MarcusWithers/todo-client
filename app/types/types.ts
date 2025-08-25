export enum Routes {
    HOME = "/",
    CREATE_TASK = "/create-task",
    EDIT_TASK = "/edit-task"
}

export enum Colors {
    RED = '#ff3b30',
    ORANGE = '#ff9500',
    YELLOW = '#ffcc00',
    GREEN = '#34c759',
    BLUE = '#007aff',
    INDIGO = '#5856d6',
    PURPLE = '#af52de',
    PINK = '#ff2d55',
    BROWN = '#a2845e',
}

export type ColorName =
    | 'RED'
    | 'ORANGE'
    | 'YELLOW'
    | 'GREEN'
    | 'BLUE'
    | 'INDIGO'
    | 'PURPLE'
    | 'PINK'
    | 'BROWN';

export type Task = {
    id?: number
    title: string
    color: ColorName
    completed?: boolean
}