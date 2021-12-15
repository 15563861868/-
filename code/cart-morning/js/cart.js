// class Cart{
//     constructor(){
//         this.getGoods();
//         this.allCheck();
//         this.$('#cartTable tbody').addEventListener('click',this.clickBubbleFn.bind(this));
//     }
//     clickBubbleFn (event) {
// //改变事件中this指向时，就一定要用event
//         let tar = event.target;
//         // console.log(event.target.classList.contains('check-one'));
//         // 1 判断是否为check-one 
//         tar.classList.contains('check-one') && this.oneCheck(tar);
//         // 点的按钮里面如果包含checkone这个类名，就是单选框，然后执行oneCheckFn，传tar进去，代表单选框，如果单选框没选中+118
//       }
//     async getGoods(){
//         let allGoods=await axios.get({url:'js/goods.json'});
//         // console.log(goods);
//         let cartGoods=localStorage.getItem('cart');
//         // console.log(cartGoods);
//         if(!cartGoods) return;
//         cartGoods=JSON.parse(cartGoods);
//         // console.log(goods);
//         let now=allGoods.filter(item=>{
//             return cartGoods[item.id];
//             // 返回的是cartGoods的值
//         })
//         this.render(now,cartGoods)
//     }

//     render(now,cartGoods){
//         let html='';
//         now.forEach(item=>{
//             html+=`<tr>
//             <td class="checkbox"><input class="check-one check" type="checkbox"/></td>
//             <td class="goods"><img src="${item.src}" alt=""/><span>${item.name}</span></td>
//             <td class="price">${item.price}</td>
//             <td class="count">
//                 <span class="reduce"></span>
//                 <input class="count-input" type="text" value="${cartGoods[item.id]}"/>
//                 <span class="add">+</span></td>
//             <td class="subtotal">${cartGoods[item.id]*item.price}</td>
//             <td class="operation"><span class="delete">删除</span></td>
//         </tr>`
//         })
//         this.$('#cartTable tbody').innerHTML=html;
//     }

//     allCheck(){
//         let allBtn=this.$$('.check-all');
//         allBtn[0].addEventListener('click',this.all.bind(this,1));
//         allBtn[1].addEventListener('click',this.all.bind(this,0));
//         // all后面不写括号，括号写在bind后面，通过bind传参
//     }
//     all(label,event){
//         // 点击事件就触发event，上个函数里也有event，只是隐藏了，使用时才显示 event获取当前操作的节点
//         let tar=event.target;
//         let state=tar.checked;
//         this.$$('.check-all')[label].checked=state;
//         // 这里不能直接写this.allBtn因为是局部变量
//         // this.allBtn[label].checked=state;
//         this.checkbox(state);
//     }
//     checkbox(state){
//         this.$$('.check-one').forEach(item=>{
//             item.checked=state;
//         })
// }
// oneCheck(target){
//     if(!target.checked){
//         this.$$('.check-all')[0].checked = false;
//         this.$$('.check-all')[1].checked = false;
//         return;
//     }
//     let count=0;
//     this.$$('.check-one').forEach(item=>{
//         item.checked&&count++
//     })
//     if(count==this.$$('.check-one').length){
//         this.$$('.check-all')[0].checked=true;
//         this.$$('.check-all')[1].checked=true;
//     }
// }
// $(ele){
//     return document.querySelector(ele);
// }
// $$(ele){
//     return document.querySelectorAll(ele);
// }
// }
// new Cart;

// class Cart{
//     constructor(){
//         this.getGoods();
//         this.checkAll();
//         this._$('#cartTable tbody').addEventListener('click',this.bubbleFn.bind(this));
//     }
//     bubbleFn(event){
//         let tar=event.target;
//         tar.classList.contains('check-one')&&this.checkOneFn(tar);
//         tar.classList.contains('add')&&this.addNum(tar);
//         tar.classList.contains('delete')&&this.delData(tar);
//     }
//     async getGoods(){
//         let cartGoods=localStorage.getItem('cart');
//         // console.log(cartGoods);
//         let goods=await axios.get({url:'js/goods.json'});
//         // console.log(goods);
//         if(!cartGoods) return;
//         cartGoods=JSON.parse(cartGoods);
//         let nowGoods=goods.filter(item=>{
//             return cartGoods[item.id];
//         })
//         this.render(nowGoods,cartGoods);
//     }
//     // 追加到表格中
//     render(nowGoods,cartGoods){
//         let html='';
//         nowGoods.forEach(item=>{
//             html+=`<tr goods-id="${item.id}">
//             <td class="checkbox"><input class="check-one check" type="checkbox"/></td>
//             <td class="goods"><img src="${item.src}" alt=""/><span>${item.name}</span></td>
//             <td class="price">${item.price}</td>
//             <td class="count">
//                 <span class="reduce"></span>
//                 <input class="count-input" type="text" value="${cartGoods[item.id]}"/>
//                 <span class="add">+</span></td>
//             <td class="subtotal">${item.price*cartGoods[item.id]}</td>
//             <td class="operation"><span class="delete">删除</span></td>
//         </tr>`
//         })
//         this._$('#cartTable tbody').innerHTML=html;

