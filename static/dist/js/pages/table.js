 $(function () {
     $("#textFeatures").jsGrid({
        height: "100%",
        width: "100%",

        sorting: true,
        paging: true,

        data: [
            {Name: "id", Meaning: "微博账号标识", Type: "object", Note: "无"},
            {Name: "text", Meaning: "微博正文", Type: "object", Note: "无"},
            {Name: "text_length", Meaning: "微博正文长度", Type: "int", Note: "无"},
            {Name: "contains_questmark", Meaning: "微博正文是否包含 ？", Type: "int", Note: "1：包含，0：不包含"},
            {Name: "num_questmarks", Meaning: "？ 的个数", Type: "int", Note: "无"},
            {Name: "contains_exclammark", Meaning: "微博正文是否包含 ！", Type: "int", Note: "1：包含，0：不包含"},
            {Name: "num_exclammarks", Meaning: "！ 的个数", Type: "int", Note: "无"},
            {Name: "contains_hashtag", Meaning: "微博正文是否包含话题", Type: "int", Note: "1：包含，0：不包含"},
            {Name: "num_hashtags", Meaning: "话题个数", Type: "int", Note: "新浪微博话题格式为两个#，例如 #春节#"},
            {Name: "contains_URL", Meaning: "微博正文是否包含链接", Type: "int", Note: "1：包含，0：不包含"},
            {Name: "num_URLs", Meaning: "链接个数", Type: "int", Note: "链接需包含http头的，例如http://www.baidu.com 计数1；不包含http头的例如www.baidu.com不计数"},
            {Name: "contains_mention", Meaning: "微博正文是否包含提及@", Type: "int", Note: "1：包含，0：不包含"},
            {Name: "num_mentions", Meaning: "@ 的个数", Type: "int", Note: "无"},
            {Name: "sentiment_score", Meaning: "情感分数", Type: "float", Note: "使用snownlp打分，取值0~1之间，越接近0越消极，越接近1越积极"},
            {Name: "num_noun", Meaning: "名词个数", Type: "int", Note: "无"},
            {Name: "num_verb", Meaning: "动词个数", Type: "int", Note: "无"},
            {Name: "num_pronoun", Meaning: "代词个数", Type: "int", Note: "无"},
            {Name: "word2vec_1~100", Meaning: "词向量列1~100", Type: "float", Note: "采用word2vec构建词向量，每个正文利用jieba分词后计算词矩阵之和，并取平均值作为文本的词向量"},
            {Name: "num_possentiwords", Meaning: "积极词汇个数", Type: "int", Note: "无"},
            {Name: "num_negsentiwords", Meaning: "消极词汇个数", Type: "int", Note: "无"},
            {Name: "contains_firstorderpron", Meaning: "是否包含第一人称", Type: "int", Note: "1:有，0：无"},
            {Name: "contains_secondorderpron", Meaning: "是否包含第二人称", Type: "int", Note: "1:有，0：无"},
            {Name: "contains_thirdorderpron", Meaning: "是否包含第三人称", Type: "int", Note: "1:有，0：无"},
            {Name: "category", Meaning: "微博新闻类属", Type: "object", Note: "无"},
            {Name: "label", Meaning: "真假新闻标签", Type: "int", Note: "0：真新闻 ，1:假新闻"}
        ],

        fields: [
            { name: "Name", type: "text", width: 150, title: "特征名称" },
            { name: "Meaning", type: "text", width: 200, title: "意义" },
            { name: "Type", type: "text", width: 50, title: "数据类型" },
            { name: "Note", type: "text",  width: 200, title: "备注" }
        ]
    });

    $('#userFeatures').jsGrid({
        height: "100%",
        width: "100%",
        sorting: true,
        paging: false,

        data: [
            {Name: "user_gender", Meaning: "用户性别", Type: "object", Note: "男、女"},
            {Name: "user_follow_count", Meaning: "用户关注数", Type: "float", Note: "无"},
            {Name: "user_fans_count", Meaning: "用户粉丝数", Type: "float", Note: "无"},
            {Name: "user_weibo_count", Meaning: "用户微博数", Type: "float", Note: "无"},
            {Name: "folfans_ratio", Meaning: "关注/粉丝比", Type: "float", Note: "无"},
            {Name: "user_location", Meaning: "用户所在地", Type: "float", Note: "无"},
            {Name: "user_description", Meaning: "用户个性签名", Type: "float", Note: "无"}
        ],

        fields: [
            { name: "Name", type: "text", width: 150, title: "特征名称" },
            { name: "Meaning", type: "text", width: 200, title: "意义" },
            { name: "Type", type: "text", width: 50, title: "数据类型" },
            { name: "Note", type: "text",  width: 200, title: "备注" }
        ]
    });

    $("#imageFeatures").jsGrid({
        height: "100%",
        width: "100%",

        sorting: true,
        paging: false,

        data: [
            {Name: "sim_image_word", Meaning: "图文相似度", Type: "float", Note: "采用词嵌入方式，减少中英翻译误差中的影响"},
            {Name: "h_first_moment", Meaning: "色相一阶矩", Type: "float", Note: "无"},
            {Name: "s_first_moment", Meaning: "饱和度一阶矩", Type: "float", Note: "无"},
            {Name: "v_first_moment", Meaning: "亮度一阶矩", Type: "float", Note: "无"},
            {Name: "h_second_moment", Meaning: "色相二阶矩", Type: "float", Note: "无"},
            {Name: "s_second_moment", Meaning: "饱和度二阶矩", Type: "float", Note: "无"},
            {Name: "v_second_moment", Meaning: "亮度二阶矩", Type: "float", Note: "无"},
            {Name: "h_third_moment", Meaning: "色相三阶矩", Type: "float", Note: "无"},
            {Name: "s_third_moment", Meaning: "饱和度三阶矩", Type: "float", Note: "无"},
            {Name: "v_third_moment", Meaning: "亮度三阶矩", Type: "float", Note: "无"},
            {Name: "resnet_1~2048", Meaning: "resnet50特征", Type: "float", Note: "无"},
            {Name: "tf_vgg19_class", Meaning: "vgg19分类", Type: "object", Note: "无"},
            {Name: "tf_resnet_class", Meaning: "resnet50分类", Type: "object", Note: "无"},
            {Name: "image_width", Meaning: "图片宽度", Type: "int", Note: "无"},
            {Name: "image_height", Meaning: "图片高度", Type: "int", Note: "无"},
            {Name: "image_kb", Meaning: "图片物理大小", Type: "float", Note: "单位为kb"}
        ],

        fields: [
            { name: "Name", type: "text", width: 150, title: "特征名称" },
            { name: "Meaning", type: "text", width: 200, title: "意义" },
            { name: "Type", type: "text", width: 50, title: "数据类型" },
            { name: "Note", type: "text",  width: 200, title: "备注" }
        ]
    });

    $("#custom-content-below-home-tab").click(function(){
        document.getElementById("custom-content-below-home").className="tab-pane active";
        document.getElementById("custom-content-below-profile").className="tab-pane fade";
        document.getElementById("custom-content-below-messages").className="tab-pane fade";
　　});
    $("#custom-content-below-profile-tab").click(function(){
        document.getElementById("custom-content-below-profile").className="tab-pane active";
        document.getElementById("custom-content-below-home").className="tab-pane fade";
        document.getElementById("custom-content-below-messages").className="tab-pane fade";
　　});
    $("#custom-content-below-messages-tab").click(function(){
        document.getElementById("custom-content-below-messages").className="tab-pane active";
        document.getElementById("custom-content-below-home").className="tab-pane fade";
        document.getElementById("custom-content-below-profile").className="tab-pane fade";
　　});
  });

