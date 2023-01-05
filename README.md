# Deploying on Local Development Server

Must need python>=3.7 and React >=17.0.1. Clone the repo.

```bash
  git clone https://github.com/sushant66/Todo-Django-React.git
  cd Todo-Django-React
```

# Setup backend

Activate virtual environment. Install dependencies. Migrate database.

```bash
  cd backend/
  python -m venv env
  source env/bin/activate
  pip install -r requirements.txt
  python manage.py migrate
  python manage.py runserver
```

Backend will be up and running on port 8000. Link: http://127.0.0.1:8000/api/

# Setup frontend

Install npm dependencies

```bash
  npm install
  npm start
```

Frontend will be up and running on port 3000. http://127.0.0.1:3000

# API Endpoints

## Todos

- **/api/task-list/** (List all todos)
- **/api/task-detail/{todo-id}/** (List specific todo)
- **/api/task-create/** (Create new todo)
- **/api/task-update/{todo-id}/** (Update existing todo)
- **/api/task-delete/{todo-id}/** (Delete existing todo)
