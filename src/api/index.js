import axios from "../utils/http"
import base from "./base"

const api = {
    /**
     * 登陆
     */
    login(params){
        return axios.post(base.baseUrl + base.login,params);
    },
    /**
     * 商品查询接口
     */
    getSelectTbItemAllByPage(params){
        return axios.get(base.baseUrl + base.selectTbItemAllByPage,{
            params
        })
    },
    /**
     * 商品类目接口
     */
    getSelectItemCategoryByParentId(params){
        return axios.get(base.baseUrl + base.selectItemCategoryByParentId,{
            params
        })
    },
    //提交商品接口
    getInsertTbItem(params){
        return axios.get(base.baseUrl+base.insertTbItem,{
            params
        })
    },
    //删除产品接口
    getDeleteItemById(parmas){
        return axios.get(base.baseUrl+base.deleteItemById,{
            params:parmas
        })
    },//预更新接口
    getPreUpdateItem(params){
        return axios.get(base.baseUrl+base.preUpdateItem,{
            params:params
        })
    },
    //修改产品
    getUpdateTbItem(params){
        return axios.get(base.baseUrl+base.updateTbItem,{
            params:params
        })
    },
    //规格参数查询
    getSelectItemParamAll(params){
        return axios.get(base.baseUrl+base.selectItemParamAll,{
            params:params
        })
    },
    //规格参数添加
    getInsertItemParam(params){
        return axios.get(base.baseUrl+base.insertItemParam,{
            params:params
        })
    },
    getDeleteItemParamById(params){
        return axios.get(base.baseUrl+base.deleteItemParamById,{
            params:params
        })
    },
    getSelectContentCategoryByParentId(params){
        return axios.get(base.baseUrl+base.selectContentCategoryByParentId,{
            params:params
        })
    },
    getInsertContentCategory(params){
        return axios.get(base.baseUrl+base.insertContentCategory,{
            params:params
        })
    },
    getDeleteContentCategoryById(params){
        return axios.get(base.baseUrl+base.deleteContentCategoryById,{
            params:params
        })
    },
    getUpdateContentCategory(params){
        return axios.get(base.baseUrl+base.updateContentCategory,{
            params:params
        })
    },
    getSelectTbContentAllByCategoryId(params){
        return axios.get(base.baseUrl+base.selectTbContentAllByCategoryId,{
            params:params
        })
    },
    getInsertTbContent(params){
        return axios.get(base.baseUrl+base.insertTbContent,{
            params:params
        })
    },
    getDeleteContentByIds(params){
        return axios.get(base.baseUrl+base.deleteContentByIds,{
            params:params
        })
    }
}

export default api