export default{
    methods: {
        captalizeName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1)
        },
        zeroEsquerda(numero) {
            return numero.toString().padStart(4, '0');
        },
    },
}