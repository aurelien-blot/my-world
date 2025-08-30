import type {ReactNode} from "react";

function CustomBtn({label, labelClass, icon, onClick, extraClass, tooltip, submit}:
                   {
                       icon?: ReactNode,
                       label? : string,
                       labelClass?: string,
                       tooltip? : string,
                       onClick?: () => void,
                       extraClass?: string,
                       submit?: boolean,
                       buttonAdditionalClass?: string,

                   }) {
    return (
        <button className={`flex items-center md:space-x-2 justify-center hover:cursor-pointer ${extraClass}`}
                onClick={onClick}
                title={tooltip || label || ""}
                type={submit ? "submit" : "button"}>
            {icon && <span>{icon}</span>}
            {label && <span className={labelClass}>{label}</span>}
        </button>
    )

}

export default CustomBtn;