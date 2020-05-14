from flask import Flask, request,jsonify, render_template
from flask_cors import *
import numpy as np
import pandas as pd
from sklearn import model_selection, metrics
from wordcloud import WordCloud
import matplotlib.image as mpimg
from decimal import *
from sklearn.externals import joblib

app = Flask(__name__)
CORS(app, supports_credentials=True)

user_csv_path = r'G:\毕设\数据集\微博\user.csv'
fusion_no_object_csv_path = r'./static/model/fusion_news_features_0404_no_dup.csv'
main_test_path = r'./static/model/test.csv'
selected_features_data_path = r'./static/model/0404_filter_rfe_no_dup_0410.txt'
sklearn_model_path = r'./static/model/train_model.m'

def get_selected_features(path=selected_features_data_path):
    """
    加载特征选择后保留的特征列表
    :return:
    """
    my_words = []
    f = open(path, "r", encoding='UTF-8')
    for eachWord in f.readlines():
        my_words.append(eachWord.strip())
    f.close()
    return my_words

selected_features = get_selected_features()
selected_features.append('label')
selected_features.append('text_file')


def save_model(model, model_path):
    """
    保存训练好的sklearn分类预测模型
    """
    joblib.dump(model, model_path)
    print("模型已经保存在" + model_path)


def load_model(model_path):
    """
    加载之前训练好的sklearn分类预测模型
    """
    model = joblib.load(model_path)
    return model

def user_data_read():
    '''
    用户特征文件的读取
    :return: 用户特征文件
    '''
    df_user = pd.read_csv(user_csv_path)
    return df_user


