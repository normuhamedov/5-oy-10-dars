// //  Kanal linki =   https://t.me/+gc9Yi8Zjfww3MzUy

let elProductsList = document.querySelector(".products-list")

const TOKEN = "7983576287:AAFKqe-uL5B_oPUm4gG1tE2HbAl7aPKZgME"
const CHAT_ID = "-1002483127083"
const HTTPPhoto = `https://api.telegram.org/bot${TOKEN}/sendPhoto`



async function getProducts(API){
    const promise = new Promise((resolve, reject) => {
        axios.get(API).then(res => {
            resolve(res.data.products);
        })
    })
    return promise
}



getProducts("https://dummyjson.com/products").then(result => {
    result.map(item => {
        let elItem = document.createElement("li");
        elItem.className = "w-[300px] p-2 rounded-md bg-slate-200";
        elItem.innerHTML = `
            <img class="mb-2 h-[300px] object-contain" src="${item.images[0]}" alt="Product img" width="300" height="300" />
            <h2 class="line-clamp-1 font-bold text-[22px] mb-2">${item.title}</h2>
            <p class="text-slate-400 line-clamp-3">${item.description}</p>
            <div class="flex items-center justify-between mt-5">
                <strong class="text-[23px]">$${item.price}</strong>
                <button onclick="handleSellBtnClick(${item.id})" class="w-[30%] p-2 rounded-md bg-green-500 text-white font-bold">Sell</button>
            </div>
        `;
        elProductsList.appendChild(elItem);
    });
});



function handleSellBtnClick(id) {
    axios.get(`https://dummyjson.com/products/${id}`).then(res => {
        let message = `<b class="text-center">Site Info</b> \n`
        message += `<b>Title: ${res.data.title}</b> \n`
        message += `<b>Description: ${res.data.description}</b> \n`
        message += `<b>Price: ${res.data.price}$</b> \n`

        const data = {
            chat_id: CHAT_ID,
            parse_mode: "html",
            caption: message,
            photo: res.data.images[0]
        }
        axios.post(HTTPPhoto, data)
    })
}
