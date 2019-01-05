<template>
  <div>
    <el-upload
        action=""
        :http-request="doUpload"
        list-type="picture-card"
        :limit="imageValue?100:1"
        :file-list="filelist"
        :before-upload="beforeAvatarUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-remove="fuck">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default{
  props: {
    imageValue: Boolean,
    fileListUrls: Array,
  },
  data() {
    return {
      region: 'oss-cn-shenzhen',
      bucket: 'douyao',
      showUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      filelist: [],
    };
  },
  mounted() {
    console.log('mounted', this.fileListUrls[0]);
    if (this.fileListUrls[0] && !this.fileListUrls[0].url) {
      this.filelist = [];
    } else {
      console.log('fileListUrls', this.fileListUrls);
      this.filelist = this.fileListUrls;
    }
  },
  methods: {
    fuck(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isGIF = file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error('上传图片只能是 JPG或PNG 或 gif 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false;
      }
    },
    handleRemove(file, fileList) {
      console.log(1)
      // console.log(file, fileList);
      this.$emit('imageIndex');
      this.$emit('deleteUrl', fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    doUpload(params) {
      let name = '.' + params.file.type.split('/')[1]
      // console.log(name)
      const loading = this.$loading({
        lock: true,
        text: '拼命上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const changes = this;

      this.$http.get('/admin/album/ossinfo').then((result) => {
        // console.log(result);
        const client = new window.OSS.Wrapper({
          //region: changes.region,
          accessKeyId: result.data.accessid,
          accessKeySecret: result.data.accesskey,
          bucket: changes.bucket,
          cname: true,
          objectKey: 'adminImages/',
          endpoint: 'https://cdn.idouyao.com',
        });
        let times = this.getRandomNumber();
        // console.log(times);
        const storeAs = 'adminImages/' + times + name ;
        // console.log(storeAs);
        const file = params.file;
        client.multipartUpload(storeAs, file, {
        }).then((results) => {
          this.a = results;
          // console.log(this.a);
          const paramss = {
            picUrl: this.showUrl,
            groupId: 'adminImages',
          };
          this.$http.post('/admin/Album/addImage', paramss).then((result) => {
            // console.log(result);
            // console.log('addImage', this.filelist);
            // this.$store.commit('changeId', this.filelist);
            this.$emit('imageIndex');
            this.$emit('url', result.data, this.filelist);
            loading.close();
          });
        }).catch((err) => {
          // console.log(err);
        });
        this.showUrl = 'https://cdn.idouyao.com/adminImages/' + times + name;
        // console.log(this.showUrl);
      });
    },
    // 创建一个随机数
    getRandomNumber() {
      let randomNumber = '';
      randomNumber += Math.floor(Math.random() * 10000000);
      return randomNumber;
    },
  },
};
</script>
<style type="text/css">
  .oss_file {
    height: 100px;
    width: 100%;
  }
  .oss_file input {
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
</style>
