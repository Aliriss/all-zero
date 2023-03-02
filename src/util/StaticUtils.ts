export class StaticUtils {
    static isEmpty(a: any) {
        if (a === '') return true;
        if (a === 'null') return true;
        if (a === 'undefined') return true;
        if (!a && a !== 0 && a !== '') return true;
        if (Array.prototype.isPrototypeOf(a)) {
            if (a.length === 0) {
                return true;
            } else {
                let flag = false
                a.forEach((v: any) => {
                    if (this.isEmpty(v)) {
                        flag = true;
                    }
                });
                return flag;
            }
        }
        return Object.prototype.isPrototypeOf(a) && Object.keys(a).length === 0;
    }

    static isNotEmpty(a: any) {
        return this.isEmpty(a)
    }
}
