class Cart {
  constructor() {
    this.getCartGoods();
    this.checkAll();
    // 给tbody绑定点击事件
    this.$('#cartTable tbody').addEventListener('click', this.clickBubbleFn.bind(this))
  }
  /****判断操作的节点****/
  clickBubbleFn (event) {
    let tar = event.target;
    // console.log(event.target.classList.contains('check-one'));
    // 1 判断是否为check-one 
    tar.classList.contains('check-one') && this.oneCheckFn(tar);
    // 点的按钮里面如果包含checkone这个类名，就是单选框，然后执行oneCheckFn，传tar进去，代表单选框，如果单选框没选中+118
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
      // 过滤获取到的值，返回购物车中有的商品信息
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
    this.$('#cartTable tbody').innerHTML = template;
  }
  /*********全选实现********/
  checkAll () {
    //1 给全选按钮绑定事件
    let allObj = this.$$('.check-all');
    // console.log(allObj);
    // 2 给全选按钮绑定事件,事件回调函数的this指向节点对象,使用bind改变this指向为类名
    allObj[0].addEventListener('click', this.allClickFn.bind(this, 1))
    allObj[1].addEventListener('click', this.allClickFn.bind(this, 0))
    // 这里的bind是改变this指向，后面的1是要传给下面事件中的参数，这样可以实现点击下标为零的按钮，获取其状态，然后使下标为1的也变成这种状态，即0被选中时，1也选中
  }
  // 使用bind和event时,bind传递的参数在前
  allClickFn (checkAllIndex, event) {
    // console.log(this);
    // console.log(checkAllIndex);
    // console.log(event);
    //获取点击的全选按钮状态
    let status = event.target.checked;
    // event事件对象这里等于点击事件的对象，这里用于获取点击对象的状态
    // 设置另一个全选的状态
    this.$$('.check-all')[checkAllIndex].checked = status;
    this.oneChecked(status);
  }
  /*****单个商品选中****/
  //当点全选时，（遍历）所有单选框也选中，把全选按钮的checked状态当作参数传给单选框
  oneChecked (status) {
    // console.log(this.$$('.check-one'));
    this.$$('.check-one').forEach(one => {
      one.checked = status;
    })
  }
  /****商品单选框回调函数***/
  oneCheckFn (target) {
    // console.log(target);
    // console.log(this.$$('.check-one'));
    // this.$$('.check-one')是伪数组，所以要用Array.from转为数组才能用数组的方法
    if (target.checked) {
      // some 遇见第一个true直接返回,写成!one.checked，取反，一个选中了就返回false，会继续判断其他项，都是false，没有true返回false，证明单选都选中了
      let res = Array.from(this.$$('.check-one')).some(one => {
        // console.log(one.checked);
        return !one.checked;
      })
      console.log(res);
      // 所有单选都被选中,返回false,取反true，让全选选中
      if (!res) {
        this.$$('.check-all')[0].checked = true;
        this.$$('.check-all')[1].checked = true;
      }
    } else {
      this.$$('.check-all')[0].checked = false;
      this.$$('.check-all')[1].checked = false;
    }
    // 优化层级
    // if (!target.checked) {  // 取消
    //   // 如果有一个单选框没选中，全选就不选中，后面就不执行
    //   this.$$('.check-all')[0].checked = false;
    //   this.$$('.check-all')[1].checked = false;
    //   return;
    // }
    // 选中,
    // let res = Array.from(this.$$('.check-one')).some(one => {
    //   // console.log(one.checked);
    //   // 未选中是false,取反为true,循环结束
    //   return !one.checked;
    // })
    // // console.log(arr);
    // // 所有单选都被选中,返回false,让全选选中
    // 这里如果res不取反，只选中一个单选，全选也会选中，因为some里面每一项都返回false，如果false时选中全选就不对，
    // if (!res) {
    //   this.$$('.check-all')[0].checked = true;
    //   this.$$('.check-all')[1].checked = true;
    // }
    /********判断选中的商品数量*******/
    // 循环单选框，如果被选中数量++
    // let count = 0;
    // this.$$('.check-one').forEach(v => {
    //   v.checked && count++;
    // })
    // // console.log(count);
    // // 选中的数量,等于购物车商品数量,则全选选中
    // if (count == this.$$('.check-one').length) {
    //   this.$$('.check-all')[0].checked = true;
    //   this.$$('.check-all')[1].checked = true;
    // }
  }
  //获取节点方法
  $ (ele) {
    return document.querySelector(ele)
  }
  $$ (ele) {
    return document.querySelectorAll(ele)
  }
}
new Cart;