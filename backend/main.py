from fastapi import FastAPI

app = FastAPI(title='Crime Lens AI')

@app.get('/')
def read_root():
    return {'message': 'Crime Lens AI backend'}
