export function importPages() {
    const pages = import.meta.globEager("/src/**/pages/**/*.vue")
    for (const key in pages) {
        pages[key.slice(5)] = pages[key]
        delete pages[key]
    }
    return pages
}

export function importPageUrl(){
    const pages = import.meta.globEager("/src/**/pages/**/*.vue")
    const files = Object.keys(pages).map(e=>({value: e.substr(5),}))
    return files
}