// export let msgBoxConfirm = (that, title, content) => {
//     return new Promise((resolve, reject) => {
//         that.$bvModal
//             .msgBoxConfirm(content, {
//                 title: title,
//                 size: "sm",
//                 buttonSize: "sm",
//                 cancelVariant: "danger",
//                 okVariant: "success",
//                 okTitle: "Evet",
//                 cancelTitle: "Hayır",
//                 footerClass: "p-2",
//                 hideHeaderClose: false
//                 // centered: true
//             })
//             .then(value => {
//                 resolve(value);
//             })
//             .catch(err => {
//                 reject(err);
//             });
//     });
// };

// export let showToast = (that, type, title, body, append = false) => {

//     that.$bvToast.toast(body, {
//         title: title,
//         toaster: "b-toaster-bottom-right",
//         solid: true,
//         appendToast: append,
//         variant: type
//     });
// };



export default {
    msgBoxConfirm: (that, title, content) => {
        return new Promise((resolve, reject) => {
            that.$bvModal
                .msgBoxConfirm(content, {
                    title: title,
                    size: "sm",
                    buttonSize: "sm",
                    cancelVariant: "danger",
                    okVariant: "success",
                    okTitle: "Evet",
                    cancelTitle: "Hayır",
                    footerClass: "p-2",
                    hideHeaderClose: false
                    // centered: true
                })
                .then(value => {
                    resolve(value);
                })
                .catch(err => {
                    reject(err);
                });
        })
    },
    showToast: (that, type, title, body, append = false) => {

        that.$bvToast.toast(body, {
            title: title,
            toaster: "b-toaster-bottom-right",
            solid: true,
            appendToast: append,
            variant: type
        })
    }
}

