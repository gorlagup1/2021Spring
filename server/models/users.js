/* B"H
*/
const bcrypt = require('bcrypt');

const list = [
    { 
        firstName: 'Pavani',
        lastName: 'Gorlagunta',
        handle: '@gorlagup1',
        pic: 'https://bulma.io/images/placeholders/96x96.png',
        password: 'Me',
    },
    { 
        firstName: 'Kamala',
        lastName: 'Harris',
        handle: '@vp',
        pic: 'https://bulma.io/images/placeholders/96x96.png',
        password: 'Her',
    },
    { 
        firstName: 'John',
        lastName: 'Smith',
        handle: '@johnsmith',
        pic: 'https://bulma.io/images/placeholders/96x96.png',
        password: 'BeepBop',
    },

];

module.exports.GetAll = ()=> list;
module.exports.Get = (user_id)=> list[user_id];
module.exports.GetByHandle = (handle)=> ({ ...list.find( (x, i)=> x.handle == handle ), password: undefined }) ;
module.exports.Add = (user)=> {
    if(!user.firstName){
        throw { code: 422, msg: "First Name is required" }
    }
     list.push(user);
     return { ...user, password: undefined };
}
module.exports.Register = async (user)=> {

    const hash = await bcrypt.hash(user.password, 8);

    user.password = hash;

    if(!user.firstName){
        throw { code: 422, msg: "First Name is required" }
    }

    list.push(user);
    return { ...user, password: undefined };

}
module.exports.Update = (user_id, user)=> {
    const oldObj = list[user_id];
    if(user.firstName){
        oldObj.firstName = user.firstName;
    }
    if(user.lastName){
        oldObj.lastName = user.lastName;
    }
    if(user.handle){
        oldObj.handle = user.handle;
    }
    if(user.pic){
        oldObj.pic = user.pic;
    }
    //list[user_id] = newObj ;
    return { ...oldObj, password: undefined };
}
module.exports.Delete = (user_id)=> {
    const user = list[user_id];
    list.splice(user_id, 1);
    return user;
}

module.exports.Login = (handle, password) =>{
    console.log({ handle, password})
    const user = list.find(x=> x.handle == handle && x.password == password);
    if(!user) throw { code: 401, msg: "Wrong Username or Password" };

    return user;
}