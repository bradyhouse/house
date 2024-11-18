export interface LoadingAnimeOptions {
  isDataValid?:boolean;   // validation flag that enables message text
  error?:string;          // error display message
  warning?:string;        // warning display message
  isLoading?:boolean;     // anime on/off flag
  cssClass?:string;       // template css class override
}
