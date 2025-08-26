import Image from "next/image"
import { Colors, Task as TaskType } from "../../types/types"

type Props = {
    task: TaskType
    onClick: (task: TaskType) => void
    onToggleCompleted: (task: TaskType) => void
    onDelete: (e: React.MouseEvent, task: TaskType) => void
}

export const Task = (props: Props) => {
    return (
        <div
            role="button"
            tabIndex={0}
            className='flex justify-between items-center break-words break-all bg-[#262626] p-4 rounded-lg border-[#2f2f2f] hover:cursor-pointer'
            key={props.task.id}
            onClick={() => {props.onClick(props.task)}}
        >
            <div className='flex items-start gap-3 flex-1 min-w-0'>
                {(() => {
                    const borderColor = props.task.color ? Colors[props.task.color] : Colors.BLUE
                    const backgroundColor = props.task.completed ? borderColor : 'transparent'
                    return (
                        <div
                            className='h-[24px] w-[24px] flex items-center justify-center hover:cursor-pointer focus:outline-none flex-shrink-0'
                            aria-label={props.task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                            onClick={e => { e.stopPropagation(); props.onToggleCompleted(props.task) }}
                            role='button'
                        >
                            <div
                                className='rounded-full w-[18px] h-[18px] border-2 flex items-center justify-center'
                                style={{ borderColor, backgroundColor }}
                            >
                                {props.task.completed && (
                                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 6.5L5.5 9L9 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    )
                })()}
                <p className={`text-gray-50 text-left flex-1 min-w-0 break-words ${props.task.completed ? ' line-through opacity-60' : ''}`} key={props.task.id}>{props.task.title}</p>
            </div>
            <div className='flex-shrink-0 ml-2 flex items-center'>
                <button type='button' className='flex items-center justify-center hover:cursor-pointer h-[24px] w-[24px]' onClick={(e) => props.onDelete(e, props.task)}>
                    <Image src='/Trash.svg' alt='Trash icon' width={16} height={16} /> 
                </button>
            </div>
        </div>
    )
}