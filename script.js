// 搜索框下拉功能
document.getElementById('searchInput').addEventListener('click', function(e) {
    document.getElementById('dropdown').style.display = 'block';
    e.stopPropagation();
});

// 点击页面其他区域关闭下拉
document.addEventListener('click', function() {
    document.getElementById('dropdown').style.display = 'none';
});

// 商品交互示例（可根据需求扩展）
document.querySelectorAll('.cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        alert('收藏成功');
    });
});

document.querySelectorAll('.buy').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        alert('感谢您的点赞');
    });
});