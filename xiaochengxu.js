// script.js
// 菜单数据
const menuItems = [
    { id: 1, name: '汉堡', price: 25, img: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2022/08/202208081011205699.png'},
    { id: 2, name: '薯条', price: 12, img: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2022/08/202208091547349086.png'},
    { id: 3, name: '可乐', price: 8, img: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2022/08/202208091541242793.png'},
    { id: 4, name: '全家桶', price: 45, img: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2022/08/202208091711212667.png'},
    { id: 5, name: '厚牛堡', price: 28, img: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2022/08/202208081022345223.png'},
    { id: 6, name: '冰淇淋', price: 10, img: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2020/03/202003191449258974.png'}  //price是价格
];

// 购物车数据
let cart = JSON.parse(localStorage.getItem('cart')) || []; // 从本地存储读取购物车

// 初始化函数
function init() {
    renderMenu(); // 渲染菜单
    renderCart(); // 渲染购物车
    requestNotificationPermission(); // 新增
}

// 渲染菜单
function renderMenu() {
    const menuContainer = document.getElementById('menu'); // 获取菜单容器
    menuContainer.innerHTML = ''; // 清空原有内容

    menuItems.forEach(item => {
        const div = document.createElement('div'); // 创建div元素
        div.className = 'menu-item'; // 设置class名称
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>￥${item.price}</p>
            <img src="${item.img}" alt="${item.name}"> <!-- 添加图片 -->
            <button onclick="addToCart(${item.id})">加入购物车</button>
        `; // 填充HTML内容
        menuContainer.appendChild(div); // 添加到菜单容器
    });
}

// 添加到购物车
function addToCart(id) {
    const item = menuItems.find(i => i.id === id); // 查找对应商品
    const cartItem = cart.find(i => i.id === id); // 查找购物车中是否已存在
    
    if (cartItem) {
        cartItem.quantity++; // 数量加1
    } else {
        cart.push({ ...item, quantity: 1 }); // 添加新商品
    }
    
    saveCart(); // 保存到本地存储
    renderCart(); // 重新渲染购物车
}

// 移除购物车项
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id); // 过滤掉指定商品
    saveCart(); // 保存到本地存储
    renderCart(); // 重新渲染购物车
    // 控制下单按钮显示
    //const checkoutBtn = document.getElementById('checkoutBtn');
    //cart.length > 0 ? 
        //checkoutBtn.classList.add('show') : 
        //checkoutBtn.classList.remove('show');
}

// 4.新增下单功能
// 确保以下关键代码存在且正确
function submitOrder() {
    // 调试语句
    console.log('submitOrder触发，当前购物车:', cart);
    
    if (cart.length === 0) {
        console.warn('购物车为空，拒绝提交');
        return;
    }
    
    const total = calculateTotal();
    if (!confirm(`确认下单？总金额：￥${total}`)) return;

    // 清空购物车
    cart = [];
    localStorage.removeItem('cart'); // 确保清空本地存储
    renderCart();
    
    // 触发通知
    if (Notification.permission === "granted") {
        sendNotification(total);
    } else {
        console.log('通知权限未授权');
    }
    
    alert('下单成功！您的单号为:04');
}

// 新增权限请求函数
function requestNotificationPermission() {
    if ("Notification" in window) {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }
}

// 确保通知函数存在
// 在init函数中添加
function init() {
    renderMenu();
    renderCart();
    requestNotificationPermission(); // 新增
}

// 新增权限请求函数
function requestNotificationPermission() {
    if ("Notification" in window) {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }
}

// 修改后的sendNotification
function sendNotification(total) {
    try {
        const options = {
            body: `金额：￥${total}`,
            icon: './images/logoi.jpg', // 修正路径
            vibrate: [200, 100, 200] // 添加振动反馈
        };
        
        new Notification("新订单", options);
        
        // 添加声音播放
        const audio = new Audio('./sounds/notification.mp3');
        audio.play().catch(error => {
            console.log('声音播放失败:', error);
        });
    } catch (error) {
        console.error('通知发送失败:', error);
    }
}

// 5.新增计算总价函数
function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// 保存购物车到本地存储
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // 存储购物车数据
}

// 渲染购物车
function renderCart() {
    const cartContainer = document.getElementById('cart'); // 获取购物车容器
    const totalContainer = document.getElementById('total'); // 获取总价容器
    const checkoutBtn = document.getElementById('checkoutBtn'); // 获取按钮元素

    cartContainer.innerHTML = ''; // 清空容器内容

    // 核心修复：立即更新按钮状态（在渲染商品前）
    checkoutBtn.classList.toggle('show', cart.length > 0); // 智能切换类

    // 添加调试语句（上线可移除）
    console.log('当前购物车数量:', cart.length, '按钮显示状态:', checkoutBtn.classList.contains('show'));

    cart.forEach(item => {
        const div = document.createElement('div'); // 创建div元素
        div.className = 'cart-item'; // 设置class名称
        div.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>￥${item.price * item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">删除</button>
        `; // 填充HTML内容
        cartContainer.appendChild(div); // 添加到购物车容器
    });
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // 计算总价
    totalContainer.textContent = `总价：￥${total}`; // 更新总价显示
}

// 页面加载时初始化
window.onload = init; // 绑定初始化函数到页面加载事件