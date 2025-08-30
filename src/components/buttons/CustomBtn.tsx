import type {ReactNode} from "react";

function CustomBtn({label, labelClass, icon, onClick, extraClass, tooltip, submit, disabled}:
                   {
                       icon?: ReactNode,
                       label?: string,
                       labelClass?: string,
                       tooltip?: string,
                       onClick?: () => void,
                       extraClass?: string,
                       submit?: boolean,
                       buttonAdditionalClass?: string,
                       disabled?: boolean,
                       disabledClass?: string

                   }) {

    const basicClass ="flex items-center md:space-x-2 justify-center hover:cursor-pointer "
    const disabledClass = disabled ? " opacity-50 cursor-not-allowed " : ""

    return (
        <button className={` ${basicClass} ${extraClass}  ${disabledClass}`}
                onClick={onClick} disabled={disabled??false}
                title={tooltip || label || ""}
                type={submit ? "submit" : "button"}>
            {icon && <span>{icon}</span>}
            {label && <span className={labelClass}>{label}</span>}
        </button>
    )

}

export default CustomBtn;