$(document).ready(function () {
    clickTreeDirectory();
    searchTree();
});

// 点击目录事件
function clickTreeDirectory() {
    var treeActive = $("#tree .active");
    if (treeActive.length) {
        showActiveTree(treeActive, true);
    }

    $(document).on("click", "#tree a[class='directory']", function (e) {
        //清空绑定事件
        event.preventDefault();

        var icon = $(this).children(".fa");
        var iconIsOpen = icon.hasClass("fa-folder-open");
        var subTree = $(this).siblings("ul");

        icon.removeClass("fa-folder-open").removeClass("fa-folder");

        if (iconIsOpen) {
            if (typeof subTree != "undefined") {
                subTree.slideUp({duration: 100});
            }
            icon.addClass("fa-folder");
        } else {
            if (typeof subTree != "undefined") {
                subTree.slideDown({duration: 100});
            }
            icon.addClass("fa-folder-open");
        }
    });
}

// 循环递归打开父节点
function showActiveTree(jqNode, isSibings) {
    if (jqNode.attr("id") === "tree") {
        return;
    }
    if (jqNode.is("ul")) {
        jqNode.css("display", 'block');

        // 这个 isSiblings 是给搜索用的
        // true 就显示开同级兄弟节点
        // false 就是给搜索用的，值需要展示它自己就好了，不展示兄弟节点
        if (isSibings) {
            jqNode.siblings().css("display", "block");
            jqNode.siblings("a").css("display", "inline");
            jqNode.siblings("a").find(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
        }
    }
    jqNode.each(function () {
        showActiveTree($(this).parent(), isSibings);
    });
}

// 搜索框搜索事件（全文搜索需要另外装插件实现，这里只是搜索目录
function searchTree() {
    //解决搜索大小写的问题，a代表节点本身，i代表节点处于位置索引，也就是index，m代表节点属性，m[3]是文本属性
    jQuery.expr[":"].contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    $("#search input").on("input", function (e) {
        console.log("点击搜索");
        e.preventDefault();

        var inputContent = e.currentTarget.value;

        //没有值的时候把父目录收起来，active的目录展开
        if (inputContent.length === 0) {
            $(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");
            $("#tree ul").css("display", "none");
            if ($("#tree .active").length) {
                showActiveTree($("tree .active"), true);
            } else {
                $("#tree").children().css("display", "block");
            }
        } else {
            $(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
            $("#tree ul").css("display", "none");
            var searchResult = $("#tree li").find("a:contains('" + inputContent + "')");
            if (searchResult.length) {
                showActiveTree(searchResult.parent(),false);
            }
        }
    });
}
