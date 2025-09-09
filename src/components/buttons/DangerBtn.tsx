import type {ReactNode} from "react";
import CustomBtn from "./CustomBtn.tsx";

function DangerBtn({label, icon, onClick, extraClass, tooltip, submit, disabled, resize =true}:
                    {
                        label?: string,
                        icon?: ReactNode,
                        onClick?: () => void,
                        extraClass?: string,
                        tooltip?: string,
                        submit?: boolean,
                        disabled?: boolean,
                        resize? : boolean
                    }) {

    const labelClass = resize?"hidden md:inline":"inline";

    return (
        <CustomBtn label={label}
                   labelClass={labelClass}
                   icon={icon && <span>{icon}</span>}
                   onClick={onClick}
                   extraClass={`bg-red-500 text-white rounded p-2  ${extraClass}`}
                   tooltip={tooltip} submit={submit}
                   disabled={disabled}

        />
    )
}

export default DangerBtn;