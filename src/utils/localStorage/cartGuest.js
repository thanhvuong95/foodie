export const addCartLocal = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if(!cart) {
        const newCart = {data:[{...item, quantity:1}], totalQty:1, totalAmount:item.price}
        localStorage.setItem('cart', JSON.stringify(newCart))
    }
    else {
        const index = cart.data.findIndex(cartItem => cartItem.id === item.id)
        if(index === -1) {
            cart.data.push({...item, quantity: 1})
        }
        else {
            cart.data[index].quantity ++
        }
        cart.totalQty++
        cart.totalAmount+=item.price
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}
export const updateCartLocal = (id, type) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const index = cart.data.findIndex(cartItem => cartItem.id === id)
    if(type === 'DECREASE') {
        cart.data[index].quantity--
        cart.totalQty--
        cart.totalAmount -= cart.data[index].price
    }
    else {
        cart.data[index].quantity++
        cart.totalQty++
        cart.totalAmount += cart.data[index].price
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}
export const removeCartLocalById = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const index = cart.data.findIndex(cartItem => cartItem.id === id)
    cart.totalQty -= cart.data[index].quantity
    cart.totalAmount-= cart.data[index].quantity * cart.data[index].price
    if(cart.data.length >1) {
        cart.data.splice(index,1)
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    else
        localStorage.removeItem('cart')
}
