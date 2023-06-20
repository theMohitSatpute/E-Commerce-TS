export class TokenUtil{

    private static SESSION_TOKEN_KEY:string = "contact-mgr-react-jwt-token-key";

    public static saveTokenToSession(token:string):void{
        sessionStorage.setItem(this.SESSION_TOKEN_KEY,token);
    }

    public static getToken():string | null{
        return sessionStorage.getItem(this.SESSION_TOKEN_KEY);
    }

    public static isLoggedIn():boolean{
        const token = this.getToken();
        return !!token;
    }

    public static deleteTokenFromSession():void{
        return sessionStorage.removeItem(this.SESSION_TOKEN_KEY);
    }

}