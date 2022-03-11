<template>
  <div class="publish_article">
     <a-textarea
      v-model:value="obj.title"
      placeholder="请输入标题..."
      :auto-size="{ minRows: 1, maxRows: 5 }"
    />
    <div ref='editor'></div>
    <div style="display;flex">
      <div>
        <AppstoreOutlined /><span>选择分类</span>
     
      </div>
          <a-cascader
          :options="options"
          placeholder="请选择或输入话题名称"
          v-model:value="obj.category"
          :show-search="{ filter }"
      />
      <a-divider />
    </div>
     <div class="save">
        <a-button style="margin-right:50px">保存至草稿箱</a-button>
        <a-button type="primary" @click="publishArticle">发布</a-button>
     </div>
   
  </div>
</template>

<script>
import httpServe from '../api/request'
import { AppstoreOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';
import WangEditor from 'wangeditor';

export default {
  components:{
    AppstoreOutlined
  },
  setup() {
    const filter = (inputValue, path) => {
      return path.some(option => option.label.indexOf(inputValue) > -1);
    };
    // const searchValue = ref();
    const options=ref([])
    // const titleVal = ref();
    const editor = ref();
    let instance;
    const obj=reactive({
      title:'',
      content:'',
      category:''
    })
    onMounted(() => {
      getOptions()
      instance = new WangEditor(editor.value);
      Object.assign(instance.config, {
          onchange() {
              console.log('change');
          },
      });
      instance.config.menus = [
          'link',
          'quote',
          'emoticon',
          'image',
          'video', 
          'code', 
          'undo',
          'redo',      
      ];
      instance.config.height = 250
      // 挂载highlight插件
      instance.highlight = hljs
      //关闭全屏显示
      instance.config.showFullScreen = false
      // 隐藏插入网络图片的功能
      instance.config.showLinkImg = false
      // 配置 server 接口地址
      instance.config.uploadImgServer = '/upload-img'
      // 编辑区域 focus（聚焦）和 blur（失焦）时触发的回调函数。
      instance.config.onblur = function (newHtml) {
      console.log('onblur', newHtml)
      obj.content=newHtml
        // 获取最新的 html 内容
      }
      instance.create();
      });
      
    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });
    function checkPublish(){
      if(!obj.title){
        message.info('标题为空不可提交')
        return false
      }
      console.log(obj.title);
      if(!instance.txt.html()){
        message.info('内容为空不可提交')
        return false
      }
      console.log(instance.txt.html());
      if(!obj.category){
        message.info('请选择分类')
        return false
      }
       console.log(obj.category);
       return true
    }
      function publishArticle(){
        if(!checkPublish()){
          console.log('不行');
          return
        }
        console.log('obj---------------------',obj);
        httpServe.post('http://localhost:8080/article/publishArticle',obj)
        .then((res)=>{
        console.log(res);
      })
      }
      function getOptions(){
          httpServe.get('http://localhost:8080/article_catrgory/submitArticle')
          .then((res)=>{
          let data=res.data.data
          data=data.map(item=>{
          if(item.child){
            item.child=item.child.map(element=>{
              return {value:element.topic_id,label:element.topic_title}
            })
          }
          return {label:item.category_title,value:item.category_id,children:item.child}
          })
          options.value=data
          message.success(res.data.message)
      })};
      return {
        editor,
        checkPublish,
        getOptions,
        options,
        filter,
        value: ref([]),
        obj,
        publishArticle
      };
  }
};
</script>
<style lang="less" scoped>
.publish_article{
  margin: 0 250px;
  .save{
    display: flex;
    justify-content: center;
  }
}
</style>
