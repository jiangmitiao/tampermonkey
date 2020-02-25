// ==UserScript==
// @name         hostloc_shield
// @namespace    https://www.hostloc.com/
// @version      0.1
// @description  屏蔽你想屏蔽的人
// @author       jiangmitiao
// @match        https://www.hostloc.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

(function() {
    'use strict';

    if (!window.localStorage){
        alert("该浏览器无法使用屏蔽脚本,请使用Chrome浏览器!")
        return
    }

    let key = "shield_person";
    let get = function(){
        let personList = localStorage.getItem(key);
        if (personList === undefined || personList ===null || personList === '' ){
            personList = "一位不知名网友";
        }
        return personList;
    }
    let getList = function(){
        return get().split(",")
    }
    let set = function(newPersonList){
        //console.log("set..."+newPersonList)
        localStorage.setItem(key,newPersonList);
    }





    let addButton = $("<a>屏蔽楼层设置</a>");
    $(addButton).click(()=>{
        let newPersonList = prompt("请输入要屏蔽的人名,多人之间用英文逗号分隔:",get());
        if (newPersonList !== null){
            set(newPersonList)
        }
    });
    $("a[title='全球主机交流论坛']").parent().prepend(addButton);


    let remove = function(){
        $("table.plhin").each((index,item)=>{
            $(item).find("a.xw1").each((i,name)=>{
                getList().forEach(person => {
                    if (person === $(name).text() ){
                        //console.log(item)
                        $(item).remove()
                    }
                })

            });
        });
    }
    remove();
    window.onmousewheel = document.onmousewheel = remove;

})();
