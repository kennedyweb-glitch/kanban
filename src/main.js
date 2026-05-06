import Alpine from 'alpinejs'
import './styles/main.css'

window.Alpine = Alpine

Alpine.data('counterApp', () => ({
    count: 0,
    decrement() {
        this.count -= 1
    },
    increment() {
        this.count += 1
    },
    reset() {
        this.count = 0
    },
}))

Alpine.start()
