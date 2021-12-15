class Cart {
  constructor() {

    this.getCartGoods();
    this.checkAll();

    // 给tbody绑定点击事件
    this._$('#cartTable tbody').addEventListener('click', this.clickBubbleFn.bind(this))
  }
  /****判断操作的节点****/
  clickBubbleFn (event) {
    let tar = event.target;
    // console.log(event.target.classList.contains('check-one'));
    // 1 判断是否为check-one 
    tar.classList.contains('check-one') && this.oneCheckFn(tar);

    // 2 判断点击的是否为类 add(加号按钮)
    tar.classList.contains('add') && this.addClickFn(tar);

    // 3判断点击的是否为阐述
    tar.classList.contains('delete') && this.delClickFn(tar);

  }


  /******获取购物车数据*****/
  async getCartGoods () {
    // 1 取出local数据
    let cartGoods = localStorage.getItem('cart');
    // 没有数据则停止
    if (!cartGoods) return;
    cartGoods = JSON.parse(cartGoods)
    // console.log(cartGoods);

    // 2 发送ajax获取商品数据
    let goodsData = await axios.get({ url: './js/goods.json' });
    // console.log(goodsData);

    //3 循环商品信息,根据id取购物车中的值,有值说明商品在购物车
    let existsCartGoods = goodsData.filter(item => {
      // console.log(item.id);
      // console.log(cartGoods[item.id]);
      // 结果为数字 转化为 true  undefined 转化为false
      return cartGoods[item.id];
    });

    // console.log(existsCartGoods);
    this.render(existsCartGoods, cartGoods)
  }
  /****渲染购物车列表******/
  render (goodsData, cg) {
    let template = '';
    // console.log(goodsData, 1111);
    // 1 循环购物车商品
    goodsData.forEach(ele => {
      // console.log(ele);

      template += `<tr>
      <td class="checkbox">
        <input class="check-one check" type="checkbox" />
      </td>
      <td class="goods">
        <img src="${ele.src}" alt="" />
        <span>${ele.name}</span>
      </td>
      <td class="price">${ele.price}</td>
      <td class="count">
        <span class="reduce"></span>
        <input class="count-input" type="text" value="${cg[ele.id]}" />
        <span class="add">+</span>
      </td>
      <td class="subtotal">${ele.price * cg[ele.id]}</td>
      <td class="operation">
        <span class="delete">删除</span>
      </td>
    </tr>`
    });

    this._$('#cartTable tbody').innerHTML = template;

  }

  /*********全选实现********/
  checkAll () {
    //1 给全选按钮绑定事件
    let allObj = this.$$('.check-all');
    // console.log(allObj);

    // 2 给全选按钮绑定事件,事件回调函数的this指向节点对象,使用bind
    allObj[0].addEventListener('click', this.allClickFn.bind(this, 1))
    allObj[1].addEventListener('click', this.allClickFn.bind(this, 0))
  }
  // 使用bind和event时,bind传递的参数在前
  allClickFn (checkAllIndex, event) {
    // console.log(this);
    // console.log(checkAllIndex);
    // console.log(event);
    //获取点击的全选按钮状态
    let status = event.target.checked;
    // 设置另一个全选的状态
    this.$$('.check-all')[checkAllIndex].checked = status;
    this.oneChecked(status);

    // 统计数量和价格穿递全选的状态
    this.subTotal(status)
  }
  /*****单个商品选中****/
  oneChecked (status) {
    // console.log(this.$$('.check-one'));
    this.$$('.check-one').forEach(one => {
      one.checked = status;
    })

  }
  /****商品单选框回调函数***/
  oneCheckFn (target) {
    this.subTotal();
    // console.log(target);
    // console.log(this.$$('.check-one'));
    // if (target.checked) {
    //   // some 遇见第一个true直接返回,没有true返回false
    //   let res = Array.from(this.$$('.check-one')).some(one => {
    //     // console.log(one.checked);
    //     return !one.checked;
    //   })
    //   // console.log(arr);
    //   // 所有单选都被选中,返回false,让全选选中
    //   if (!res) {
    //     this.$$('.check-all')[0].checked = true;
    //     this.$$('.check-all')[1].checked = true;
    //   }
    // } else {
    //   this.$$('.check-all')[0].checked = false;
    //   this.$$('.check-all')[1].checked = false;
    // }

    // 优化层级
    if (!target.checked) {  // 取消
      this.$$('.check-all')[0].checked = false;
      this.$$('.check-all')[1].checked = false;
      return;
    }
    // 选中,
    // let res = Array.from(this.$$('.check-one')).some(one => {
    //   // console.log(one.checked);
    //   // 未选中是false,取反为true,循环结束
    //   return !one.checked;
    // })
    // // console.log(arr);
    // // 所有单选都被选中,返回false,让全选选中
    // if (!res) {
    //   this.$$('.check-all')[0].checked = true;
    //   this.$$('.check-all')[1].checked = true;
    // }

    /********判断选中的商品数量*******/
    let count = 0;

    this.$$('.check-one').forEach(v => {
      v.checked && count++;
    })
    // console.log(count);
    // 选中的数量,等于购物车商品数量,则全选选中

    if (count == this.$$('.check-one').length) {
      this.$$('.check-all')[0].checked = true;
      this.$$('.check-all')[1].checked = true;
    }


  }
  /******统计价格和数量******/
  // 全选和单个商品的input框,都要调用，因为全选选中，单选也选中，全选选不中
  subTotal (sta = true) {
    // console.log(1111);
    // 1 总价和数量的变量
    let totalNum = 0, totalPrice = 0;
    // 2 获取所有的节点,遍历找出选中的
    sta && this.$$('.check-one').forEach(ele => {
      // 传入sta默认值为true，用于判断全选的状态，全选选中就是true，取消全选，就会传入false，后面不会执行，在单选中调用该方法，但是不传参，不传参sta就是用默认值true，就会判断下面的
      // console.log(ele);
      if (ele.checked) {
        // 如果单选选中，ele.parentNode.parentNode指的是单选所在行
        // console.log(ele);
        // 3 找到tr
        let trObj = ele.parentNode.parentNode;
        // console.log(trObj);
        // 4 获取小计和数量的值
        // 获取tr下类名为count的td下的input
        totalNum += (trObj.querySelector('.count input').value - 0);
        // console.log();
        // console.log(trObj.querySelector('.subtotal').innerHTML);
        totalPrice += (trObj.querySelector('.subtotal').innerHTML - 0);
        // 累加
        // -0是把字符串转为数字，*1也可
        // console.log(totalNum, totalPrice);
      }

    })
    // 5 放入页面中
    this._$('#priceTotal').innerHTML = totalPrice;
    this._$('#selectedTotal').innerHTML = totalNum;
  }

  /******增加数量******/
  addClickFn (target) {
    // console.log(target);
    // 1 获取数量,上一个兄弟节点
    let num = target.previousElementSibling;
    // console.log(num);
    // 点击事件，点一下+，num的值+1，因为是input，所以用value
    num.value = num.value - 0 + 1;

    // 2 获取小计
    let sub = target.parentNode.nextElementSibling;
    // 获取单价
    let price = target.parentNode.previousElementSibling.innerHTML;
    // 123.484   121.485
    // sub.innerHTML = (num.value * price).toFixed(2);
    // 因为获取到的数字都是字符串，所以要转成数值
    // 这里是保留两位小数  小计=数量*单价
    sub.innerHTML = parseInt((num.value * price) * 100) / 100;

    // 3 当input是选中时,统计价格和数量
    target.parentNode.parentNode.querySelector('.check-one').checked && this.subTotal();


  }
  /****删除商品****/
  delClickFn (target) {
    let that = this;
    // 确认删除框
    layer.open({
      title: '确认删除框'
      , content: '确认抛弃奴家吗?',
      btn: ['取消', '确认']
      , btn2: function (index, layero) {
        //按钮【按钮二】的回调
        //return false 开启该代码可禁止点击该按钮关闭
        console.log(target);
        // 删除当前商品节点
        target.parentNode.parentNode.remove();

        // 处于选中状态,则重新计算总价格和数量
        target.parentNode.parentNode.querySelector('.check-one').checked && that.subTotal();
      }
    });
  }
  //获取节点方法
  _$ (ele) {
    return document.querySelector(ele)
  }
  $$ (ele) {
    return document.querySelectorAll(ele)
  }


}

new Cart;