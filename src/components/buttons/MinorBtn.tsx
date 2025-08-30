import type {ReactNode} from "react";
import CustomBtn from "./CustomBtn.tsx";

function MinorBtn({label, icon, onClick, extraClass, tooltip, submit, disabled}: {
    label?: string,
    icon?: ReactNode,
    onClick: () => void,
    extraClass?: string,
    tooltip?: string,
    submit?: boolean,
    disabled?: boolean
}) {
    return (
        <CustomBtn label={label}
                   labelClass="hidden md:inline"
                   icon={icon && <span className="h-4 w-2">{icon}</span>}
                   onClick={onClick}
                   extraClass={`bg-gray-500 rounded p-2 m-2 ${extraClass}`}
                   tooltip={tooltip} submit={submit}
                   disabled={disabled}
        />
    )
}

export default MinorBtn;