          $(document).ready(() => {
            function removeAccents(str) {
                var AccentsMap = [
                    "aàảãáạăằẳẵắặâầẩẫấậ",
                    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
                    "dđ", "DĐ",
                    "eèẻẽéẹêềểễếệ",
                    "EÈẺẼÉẸÊỀỂỄẾỆ",
                    "iìỉĩíị",
                    "IÌỈĨÍỊ",
                    "oòỏõóọôồổỗốộơờởỡớợ",
                    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
                    "uùủũúụưừửữứự",
                    "UÙỦŨÚỤƯỪỬỮỨỰ",
                    "yỳỷỹýỵ",
                    "YỲỶỸÝỴ"
                ];
                for (var i = 0; i < AccentsMap.length; i++) {
                    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
                    var char = AccentsMap[i][0];
                    str = str.replace(re, char);
                }
                return str;
            }

            const get_email = async (fullname, email) => {
                fullname = await removeAccents(fullname);
                fullname = fullname.toLowerCase()
                fullname = fullname.split(" ");
                var fullemail = fullname.pop();
                for (var word of fullname) {
                    fullemail += word[0]
                }
                fullemail += '@' + email;
                return fullemail;
            }
            const shuffle = (s) => {
                const str = s.split('')
                    .sort(() => 0.5 - Math.random())
                    .join('');
                return str;
            }
            const generate_password = async (length) => {
                var list_char = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz@#';
                var shuff = await shuffle(list_char)
                var password = ""
                for (var idx = 0; idx < length; idx += 1) {
                    password += shuff[idx];
                }
                return password;
            }

            $(".convert").click(async (e) => {
                var content = $("#autoresizing").val();
                var email = $("#email").val();
                content = content.split("\n")
                var data = [];
                var dom = '';
                for (var idx = 0; idx < content.length; idx += 1) {
                    var fullname = content[idx];
                    fullname = fullname.split(" ")
                    var lastname = fullname.pop()
                    var firstname = fullname.join(" ")
                    var json = {
                        firstname: firstname,
                        lastname: lastname,
                        email: await get_email(firstname + " " + lastname, email),
                        password: await generate_password(12)
                    }
                    data.push(json)
                    dom += `
                        <tr>
                            <td style="width: 388px">${json.firstname}</td>
                            <td style="width: 150px">${json.lastname}</td>
                            <td style="width: 438px">${json.email}</td>
                            <td>${json.password}</td>
                        </tr>
                    `
                }
                $(".table_page").removeClass("cls_none");
                $(".table_page tbody").html(dom);
                window.localStorage.setItem("data", JSON.stringify(data));
                // console.log(data)
            })
            function selectElementContents(el) {
                var body = document.body, range, sel;
                if (document.createRange && window.getSelection) {
                    range = document.createRange();
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    try {
                        range.selectNodeContents(el);
                        sel.addRange(range);
                    } catch (e) {
                        range.selectNode(el);
                        sel.addRange(range);
                    }
                } else if (body.createTextRange) {
                    range = body.createTextRange();
                    range.moveToElementText(el);
                    range.select();
                }
            }
            $(".copy").click(async (e) => {

                var data = JSON.parse(window.localStorage.getItem("data"));
                var content = "";
                for (var row of data) {
                    content += row.firstname
                    content += '&emsp;';
                    content += row.lastname
                    content += '&emsp;'
                    content += row.email
                    content += '&emsp;'
                    content += row.password
                    content += '<br />';
                }
            })
        })

  function selectElementContents(el) {
    var body = document.body,
      range, sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      range.selectNodeContents(el);
      sel.addRange(range);
    }
    document.execCommand("Copy");
    document.getElementById("email").focus();
    var Arlert=document.getElementById("success");
    Arlert.innerHTML="Copy to clipboard success";
    Arlert.style.display="block";
  }
  function hidden(){
    document.getElementById("success").style.display="none";
  }
  function noshow(){
    document.getElementById("success").style.display="none";
  }
  function checkmail(){
    return(true)
  }