def get_user_location(user_csv_path):
    # df_user = user_data_read()
    # unknown = 0 #未知
    # others = 0  #其他
    # overseas = 0 #海外
    # BJ = 0  #北京
    # TJ = 0  #天津
    # SH = 0  #上海
    # CQ = 0  #重庆
    # HE = 0  #河北
    # SX = 0  #山西
    # SD = 0  #山东
    # NM = 0  #内蒙古
    # LN = 0  #辽宁
    # JL = 0  #吉林
    # HL = 0  #黑龙江
    # JS = 0  #江苏
    # ZJ = 0  #浙江
    # AH = 0  #安徽
    # FJ = 0  #福建
    # JX = 0  #江西
    # HA = 0  #河南
    # HB = 0  #湖北
    # HN = 0  #湖南
    # GD = 0  #广东
    # GX = 0  #广西
    # HI = 0  #海南
    # SC = 0  #四川
    # GZ = 0  #贵州
    # YN = 0  #云南
    # XZ = 0  #西藏
    # SN = 0  #陕西
    # GS = 0  #甘肃
    # QH = 0  #青海
    # NX = 0  #宁夏
    # XJ = 0  #新疆
    # HongKong= 0  #香港
    # Macao= 0  #澳门
    # Taiwan= 0  #台湾
    # for index, row in df_user.iterrows():
    #     user_location = row['user_location']
    #     if(pd.isna(user_location)):
    #         unknown += 1
    #     elif(user_location[0:2] == '其他'):
    #         others += 1
    #     elif (user_location[0:2] == '海外'):
    #         overseas += 1
    #     elif (user_location[0:2] == '北京'):
    #         BJ += 1
    #     elif (user_location[0:2] == '天津'):
    #         TJ += 1
    #     elif (user_location[0:2] == '上海'):
    #         SH += 1
    #     elif (user_location[0:2] == '重庆'):
    #         CQ += 1
    #     elif (user_location[0:2] == '河北'):
    #         HE += 1
    #     elif (user_location[0:2] == '山西'):
    #         SX += 1
    #     elif (user_location[0:2] == '山东'):
    #         SD += 1
    #     elif (user_location[0:2] == '内蒙'):
    #         NM += 1
    #     elif (user_location[0:2] == '辽宁'):
    #         LN += 1
    #     elif (user_location[0:2] == '吉林'):
    #         JL += 1
    #     elif (user_location[0:2] == '黑龙'):
    #         HL += 1
    #     elif (user_location[0:2] == '江苏'):
    #         JS += 1
    #     elif (user_location[0:2] == '浙江'):
    #         ZJ += 1
    #     elif (user_location[0:2] == '安徽'):
    #         AH += 1
    #     elif (user_location[0:2] == '福建'):
    #         FJ += 1
    #     elif (user_location[0:2] == '江西'):
    #         JX += 1
    #     elif (user_location[0:2] == '河南'):
    #         HA += 1
    #     elif (user_location[0:2] == '湖北'):
    #         HB += 1
    #     elif (user_location[0:2] == '湖南'):
    #         HN += 1
    #     elif (user_location[0:2] == '广东'):
    #         GD += 1
    #     elif (user_location[0:2] == '广西'):
    #         GX += 1
    #     elif (user_location[0:2] == '海南'):
    #         HI += 1
    #     elif (user_location[0:2] == '四川'):
    #         SC += 1
    #     elif (user_location[0:2] == '贵州'):
    #         GZ += 1
    #     elif (user_location[0:2] == '云南'):
    #         YN += 1
    #     elif (user_location[0:2] == '西藏'):
    #         XZ += 1
    #     elif (user_location[0:2] == '陕西'):
    #         SN += 1
    #     elif (user_location[0:2] == '甘肃'):
    #         GS += 1
    #     elif (user_location[0:2] == '青海'):
    #         QH += 1
    #     elif (user_location[0:2] == '宁夏'):
    #         NX += 1
    #     elif (user_location[0:2] == '新疆'):
    #         XJ += 1
    #     elif (user_location[0:2] == '香港'):
    #         HongKong += 1
    #     elif (user_location[0:2] == '澳门'):
    #         Macao += 1
    #     elif (user_location[0:2] == '台湾'):
    #         Taiwan += 1
    # map = [{"name":"北京","value":BJ},
    #        {"name":"天津","value":TJ},
    #        {"name":"上海","value":SH},
    #        {"name":"重庆","value":CQ},
    #        {"name":"河北","value":HE},
    #        {"name":"山西","value":SX},
    #        {"name": "山东", "value": SD},
    #        {"name":"内蒙古","value":NM},
    #        {"name":"辽宁","value":LN},
    #        {"name":"吉林","value":JL},
    #        {"name":"黑龙江","value":HL},
    #        {"name":"江苏","value":JS},
    #        {"name":"浙江","value":ZJ},
    #        {"name":"安徽","value":AH},
    #        {"name":"福建","value":FJ},
    #        {"name":"江西","value":JX},
    #        {"name":"河南","value":HA},
    #        {"name":"湖北","value":HB},
    #        {"name":"湖南","value":HN},
    #        {"name":"广东","value":GD},
    #        {"name":"广西","value":GX},
    #        {"name":"海南","value":HI},
    #        {"name":"四川","value":SC},
    #        {"name":"贵州","value":GZ},
    #        {"name":"云南","value":YN},
    #        {"name":"西藏","value":XZ},
    #        {"name":"陕西","value":SN},
    #        {"name":"甘肃","value":GS},
    #        {"name":"青海","value":QH},
    #        {"name":"宁夏","value":NX},
    #        {"name":"新疆","value":XJ},
    #        {"name":"香港","value":HongKong},
    #        {"name":"澳门","value":Macao},
    #        {"name":"台湾","value":Taiwan},
    #        {"name": "南海诸岛", "value": 0},
    #        {"name":"未知","value":unknown},
    #        {"name":"海外","value":overseas},
    #        {"name":"其他","value":others}]
    # print(map)
    map = [{'name': '北京', 'value': 6027}, {'name': '天津', 'value': 578}, {'name': '上海', 'value': 1891},
           {'name': '重庆', 'value': 623}, {'name': '河北', 'value': 1047}, {'name': '山西', 'value': 461},
           {'name': '山东', 'value': 1708}, {'name': '内蒙古', 'value': 296}, {'name': '辽宁', 'value': 1076},
           {'name': '吉林', 'value': 453}, {'name': '黑龙江', 'value': 453}, {'name': '江苏', 'value': 1924},
           {'name': '浙江', 'value': 1890}, {'name': '安徽', 'value': 836}, {'name': '福建', 'value': 1164},
           {'name': '江西', 'value': 567}, {'name': '河南', 'value': 1495}, {'name': '湖北', 'value': 1087},
           {'name': '湖南', 'value': 787}, {'name': '广东', 'value': 4078}, {'name': '广西', 'value': 505},
           {'name': '海南', 'value': 246}, {'name': '四川', 'value': 1859}, {'name': '贵州', 'value': 367},
           {'name': '云南', 'value': 445}, {'name': '西藏', 'value': 66}, {'name': '陕西', 'value': 1331},
           {'name': '甘肃', 'value': 349}, {'name': '青海', 'value': 85}, {'name': '宁夏', 'value': 72},
           {'name': '新疆', 'value': 208}, {'name': '香港', 'value': 287}, {'name': '澳门', 'value': 44},
           {'name': '台湾', 'value': 99}, {'name': '南海诸岛', 'value': 0}, {'name': '未知', 'value': 537},
           {'name': '海外', 'value': 1170}, {'name': '其他', 'value': 2360}]
    return map


def get_user_gender(user_csv_path):
    # df_user = user_data_read()
    # unknown = 0 #未知
    # male = 0 #男性
    # female = 0 #女性
    # for index, row in df_user.iterrows():
    #     user_gender = row['user_gender']
    #     if (pd.isna(user_gender)):
    #         unknown += 1
    #     elif (user_gender == '男'):
    #         male += 1
    #     elif (user_gender == '女'):
    #         female += 1
    # list_gender = [male, female, unknown]
    list_gender = [22607, 15419, 445]
    list_gender = map(lambda x: str(x), list_gender)
    print(list_gender)
    response = {"status": 200,
                "gender": ','.join(list_gender)}
    return response


