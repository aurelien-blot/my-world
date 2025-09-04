import type {ReactNode} from "react";
import CustomBtn from "./CustomBtn.tsx";

function PrimaryBtn({label, icon, onClick, extraClass, tooltip, submit, disabled, resize =true}:
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
                   extraClass={`bg-blue-500 rounded p-2 m-2 ${extraClass}`}
                   tooltip={tooltip} submit={submit}
                   disabled={disabled}

        />
    )
}

export default PrimaryBtn;