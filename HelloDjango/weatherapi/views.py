from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from jhapp.views import already_authorized
from jhapp.models import User
from weatherapi.city_code import get_city_code
import requests
import json


# Create your views here.
# def weather_josn(request):
#     city = request.GET.get('city')
#
#     # print('----->', city)
#     city = [city]
#     city_code = get_city_code(city)
#     # print('----->', city_code)
#     # datas = []
#     datas = {}
#     for i in city_code:
#         data = {}
#         url = f'http://t.weather.sojson.com/api/weather/city/{i[1]}'
#         city_info = requests.get(url)
#         print('+++++++++++>',city_info.json()['data']['forecast'])
#         # data[i[0]] = city_info.text.message.data.forecast
#         data[i[0]] = city_info.json()['data']['forecast']
#         # datas.append(data)
#         datas['data'] = data
#     print('+-+-+-+-+-+', datas)
#     print('+-+-+-+-+-+', type(datas))
#     return JsonResponse(datas, safe=False)


def weather(cityname):

    key = '7d7eacced2175d9ef11a2aa87d45d098'
    api = 'http://apis.juhe.cn/simpleWeather/query'
    params = 'city=%s&key=%s' % (cityname[0:2], key)
    url = api + '?' + params
    print(url)
    response = requests.get(url=url)
    data = json.loads(response.text)
    print(data)
    result = data.get('result')
    print('--------------',result)
    realtime = result.get('realtime')
    response = {}
    response['temperature'] = realtime.get('temperature')  #温度
    response['wid'] = realtime.get('wid') # 风况
    response['humidity'] = realtime.get('humidity')  #湿度
    response['power'] = realtime.get('power')  #风力
    response['info'] = realtime.get('info')  #天气信息
    return response


class Weather(View):
    def get(self, request):
        if not already_authorized(request):
            response = {'key':2500}
        else:
            data = []
            openid = request.session.get('openid')
            user = User.objects.filter(openid=openid)[0]
            cities = json.loads(user.focus_cities)
            for city in cities:
                result = weather(city.get('city'))
                result['city_info'] = city
                data.append(result)
            response = data
        return JsonResponse(data=response, safe=False)


    def post(self, request):
        data = []
        received_body = request.body.decode('utf-8')
        received_body = json.loads(received_body)
        print(received_body)
        cities = received_body.get('cities')
        for city in cities:
            result = weather(city.get('city'))
            result['city_info'] = city
            data.append(result)
        response_data = {'key':'post..'}
        return JsonResponse(data=response_data, safe=False)


