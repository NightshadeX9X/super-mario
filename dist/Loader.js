import { Lib } from "./main.js";
export default class Loader {
    constructor() {
        this.urls = new Lib.Collection();
        this._paths = new Lib.Collection([{ key: 'json', value: '' }, { key: 'text', value: '' }, { key: 'blob', value: '' },]);
    }
    async image(url) {
        return new Promise(async (res) => {
            let get = this.urls.get(url);
            if (get !== undefined)
                res(get);
            else {
                let image = new Image();
                image.addEventListener('load', () => res(image));
                image.src = url;
                this.urls.set(url, image);
            }
        });
    }
    async file(url, type) {
        let get = this.urls.get(url);
        if (get !== undefined)
            return (get);
        else {
            let fetched = await fetch(url);
            let data = await fetched[type]();
            return data;
        }
    }
    async json(url) {
        let path = this._paths.get('json');
        let json = await this.file(path + url, 'json');
        return json;
    }
    async text(url) {
        let path = this._paths.get('text');
        let string = await this.file(path + url, 'text');
        return string;
    }
    async blob(url) {
        let path = this._paths.get('blob');
        let blob = await this.file(path + url, 'blob');
        return blob;
    }
    get paths() {
        return this._paths;
    }
}
