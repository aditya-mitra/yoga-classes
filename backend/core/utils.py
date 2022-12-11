from rest_framework.views import exception_handler
from rest_framework.exceptions import ErrorDetail
  
def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    def format_value(val):
        if type(val) == 'string' or isinstance(val, ErrorDetail):
            return val
        
        try:
            iter(val)
            return " ".join(val)
        except TypeError:
            return val
 
    if response is not None:
        data = response.data
        response.data = {}
        errors = []

        print(data)
        for field, value in data.items():
            errors.append("{} : {}".format(field, format_value(value)))
 
        response.data = errors
 
    return response