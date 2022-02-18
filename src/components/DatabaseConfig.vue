<template>
<!-- app start-->
  <div id="app">
    <h3 style="text-align:center">mysql-to-opengauss</h3>
    <div id="container" style="width: 80%;margin: auto;">
      <el-form   label-position="left" ref="dataBaseConfigForm" :rules="rules"  :model="database" :inline="true" label-width="80px">

      <!-- header start  -->
        <el-row class="header" :gutter="20" >
          <el-col  :span="12"><div>
            源主机
          </div></el-col>
          <el-col :span="12"><div>
            目的主机
          </div></el-col>
        </el-row>
        <!-- header end  -->

        <!--  host start    -->
      <el-row :gutter="20" >

        <el-col :span="12">
          <el-form-item label="主机地址" prop="from_host">
          <el-input   v-model="database.from_host" class="inline-input"  clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="主机地址" prop="to_host">
          <el-input v-model="database.to_host" class="inline-input"  clearable></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <!--  host end    -->

      <!--  port start    -->
        <el-row :gutter="20" >

          <el-col :span="12">
            <el-form-item label="端口" prop="from_port">
              <el-input   v-model="database.from_port" class="inline-input"  clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="端口" prop="to_port">
              <el-input v-model="database.to_port" class="inline-input"  clearable></el-input>
            </el-form-item>
          </el-col>

        </el-row>
      <!--  port end    -->

      <!--  username start    -->
        <el-row :gutter="20" >

          <el-col :span="12">
            <el-form-item label="用户名" prop="from_username">
              <el-input   v-model="database.from_username" class="inline-input"  clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="用户名" prop="to_username">
              <el-input v-model="database.to_username" class="inline-input"  clearable>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
      <!--  username end    -->

      <!--  password start    -->
        <el-row  :gutter="20" >

          <el-col :span="12">
            <el-form-item label="密码" prop="from_password">
              <el-input   v-model="database.from_password" class="inline-input"   show-password clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="密码" prop="to_password">
              <el-input v-model="database.to_password" class="inline-input" show-password  clearable></el-input>
            </el-form-item>
          </el-col>

        </el-row>
      <!--  password end    -->

        <!--  database_name start    -->
        <el-row  :gutter="20" >

          <el-col :span="12">
            <el-form-item label="数据库名" prop="from_database_name">
              <el-input   v-model="database.from_database_name" class="inline-input"    clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="数据库名" prop="to_database_name">
              <el-input v-model="database.to_database_name" class="inline-input"   clearable></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <!--  database_name end    -->


      </el-form>

      <el-divider></el-divider>

      <div style="margin: 20px 0;"></div>
      <div style="width: 80%;margin: auto;">
        <el-row>
          <el-input  id="" type="textarea"
                    :autosize="{ minRows: 10, maxRows: 10}"
                    placeholder="传输日志" resize="none" v-model="result">
          </el-input>
        </el-row>
      </div>

      <div style="margin: 20px 0;"></div>

      <el-row style="text-align:center;padding-bottom: 20px;">

        <el-button @click="submitForm('dataBaseConfigForm')" type="danger" round>开始传输</el-button>

      </el-row>

    </div>

  </div>
<!--app end-->

</template>

<script>

import axios from "axios";
import qs from 'qs';
export default {
  data() {
    return {
      /*database config*/
      database:{

        from_host:'127.0.0.1',
        from_port:'3333',
        from_username:'root',
        from_password:'root123..0',
        from_database_name:'test',

        to_host:'aaf3706461a90176.natapp.cc',
        to_port:'32323',
        to_username:'jack',
        to_password:'root123..0',
        to_database_name:'postgres'
      },
      result:'',
      rules:{
        from_host:[
            { required: true, message: '不能为空',trigger: 'blur' }
        ],
        from_port:[
            { required: true, message: '不能为空',trigger: 'blur' }
        ],
        from_username:[
            { required: true, message: '不能为空',trigger: 'blur' }
        ],
        from_password:[
            { required: true, message: '不能为空',trigger: 'blur' }
        ],
        to_host:[
            { required: true, message: '不能为空',trigger: 'blur' }
        ],
        to_port:[
            { required: true, message: '不能为空',trigger: 'blur' }
        ],
        to_username:[
            { required: true, message: '不能为空',trigger: 'blur' }
        ],
        to_password:[
            { required: true, message: '不能为空',trigger: 'blur' }
        ],
        to_database_name:[
            { required: true, message: '不能为空',trigger: 'blur' }
        ],
        from_database_name:[
            { required: true, message: '不能为空',trigger: 'blur' }
        ],

      }

    };
  },

  methods: {

    submitForm(formName){

      this.$refs[formName].validate((valid) => {

        if (valid) {

          this.doMigrate()

        } else {

          console.log('error submit!!')
          return false

        }

      });
    },

    async  doMigrate(){

      const DO_MIGRATE_API='doMigrate'
      //请求前更新List的数据
      axios({
        baseURL:'http://localhost:4567',//replace to your server url
        method:'post',
        url:`${DO_MIGRATE_API}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data:qs.stringify(this.database)
      }).then(
          response => {
            //append message to output area
            this.appendMsg(JSON.stringify(response.data))
          },
          error => {
            alert(error.message);
          }
      )
    },

    appendMsg(msg){
      this.result=this.result+msg
    }
  }
}
</script>


<style scoped>

.header{
  font-family: "Helvetica Neue";
  line-height:1.7;
  font-size: larger;
}

#app {
  width: 40%;
  margin: auto;
  background: white;
  padding-top: 1px;
  border-radius: 25px;
}
</style>
