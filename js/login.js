var login = (function(){

    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$loginBtn = this.$ele['login-btn'];
            this.$usernameInp =   this.$ele['username'];
            this.$passwordInp =   this.$ele['password'];
            this.event();
        },
        event: function() {
            var _this = this;
            // 提交按钮
            this.$loginBtn.onclick = function() {
                // 发送ajax，验证用户名和密码
                var params = {
                    method: 'post',
                    data: {
                        username: _this.$usernameInp.value,
                        password: _this.$passwordInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.loginSuccess(data);
                    }
                }
                sendAjax('http://localhost:8080/project/php/login.php', params);
            }
        },
        loginSuccess: function(data) {
            if(data.code == 200) {
                var add = true;
                var userlist = localStorage.userList || '[]';
                localStorage.userList = '';
                userlist = JSON.parse(userlist)
                for (var i = 0; i < userlist.length; i++) {
                    if(data.data.name != userlist[i]){
                        add = false
                        break;
                    }
                }
                if(add){
                    userlist.push(data.data);
                }
                localStorage.userList = JSON.stringify(userlist);
                // userlist[user-id] = data.data.id;
                // userlist[username] = data.data.username;
                // userlist[token] = data.data.token;
                // var $cookie = new OperationCookie();
                // $cookie.setItem("user-id" , data.data.id,7);
                // $cookie.setItem("token" , data.data.token,7);
                // $cookie.getItem('user');
                location.href = '../index.html';
            } else {
                alert(data.msg);
            }
        }
    }

}())