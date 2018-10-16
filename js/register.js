var register = (function(){

    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$register = this.$ele['register-btn'];
            this.$usernameInp =   this.$ele['username'];
            this.$passwordInp =   this.$ele['password'];
            this.event();
        },
        event: function() {
            var _this = this;
            // 提交按钮
            this.$register.onclick = function() {
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
                sendAjax('http://localhost:8080/project/php/register.php', params);
            }
        },
        loginSuccess: function(data) {
            var _username = document.querySelector('.username');
            var _password = document.querySelector('.password');
            var _check_password = document.querySelector('.check-password');
            var _progress = document.querySelector('.progress');
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
                // document.cookie = "user-id=" + data.data.id;
                // document.cookie = "token=" + data.data.token;
                // localStorage.userImg = data.data.ataver;
                location.href = '../index.html';
            } else {
                _username.value = '';
                _password.value = '';
                _check_password.value = '';
                _progress.children[0].style.background = '#ccc';
                _progress.children[1].style.background = '#ccc';
                _progress.children[2].style.background = '#ccc';
                _username.focus();
                alert(data.msg);
            }
        }
    }

}())