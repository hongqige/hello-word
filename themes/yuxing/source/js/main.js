$(document).ready(function () {
    hljs.initHighlightingOnLoad();
    clickTreeDirectory();
    searchTree();
    pjaxLoad();
    switchTreeOrIndex();
});

//pjax局部刷新
function pjaxLoad() {
    $(document).pjax("#tree a", "#content", {fragment: "#content", timeout: 8000});
    $(document).pjax("#menu a", "#content", {fragment: "#content", timeout: 8000});
    $(document).pjax("#articleList a", "#content", {fragment: "#content", timeout: 8000});
    $(document).on({
        "pjax:complete": function (e) {
            $("pre code").each(function (i, block) {
                hljs.highlightBlock(block);
            });

            //添加active
            $("#tree .active").removeClass("active");
            e.relatedTarget.parentNode.classList.add("active");

            showArticleIndex();
        }
    });
}

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
                showActiveTree(searchResult.parent(), false);
            }
        }
    });
}

function showArticleIndex() {
    //先刷一遍文章有哪些节点，把h1,h2,h3加入节点列表，然后循环处理(目录有三级就够用了，不够可以加)
    var h1List = h2List = h3List = [];
    var labelList = $("#article").children();
    for (var i = 0; i < labelList.length; i++) {
        if ($(labelList[i]).is("h1")) {
            h2List = new Array();
            h1List.push({node: $(labelList[i]), id: i, children: h2List});
        }
        if ($(labelList[i]).is("h2")) {
            h3List = new Array();
            h2List.push({node: $(labelList[i]), id: i, children: h3List});
        }

        if ($(labelList[i]).is("h3")) {
            h3List.push({node: $(labelList[i]), id: i, children: []});
        }
    }

    //闭包递归，返回树状html格式的文章目录索引
    function show(tocList) {
        var content = '<ul>';
        tocList.forEach(function (toc) {
            toc.node.before("<span class='anchor' id= '_label" + toc.id + "'><span>");
            if (toc.children == 0) {
                content += "<li><a href='#_label" + toc.id + "'>" + toc.node.text() + "</a></li>";
            } else {
                content += "<li><a href='#_label" + toc.id + "'>" + toc.node.text() + "</a>" + show(toc.children) + "</li>";
            }
        });
        content += "</ul>";
        return content;
    }

    //组合成div方便css设计
    $("aside #toc").empty();
    $("aside #toc").append(show(h1List));

    $("#toc a").on("click", function (e) {
        e.preventDefault();
        //获取当前点击的a标签，滚动到对应位置（像word的索引一样)
        var target = $(this.hash);
        // var target = $(this);
        $("body,html").animate({"scrollTop":target.offset().top}, 500);
    });

    //监听浏览器滚动条，浏览过的标签改变颜色
    $(window).on("scroll", function (e) {
        var anchorList = $(".anchor");
        anchorList.each(function () {
            var tocLink = $("#toc a[href='#" + $(this).attr("id") + "']");
            var anchorTop = $(this).offset().top;
            var windowTop = $(window).scrollTop();
            if (anchorTop <= windowTop + 50) {
                tocLink.addClass("read");
            } else {
                tocLink.removeClass("read");
            }
        });
    });
}

function switchTreeOrIndex() {
    $("#search-icon").on("click", function (e) {
        $("#tree").animate({height: 'toggle'}, 0);
        $("#toc").animate({height: 'toggle'}, 0);
    });
}