from HelloDjango import settings
from hashlib import md5
import os


class Code():
    SUCCESS = 2000
    FAILED = 2222

    # @classmethod
    def get(self, code):
        if code == self.SUCCESS:
            return 'response success'
        elif code == self.FAILED:
            return 'response failed'
        else:
            return "I don't no"


class ResponseMixin():
    @staticmethod
    def wrap_response(response):
        if not response.get('code'):
            response['code'] = Code.SUCCESS
        elif not response.get('codedes'):
            code = Code()
            response['codedes'] = code.get(response.get('code'))
        return response


class SaveImage():
    @classmethod
    def md5_key(cls, key):
        md5key = md5(key.encode('utf8')).hexdigest()
        fileneme = os.path.join(settings.STATICFILES_DIRS_SELF, md5key + '.jpg')
        return fileneme

    @classmethod
    def saveimage(cls, key, content):
        fileneme = SaveImage.md5_key(key)
        with open(fileneme, 'wb')as f:
            f.write(content.read())
