/*
* @Author: mingming
* @Date:   2018-03-04 11:05:29
* @Last Modified by:   mingming
* @Last Modified time: 2018-03-13 17:53:26
*/
export const http = {
  'ajaxPost': function (this_, url, params, successFn, failFn) {
    this_.$http.post(url, params, {emulateJSON: false}).then((res) => {
      if (res.data.code === 200) {
        this_.$message({
          message: res.data.msg,
          type: 'success'
        });
      } else {
        this_.$message({
          message: res.data.msg,
          type: 'error'
        });
      }
      if (successFn) {
        successFn(res.data);
      }
    }, response => {
      this_.$message({
        message: '请求失败',
        type: 'error'
      });
      if (failFn) {
        failFn();
      }
    });
  },
  'ajaxPostFile': function (this_, url, params, successFn, failFn) {
    var formdata = new FormData();
    formdata.append('files', document.getElementById('photo').files[0]);// 获取文件法二
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    // xhr.setRequestHeader("Content-Type", false);
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && (xhr.status >= 0 && xhr.status < 400)) {
        var data = xhr.responseText;
        successFn(data);
      }
    };
  },
  'ajaxGet': function (this_, url, params, successFn, failFn) {
    this_.$http.get(url, params, {emulateJSON: false}).then((res) => {
      if (successFn) {
        successFn(res.data);
      }
    }, response => {
      this_.$message({
        message: '请求失败',
        type: 'error'
      });
      if (failFn) {
        failFn();
      }
    });
  }
};
