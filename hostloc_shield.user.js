// ==UserScript==
// @name         hostloc_shield
// @namespace    https://www.hostloc.com/
// @version      0.2
// @description  屏蔽你想屏蔽的人
// @author       jiangmitiao
// @match        https://www.hostloc.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (!window.localStorage) {
        alert("该浏览器无法使用屏蔽脚本,请使用Chrome浏览器!")
        return
    }

    let key = "shield_person";
    let get = function () {
        let personList = localStorage.getItem(key);
        if (personList === undefined || personList === null || personList === '') {
            personList = "一位不知名网友";
        }
        return personList;
    }
    let getList = function () {
        return get().split(",")
    }
    let set = function (newPersonList) {
        //console.log("set..."+newPersonList)
        localStorage.setItem(key, newPersonList);
    }


    let t = document.createTextNode("屏蔽楼层设置");
    let addButton = document.createElement("a");
    ;
    addButton.appendChild(t);
    addButton.addEventListener("click", function () {
        let newPersonList = prompt("请输入要屏蔽的人名,多人之间用英文逗号分隔:", get());
        if (newPersonList !== null) {
            set(newPersonList)
        }
    });

    document.getElementById("hd").children[0].appendChild(addButton);


    let remove = function () {
        let tableList = document.getElementsByClassName("plhin");
        for (let i = 0; i < tableList.length; i++) {
            let item = tableList[i];
            // console.log(item.getElementsByClassName("xw1")[0].innerHTML)
            getList().forEach(person => {
                if (person == item.getElementsByClassName("xw1")[0].innerHTML) {
                    //console.log(item)
                    console.log("移除", item)
                    item.parentNode.removeChild(item);
                }
            })

        }
    }
    remove();
    window.onmousewheel = document.onmousewheel = remove;

})();