def draw_word_cloud():
    # 读取中文内容
    with open(r'E:\PythonCode\Features\util\word2vec_corpus.txt', "r", encoding='UTF-8') as f:
        chinese_text = f.readlines()
        text_1 = chinese_text[0:19188]
        text_2 = chinese_text[19188:]
        text_2_new = []
        for item in text_2:
            if item.find('锦绣') == -1:
                text_2_new.append(item)

    # 设置背景图片
    background_img = mpimg.imread('./static/image/mapmask.jpg')

    # 设置词云属性
    font_path = 'D:\Fonts\simkai.ttf'  # 为matplotlib设置中文字体路径
    wc = WordCloud(font_path=font_path,  # 设置字体
                   background_color="white",  # 背景颜色
                   max_words=400,  # 词云显示的最大词数
                   mask=background_img,  # 设置背景图片
                   max_font_size=50,  # 字体最大值
                   random_state=42,
                   width=1000,
                   height=860,
                   margin=2,
                   )
    # 中文
    wc.generate(" ".join(text_1))
    wc.to_file("./static/image/wordcloud_1.png")
    wc.generate(" ".join(text_2_new))
    wc.to_file("./static/image/wordcloud_2.png")


@app.route('/')
def login_ui():
    # draw_word_cloud()
    # detect_test_model()
    return render_template('login.html')


@app.route('/start')
def start_ui():
    return render_template('start.html')

@app.route('/model')
def model_ui():
    return render_template('model.html')

@app.route('/detect')
def detect_ui():
    return render_template('detect.html')

@app.route('/about')
def about_ui():
    return render_template('about.html')


@app.route('/detect/test', methods=['POST', 'GET'])
def detect_test_model():
    print("前端正在检测新闻...")
    df = pd.read_csv(main_test_path,usecols=selected_features)
    label = 'label'
    df.fillna(0, inplace=True)
    # X_train, X_test, y_train, y_test = model_selection.train_test_split(df.drop(label, axis=1),
    #                                                                     df['label'],
    #                                                                     test_size=0.25,
    #                                                                     random_state=1234)
    X_test = df.drop([label, 'text_file'], axis=1)
    y_test = df['label']
    model = load_model(sklearn_model_path)
    rf_pred = model.predict(X_test)
    # print('随机森林ACC：\n', metrics.accuracy_score(y_test, rf_pred))
    # print('随机森林F 1：\n', metrics.f1_score(y_test, rf_pred, average='weighted'))
    # print('随机森林AUC：\n', metrics.roc_auc_score(y_test, rf_pred))
    map = []
    i = 0
    for index, row in df.iterrows():
        dic = {"Id": str(i+1), "Content": row['text_file'], "Type": "真" if rf_pred[i] == 0 else "假"}
        map.append(dic)
        i += 1
    # user_location = row['user_location']

    response = {"status": 200,
                "acc": str(metrics.accuracy_score(y_test, rf_pred)),
                "f1": str(metrics.f1_score(y_test, rf_pred, average='weighted')),
                "auc": str(metrics.roc_auc_score(y_test, rf_pred)),
                "result": map}
    return jsonify(response)


@app.route('/getTable', methods=['POST', 'GET'])
def get_table():
    print("前端正在请求表格...")
    # list1 = np.random.randint(0, 200, 7).tolist()
    # list1 = map(lambda x: str(x), list1)
    # list2 = np.random.randint(0, 100, 7).tolist()
    # list2 = map(lambda x: str(x), list2)
    list1 = [0.933, 0.958, 0.960, 0.954, 0.946, 0.958, 0.956]
    list2 = [0.940, 0.917, 0.932, 0.934, 0.937, 0.939, 0.934]
    rise_ratio = (np.mean(list1) - np.mean(list2)) / np.mean(list2)
    rise_ratio = float(Decimal(rise_ratio).quantize(Decimal('0.0000'))) # 规范小数点位数，四舍五入
    print(rise_ratio)
    list1 = map(lambda x: str(x), list1)
    list2 = map(lambda x: str(x), list2)
    response = {"status": 200,
                "msg1": ','.join(list1),
                "msg2": ','.join(list2),
                "riseRatio": rise_ratio}
    return jsonify(response)


@app.route('/getMap', methods=['POST', 'GET'])
def get_map():
    print("前端正在请求地图...")
    return jsonify(get_user_location(user_csv_path))


@app.route('/getGender', methods=['POST', 'GET'])
def get_gender():
    print("前端正在请求性别...")
    return jsonify(get_user_gender(user_csv_path))


@app.route('/login', methods=['POST', 'GET'])
def login():
    print("前端正在请求登录...")
    if request.method == 'POST':
        print('用户名' + request.form['user'])
        print('密码' + request.form['password'])
        if request.form['user'] == 'admin' and request.form['password'] == '123456':
            print('成功了')
            response = {"status": 200,
                        "msg": "success"}
            return jsonify(response)
        else:
            print('错误了')
            response = {"status": 200,
                        "msg": "error"}
            return jsonify(response)


@app.route('/getWordCloud', methods=['POST', 'GET'])
def get_word_cloud():
    return

if __name__ == '__main__':
    app.run(debug=True)
    draw_word_cloud()
