接口介绍：
    商品查询接口：
        地址:http://121.42.14.194:9011
        路径:/backend/item/selectTbItemAllByPage
        参数:page
    选择类目接口
        地址:http://121.42.14.194:9011
        路径:/backend/itemCategory/selectItemCategoryByParentId
        id:id
    
富文本编辑器：
    https://github.com/HaoChuan9421/vue-ueditor-wrap

线下地址转线下地址：
    1.拷贝mock，覆盖mock
    2.安装新的依赖：
        npm install --save mysql cors multer
    3.api/index.js
        ego部分修改为baseUrl的引用
    4.vue.config.js：
        端口修改为3300，删除外部以用的跨域
    5.启动xampp服务器和数据库
    6.导入数据库：创建库名web1908
    7.启动服务器，查看效果
    8.修改现有效果bug：类目选择,参数id -> cid