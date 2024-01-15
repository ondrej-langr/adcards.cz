import LazyLoad from 'vanilla-lazyload'


const lazy = new LazyLoad({ elements_selector: '[loading="lazy"]', use_native: true })

// Notice lazy to take care of new elements
document.body.addEventListener('htmx:afterSwap', () => {
    lazy.update()
})