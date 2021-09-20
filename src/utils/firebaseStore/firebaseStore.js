import {db} from '../../firebase/firebaseConfig'
import { doc, setDoc, getDoc,  deleteDoc } from "firebase/firestore";
export const addToFirebase = async(uid, item) => {
        const docSnap = await getDoc(doc(db, "foodie", uid))
        if (docSnap.exists()) {
             const existData = docSnap.data()
             const index = existData.data.findIndex(el => el.id === item.id)
             if(index === -1) {
                 const updatedItem = {...item, quantity:1}
                existData.data.push(updatedItem)
                existData.totalQty++
                existData.totalAmount+=item.price
             }
             else {
                existData.data[index].quantity ++
                existData.totalQty++
                existData.totalAmount+=item.price
             }
            return setDoc(doc(db, "foodie", uid),existData);
        } else {
            // doc.data() will be undefined in this case
            const updatedItem = {data:[{...item, quantity:1}],totalQty:1, totalAmount:item.price}
            return setDoc(doc(db, "foodie", uid),updatedItem);
        }
    }
  

export const getDataFromFirebase = async(uid) => {

        const docSnap = await getDoc(doc(db, "foodie", uid))
        if(docSnap.exists()) {
            return docSnap.data()
        }
        else
            return null
}
export const updateFirebaseWithDataLocal = async (uid, localData) => {
    const docSnap = await getDoc(doc(db, "foodie", uid))
    if(docSnap.exists()) {
        const existData = docSnap.data()
        const diffData = localData.data.slice()
        for(let i = 0; i < existData.data.length; i++) {
            for(let j=0; j < localData.data.length; j++) {
                if(existData.data[i].id === localData.data[j].id) {
                    existData.data[i].quantity += localData.data[j].quantity   
                    const index = diffData.findIndex(item => item.id === localData.data[j].id)      
                    diffData.splice(index,1)
                }
            }
        }
        existData.data = [...existData.data,...diffData]
        existData.totalQty+=localData.totalQty
        existData.totalAmount += localData.totalAmount
        await setDoc(doc(db, "foodie", uid),existData);
    }
    else {
        await setDoc(doc(db, "foodie", uid),localData);
    }
    return await getDataFromFirebase(uid)
}
export const updateDataFirebase = async(uid, id, type) => {
    const docSnap = await getDoc(doc(db, "foodie", uid))
    let {data, totalQty, totalAmount} = docSnap.data()
    const index = data.findIndex(el => el.id === id)
    if(type === 'DECREASE') {
        data[index].quantity--
        totalQty--
        totalAmount-=data[index].price
    }
    else if (type === 'INCREASE') {
        data[index].quantity++
        totalQty++
        totalAmount+=data[index].price
    }
    else if(type === 'DELETE') {
        totalQty -= data[index].quantity
        totalAmount -= data[index].quantity * data[index].price
        data.splice(index, 1)
    }
    await setDoc(doc(db, "foodie", uid),{data,totalQty,totalAmount});
}
export const removeDataFirebaseById = async(uid) => {
    await deleteDoc(doc(db, "foodie", uid));
}