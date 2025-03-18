import falcon
import json
from parsers import parse_info_file, parse_message_files


class CORSMiddleware:
    def process_request(self, req, resp):
        """Handle preflight requests"""
        if req.method == 'OPTIONS':
            resp.status = falcon.HTTP_200
            self.process_response(req, resp)
            raise falcon.HTTPStatus(falcon.HTTP_200)

    def process_response(self, req, resp, resource=None, req_succeeded=None):
        """Add CORS headers to every response"""
        resp.set_header('Access-Control-Allow-Origin', '*')  # Allow all origins
        resp.set_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')  # Allowed methods
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')  # Allowed headers


class LoansResource:
    def on_get(self, req, resp):
        """Fetch all loans with their message stats"""
        loans = parse_info_file()
        resp.text = json.dumps({"loans": loans}, indent=4)
        resp.status = falcon.HTTP_200

class LoanMessagesResource:
    def on_get(self, req, resp, loan_id):
        """Fetch all messages for a specific loan"""
        messages = parse_message_files(loan_id)
        if not messages:
            resp.status = falcon.HTTP_404
            resp.text = json.dumps({"error": "Loan not found"})
            return
        
        resp.text = json.dumps({"messages": messages}, indent=4)
        resp.status = falcon.HTTP_200

app = falcon.App(middleware=[CORSMiddleware()])
app.add_route('/loans', LoansResource())
app.add_route('/loan/{loan_id}', LoanMessagesResource())

if __name__ == '__main__':
    from wsgiref import simple_server
    httpd = simple_server.make_server('127.0.0.1', 7070, app)
    print("Serving on http://127.0.0.1:7070")
    httpd.serve_forever()