//     }

//     checkAll(){
//         let allBtn=this.$$('.check-all');
//         // console.log(allBtn);
//         allBtn[0].addEventListener('click',this.allCheckFn.bind(this,1));
//         allBtn[1].addEventListener('click',this.allCheckFn.bind(this,0));
//     }
//     allCheckFn(index,event){
//         let tar=event.target;
//         let status=tar.checked;
//         this.$$('.check-all')[index].checked=status;
//         this.checkOne(status);
//         this.sumTotal(status);
//         // 点了下标为0的按钮，它会调用回调函数，把下标为1传过来，这样写是因为allBtn是局部变量，这里要重新获取，下标为1的按钮也选中。
//     }

//     checkOne(status){
//         this.$$('.check-one').forEach(item=>{
//             item.checked=status;
//         })
//     }
//     checkOneFn(target){
//         this.sumTotal();
//         if(!target.checked){
//             this.$$('.check-all')[0].checked=false;
//             this.$$('.check-all')[1].checked=false;
//             return
//         }
//         let res=Array.from(this.$$('.check-one')).some(item=>{
//             return !item.checked;
//         })
//         if(!res){
//             this.$$('.check-all')[0].checked=true;
//             this.$$('.check-all')[1].checked=true;
//         }

//     }

//     addNum(target){
//         let val=target.previousElementSibling;
//         // console.log(val);
//         val.value=val.value-0+1;
//         // 获取单价和小计
//         let tr=target.parentNode.parentNode;
//         let price=target.parentNode.previousElementSibling.innerHTML-0;
//         let sum=target.parentNode.nextElementSibling;
//         sum.innerHTML=val.value*price;
//         this.sumTotal();
//         this.modify(tr.getAttribute('goods-id'),val.value)
//     }

//     delData(tar){
//         let that = this;
//         let tr=tar.parentNode.parentNode;
//         layer.open({
//             title: '确认删除框'
//             , content: '确认抛弃奴家吗?',
//             btn: ['取消', '确认']
//             , btn2: function (index, layero) {
//                 tr.remove();
//                 if(tr.querySelector('.check-one').checked){
//                     that.sumTotal();
//                 }
//             }
//           });
//           console.log(tr.getAttribute('goods-id'));
//           this.modify(tr.getAttribute('goods-id'))
//         }

//     sumTotal(sta=true){
//         let totalNum=0;
//         let totalVal=0;
//         if(sta){
//             this.$$('.check-one').forEach(item=>{
//                 if(item.checked){
//                     totalNum+=item.parentNode.parentNode.querySelector('.count input').value-0;
//                     totalVal+=item.parentNode.parentNode.querySelector('.subtotal').innerHTML-0;
//                     // console.log(totalNum,totalVal);
//                 }
//             })

//         }
//         // 
//         this._$('#selectedTotal').innerHTML=totalNum;
//         this._$('#priceTotal').innerHTML=totalVal;
//     }

//     modify(id,num=0){
//         // 删除时,num是0，默认为0，就不用传num了
//         let cartGoods=localStorage.getItem('cart');
//         if(!cartGoods) return;
//         cartGoods=JSON.parse(cartGoods);
//         num==0&&delete cartGoods[id];
//         num!=0&&(cartGoods[id]=num);
//         localStorage.setItem('cart', JSON.stringify(cartGoods));
//     }
//     _$(ele){
//         return document.querySelector(ele)
//     }
//     $$(ele){
//         return document.querySelectorAll(ele)
//     }
// }
// new Cart;

