
class NotGenericUserRepository {
    private _url : string;
    constructor(url : string) {
        this._url = url;
    }
    public getAsync() {
        return Q.Promise((resolve : (user : User[]) => void, reject) => {
            $.ajax({
                url: this._url,
                type: "GET",
                dataType: "json",
                success: (data) => {
                    var users = <User[]>data.items;
                    resolve(users);
                },
                error: (e) => {
                    reject(e);
                }
            })
        })
    }

}