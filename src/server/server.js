import axios from 'axios';




const DO_MIGRATE_API='doMigrate'


export function sendMigrateRequest(databaseConfig){

    //请求前更新List的数据
    axios({
        baseURL:'http://localhost:4567',//replace to your server url
        method:'post',
        url:`${DO_MIGRATE_API}`,
        data:databaseConfig
    }).then(
        response => {
            console.log('请求成功了'+JSON.stringify(response.data));
            return response.data
        },
        error => {
            alert(error.message);
        }
    )
}

