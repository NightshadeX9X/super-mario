import { Lib } from "./main.js";
export default class Loader {
    constructor() {
        this.urls = new Lib.Collection();
        this._paths = new Lib.Collection();
    }
    async image(_url) {
        let path = this._paths.get('image');
        let url = ((path !== null && path !== void 0 ? path : "")) + _url;
        return new Promise(async (res) => {
            let get = this.urls.get(url);
            if (get !== undefined)
                res(get);
            else {
                let image = new Image();
                image.addEventListener('load', () => { res(image); this.urls.set(url, image); });
                image.src = url;
            }
        });
    }
    async file(_url, type) {
        let url = _url;
        let get = this.urls.get(url);
        if (get !== undefined)
            return (get);
        else {
            let fetched = await fetch(url);
            let data = await fetched[type]();
            return data;
        }
    }
    async json(_url) {
        let path = this._paths.get('json');
        let url = ((path !== null && path !== void 0 ? path : "")) + _url;
        let json = await this.file(url, 'json');
        return json;
    }
    async text(_url) {
        let path = this._paths.get('text');
        let url = ((path !== null && path !== void 0 ? path : "")) + _url;
        let string = await this.file(url, 'text');
        return string;
    }
    async blob(_url) {
        let path = this._paths.get('blob');
        let url = ((path !== null && path !== void 0 ? path : "")) + _url;
        let blob = await this.file(url, 'blob');
        return blob;
    }
    get paths() {
        return this._paths;
    }
}
