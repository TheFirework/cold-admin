const asyncLoadScript = (src,existVariable,callback) => {
    const existingScript = document.getElementById(src)
    const cb = callback || function () {}

    if (!existingScript) {
        const script = document.createElement('script')
        script.src = src
        script.id = src
        document.body.appendChild(script)
        script.onload = function () {
            // this.onload = null here is necessary
            // because even IE9 works not like others
            this.onerror = this.onload = null
            cb(null, script)
        }
        script.onerror = function () {
            this.onerror = this.onload = null
            cb(new Error('Failed to load ' + src), script)
        }
    }

    if (existingScript && cb) {
        if (existVariable) {
            cb(null, existingScript)
        }
    }
}

export default asyncLoadScript