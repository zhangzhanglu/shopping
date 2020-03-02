const base = {
    baseUrl:"/api",
    login:"/login",
    selectTbItemAllByPage:"/backend/item/selectTbItemAllByPage",
    selectItemCategoryByParentId:"/backend/itemCategory/selectItemCategoryByParentId",
    insertTbItem:'/backend/item/insertTbItem',//提交商品接口
    deleteItemById:"/backend/item/deleteItemById",//删除产品接口
    preUpdateItem:"/backend/item/preUpdateItem",//预更新
    updateTbItem:"/backend/item/updateTbItem",//修改产品
    selectItemParamAll:"/backend/itemParam/selectItemParamAll",//规格参数查询
    insertItemParam:"/backend/itemParam/insertItemParam",//规格参数添加
    deleteItemParamById:"/backend/itemParam/deleteItemParamById",//规格参数删除
    selectContentCategoryByParentId:"/content/selectContentCategoryByParentId",//规格参数查询
    insertContentCategory:"/content/insertContentCategory",//内容分类管理添加
    deleteContentCategoryById:"/content/deleteContentCategoryById",//内容分类管理删除
    updateContentCategory:"/content/updateContentCategory",//内容分类管理修改
    selectTbContentAllByCategoryId:"/content/selectTbContentAllByCategoryId",
    insertTbContent:"/content/insertTbContent",
    deleteContentByIds:"/content/deleteContentByIds",
}


export default base;