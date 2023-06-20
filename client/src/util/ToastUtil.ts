import {toast} from "react-toastify";

export class ToastUtil{

    public static displaySuccessMessage(msg:string):void{
        toast.success(msg);
    }

    public static displayInfoMessage(msg:string):void{
        toast.info(msg);
    }

    public static displayErrorMessage(msg:string):void{
        toast.error(msg);
    }

    public static displayWarningMessage(msg:string):void{
        toast.warning(msg);
    }
}