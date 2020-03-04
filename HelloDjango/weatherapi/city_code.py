import json

filename = r'E:\新建文件夹\weather.api\src\main\resources\citycode-2019-08-23.json'


def openfile(filename, encoding='utf-8'):
    with open(filename, 'r', encoding=encoding)as f:
        return json.loads(f.read())


# for i in city_code_list:
#     # print(i)
#     if i['city_code'] != '':
#         print(i['city_name'], i['city_code'])

def get_city_code(citynames):
    cityname_list = []
    city_infos = openfile(filename)
    for i in city_infos:
        for cityname in citynames:
            if i['city_name'] == cityname:
                cityname_list.append((i['city_name'], i['city_code']))
    return cityname_list


def main(citynames):
    city_codes = get_city_code(citynames)
    return city_codes


if __name__ == '__main__':
    # citynames = ['隰县', '临汾', '太原', '北京']
    citynames = ['隰县']
    print(main(citynames)[0][0])