class Cart {
    constructor() {
        this.getGoods();
        this.checkAll();
        this._$('#cartTable tbody').addEventListener('click', this.bubbleFn.bind(this));
    }
    bubbleFn(event) {
        let tar = event.target;
        // console.log(tar);
        // console.log(this.$$('.check-one').checked);
        // console.log(this);
        // console.log(this.$$('.check-one'));
        tar.classList.contains('check-one') && this.checkOneFn(tar);
        tar.classList.contains('add') && this.addFn(tar);
        tar.classList.contains('delete') && this.delFn(tar);

    }
    async getGoods() {
        let goods = await axios.get({
            url: 'js/goods.json'
        });
        // console.log(goods);

        let cartGoods = localStorage.getItem('cart');
        // console.log(cartGoods);
        if (!cartGoods) return;
        cartGoods = JSON.parse(cartGoods);
        let now = goods.filter(item => {
            // console.log(cartGoods[item.id]);
            return cartGoods[item.id];
            // 这里的条件是，item.id是goods中的id，如果cartGoods中有这个id，就是符合条件，返回goods中对应的元素；
            // 如果item.id=1，进入filter，如果cartGoods里面有键为1，就会返回一个值（数字），转化为布尔值就是true，如果没有就返回undefined，转为false。
        })
        this.render(now, cartGoods)
    }
    render(now, cartGoods) {
        let html = '';
        now.forEach(item => {
            html += `<tr good-id="${item.id}">
                        <td class="checkbox"><input class="check-one check" type="checkbox"/></td>
                        <td class="goods"><img src="${item.src}" alt=""/><span>${item.name}</span></td>
                        <td class="price">${item.price}</td>
                        <td class="count">
                            <span class="reduce"></span>
                            <input class="count-input" type="text" value="${cartGoods[item.id]}"/>
                            <span class="add">+</span></td>
                        <td class="subtotal">${cartGoods[item.id]*item.price}</td>
                        <td class="operation"><span class="delete">删除</span></td>
                    </tr>`
        })
        this._$('#cartTable tbody').innerHTML = html;
    }

    checkAll() {
        let allBtn = this.$$('.check-all');
        allBtn[0].addEventListener('click', this.allCheckFn.bind(this, 1));
        allBtn[1].addEventListener('click', this.allCheckFn.bind(this, 0));
    }
    allCheckFn(index, event) {
        let status = event.target.checked;
        this.$$('.check-all')[index].checked = status;
        this.radio(status);
        this.sumTotal(status);
    }
    radio(status) {
        this.$$('.check-one').forEach(item => {
            item.checked = status;
        })
    }
    checkOneFn(tar) {
        this.sumTotal();
        if (!tar.checked) {
            this.$$('.check-all')[0].checked = false;
            this.$$('.check-all')[1].checked = false;
            return
        }
        let res = Array.from(this.$$('.check-one')).some(item => {
            console.log(item.checked);
            return !item.checked;
        })
        // console.log(res);
        if (!res) {
            this.$$('.check-all')[0].checked = true;
            this.$$('.check-all')[1].checked = true;
        }

    }

    sumTotal(sta = true) {
        let totalNum = 0;
        let totalPrice = 0;
        if (sta) {
            this.$$('.check-one').forEach(item => {
                if (item.checked) {
                    // 如果单选选中，才进入计算
                    let tr = item.parentNode.parentNode;
                    totalNum += (tr.querySelector('.count input').value - 0);
                    totalPrice += (tr.querySelector('.subtotal').innerHTML - 0);
                }
            })
        }
        this._$('#selectedTotal').innerHTML = totalNum;
        this._$('#priceTotal').innerHTML = totalPrice;
    }
    _$(ele) {
        return document.querySelector(ele)
    }
    $$(ele) {
        return document.querySelectorAll(ele)
    }

    addFn(tar){
        let num=tar.previousElementSibling;
        num.value=num.value-0+1;
        // 获取单价和小计
        let price=tar.parentNode.previousElementSibling.innerHTML;
        let subTotal=tar.parentNode.nextElementSibling;
        subTotal.innerHTML=parseInt((num.value*price)*100)/100;
        tar.parentNode.parentNode.querySelector('.check-one').checked&&this.sumTotal();
        // 如果当前点击的+的单选被选中，就重新计算合计的值
        this.modify(tar.parentNode.parentNode.getAttribute('good-id'),num.value);
    }

    delFn(tar){
        let that=this;
        let tr=tar.parentNode.parentNode;
        layer.open({
            title: '确认删除框'
            , content: '确认抛弃奴家吗?',
            btn: ['取消', '确认']
            , btn2: function (index, layero) {
              tr.remove();
              tr.querySelector('.check-one').checked && that.subTotal();
            }
          }); 
          this.modify(tr.getAttribute('good-id'));
    }

    // 修改local
    modify(id,num=0){
        let cartGoods=localStorage.getItem('cart');
        if(!cartGoods) return;
        cartGoods=JSON.parse(cartGoods);
        num==0&&delete cartGoods[id];
        num!=0&&(cartGoods[id]=num);
        console.log(cartGoods[id]=num);
        localStorage.setItem('cart',JSON.stringify(cartGoods));
    }
}
new Cart;