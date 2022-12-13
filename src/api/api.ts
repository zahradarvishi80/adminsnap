import axios from "axios";

import { redirectLocation } from "@taban/route";
export class Api {
    public constructor(input: {
        path: string;
        method: "get" | "post" | "put" | "patch" | "delete";
        body?: any;
        header?: any;
        params?: any;
    }) {
        this.path = input.path;
        this.method = input.method;
        this.body = input.body;
        this.header = input.header;
        this.params = input.params;
    }
    private _uri: string = String(process.env.REACT_APP_API_URL);
    private _path: string = "";
    private _params: string = "";
    private _method: "get" | "post" | "put" | "patch" | "delete" = "get";
    private _body?: any;
    private _header?: any;
    private _queryParams?: any;
    public get url(): string {
        return this._uri;
    }
    public set path(path: string) {
        this._path = path;
    }
    public get path(): string {
        return this._path;
    }
    public set params(params: any) {
        this._params = params;
    }
    public get params(): any {
        return this._params;
    }

    public set method(method: "get" | "post" | "put" | "patch" | "delete") {
        this._method = method;
    }
    public get method() {
        return this._method;
    }

    public set body(body: any) {
        this._body = body;
    }
    public get body() {
        return this._body;
    }
    public get header() {
        return this._header;
    }
    public set header(header: any) {
        this._header = header;
    }
    public get queryParams(): string {
        return this._queryParams;
    }

    async call() {
        return new Promise((resolve, reject) => {
            axios({
                method: this.method,
                url: this.url + this.path,
                headers: this.header,
                data: this.body,
                params: this.params,
            })
                .then((data) => {
                    resolve(data.data);
                })
                .catch((data) => {
                    const code = data.response.status;                    
                    if (code === 401) {
                        localStorage.clear();
                        redirectLocation("/login");
                    } else {
                        reject(data.response);
                    }
                });
        });
    }
}
