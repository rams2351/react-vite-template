import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const showErrorMsg = (msg: any) => {
    toast.error(msg)
}

export const showSuccessMsg = (msg: any) => {
    toast.success(msg)
}

export const showInfoMsg = (msg: any) => {
    toast.info(msg)
}
